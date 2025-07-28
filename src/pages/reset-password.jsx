import { Button, Form, Input, message, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useResetPasswordMutation } from '../api/features/auth/password-api.js';

const { Title, Text } = Typography;

const baseResetPasswordSchema = z.object({
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/\d/, 'Password must contain at least one number.')
    .regex(
      /[@$!%*?&]/,
      'Password must contain at least one special character.'
    ),
  confirm_new_password: z.string().min(1, 'Please confirm your new password!'),
});

const resetPasswordSchema = baseResetPasswordSchema.refine(
  (data) => data.new_password === data.confirm_new_password,
  {
    message: 'The passwords do not match.',
    path: ['confirm_new_password'], // Set the error on the confirmation field
  }
);

const zodValidator = (schema) => ({
  async validator({ field }, value) {
    const fieldSchema = schema.pick({ [field]: true });
    const result = await fieldSchema.safeParseAsync({ [field]: value });
    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }
  },
});

const ResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const token = searchParams.get('token');

  const handleResetPassword = async (values) => {
    if (!token) {
      message.error('Invalid or missing reset token.');
      return;
    }

    const result = resetPasswordSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formErrors = Object.entries(fieldErrors).map(
        ([fieldName, messages]) => ({
          name: fieldName,
          errors: messages,
        })
      );
      form.setFields(formErrors);
      return;
    }

    try {
      await resetPassword({
        token,
        password: values.new_password,
        password_confirmation: values.new_password,
      }).unwrap();
      message.success('Password has been reset successfully!');

      navigate('/login');
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to reset password.';
      message.error(errorMessage);
      // console.error('Password reset failed:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '10vh',
        }}
      >
        <div style={{ width: 450 }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={2}>Reset your Password</Title>
            <Text type="secondary">
              Enter your new password below to complete the reset process
            </Text>
          </div>
          <Form
            form={form}
            layout="vertical"
            name="reset_password"
            onFinish={handleResetPassword}
            requiredMark={false}
          >
            <Form.Item
              label="New Password"
              name="new_password"
              rules={[zodValidator(baseResetPasswordSchema)]}
            >
              <Input.Password placeholder="New password" />
            </Form.Item>

            <Form.Item
              dependencies={['new_password']}
              label="Confirm Password"
              name="confirm_new_password"
              rules={[
                zodValidator(baseResetPasswordSchema),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item>
              <Button
                block
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
