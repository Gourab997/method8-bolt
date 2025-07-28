import { Button, Form, Input, message, Typography } from 'antd';
import { ArrowLeft01Icon } from 'hugeicons-react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../api/features/auth/password-api.js';

const { Title, Text } = Typography;

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 2. Use the mutation hook from your API slice
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();

  // 3. Create the handler for form submission
  const handleForgetPassword = async (values) => {
    try {
      // Call the mutation and unwrap the result to handle errors
      await forgetPassword(values).unwrap();

      // For security, show a generic success message to prevent email enumeration
      message.success(
        'If an account with that email exists, a password reset link has been sent.'
      );
      form.resetFields(); // Clear the form on success
    } catch (err) {
      // Display a specific error from the API, or a generic one
      const errorMessage =
        err.data?.message || 'An error occurred. Please try again.';
      message.error(errorMessage);
      // console.error('Failed to send reset link:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div
        style={{
          padding: '10px 20px',
        }}
      >
        <Button
          icon={<ArrowLeft01Icon size={14} />}
          onClick={() => navigate('/login')}
          style={{ padding: 0, height: 'auto' }}
          type="text"
        >
          Back
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '10vh',
        }}
      >
        <div style={{ width: 400 }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={2}>Forgot Password?</Title>
            <Text type="secondary">
              Enter your email address and follow the instructions.
            </Text>
          </div>
          <Form
            form={form}
            layout="vertical"
            name="forget_password"
            onFinish={handleForgetPassword}
            requiredMark={false} // Connect the handler
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Not a valid email!' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item>
              <Button
                block
                htmlType="submit"
                loading={isLoading}
                type="primary" // Show loading state on the button
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
