import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/features/auth/auth-api.js';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [form] = Form.useForm();
  const isAuthenticated = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (values) => {
    try {
      await login({ email: values.email, password: values.password }).unwrap();
      navigate(from);
    } catch (err) {
      const errorMessage =
        err.data?.message ||
        err.data?.error || // Common alternative key for error messages
        'Login Failed. Please check your credentials.';
      message.error(errorMessage);
      // console.error('Failed to log in:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
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
            <Title level={2}>Login to your account</Title>
          </div>

          <Form
            form={form}
            initialValues={{ remember: true, acceptTerms: true }}
            layout="vertical"
            name="login"
            onFinish={handleLogin}
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address.',
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
            >
              <Input.Password placeholder="Input password" />
            </Form.Item>

            <Form.Item
              name="acceptTerms"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('You must accept the Terms of Use.')
                        ),
                },
              ]}
              style={{ marginBottom: 8 }}
              valuePropName="checked"
            >
              <Checkbox>
                <Text>
                  Accept the Method8{' '}
                  <Link to="#">
                    <Text strong underline>
                      Terms of Use
                    </Text>
                  </Link>{' '}
                  and{' '}
                  <Link to="#">
                    <Text strong underline>
                      Privacy Statement
                    </Text>
                  </Link>
                </Text>
              </Checkbox>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                block
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Log In
              </Button>
            </Form.Item>

            <Link to="/forget_password">
              <Text>Forgot Password?</Text>
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
