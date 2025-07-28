import { Col, Form, Input, Row, Typography } from 'antd';

const { Title, Text } = Typography;

const StepThree = () => (
  <>
    <div style={{ marginBottom: 32 }}>
      <Title level={2}>Tell us about your Contact</Title>
      <Text type="secondary">We'd like to get to know you better</Text>
    </div>

    <Form.Item label="Contact Email" name="contact_email">
      <Input placeholder="Enter your email" />
    </Form.Item>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="First Name" name="first_name">
          <Input placeholder="Enter your first name" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Last Name" name="last_name">
          <Input placeholder="Enter your last name" />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item label="Contact Phone Number" name="phone_number">
      <Input placeholder="Enter your phone number" />
    </Form.Item>
  </>
);

export default StepThree;
