import { Checkbox, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const StepOne = () => (
  <>
    <div style={{ marginBottom: 32 }}>
      <Title level={2}>Create Password</Title>
      <Text type="secondary">Create your password</Text>
    </div>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please enter your first name' }]}
    >
      <Input placeholder="Enter your email" />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirm_password"
      rules={[{ required: true, message: 'Please input your password!' }]}
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
  </>
);

export default StepOne;
