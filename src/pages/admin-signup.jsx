import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const AdminSignup = () => {
  return (
    <>
      <Helmet>
        <title>Signup</title>
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
            <Title level={2}>Get Started</Title>
            <Text type="secondary">
              Already have an account?{' '}
              <Link to="/login">
                <Text strong>Sign In</Text>
              </Link>
            </Text>
          </div>

          <Form
            initialValues={{ remember: true, acceptTerms: true }}
            layout="vertical"
            name="admin_signup"
            requiredMark={false}
          >
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter your name" />
            </Form.Item>

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

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="acceptTerms"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject('You must accept the Terms.'),
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
              <Button block htmlType="submit" type="primary">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
