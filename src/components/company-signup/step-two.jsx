import { Checkbox, Form, Input, Select, Typography } from 'antd';

const { Title, Text } = Typography;
const StepTwo = () => (
  <>
    <div style={{ marginBottom: 32 }}>
      <Title level={2}>Tell us about your Company</Title>
      <Text type="secondary">We'd like to get to know you better</Text>
    </div>

    <Form.Item label="Company Name" name="company_name">
      <Input placeholder="Enter your company name" />
    </Form.Item>

    <Form.Item label="What industry are you in?" name="industry">
      <Select placeholder="Select your industry">
        <Select.Option value="Technology">Technology</Select.Option>
        <Select.Option value="Finance">Finance</Select.Option>
        <Select.Option value="Healthcare">Healthcare</Select.Option>
        <Select.Option value="E-commerce">E-commerce</Select.Option>
        <Select.Option value="Retail">Retail</Select.Option>
        <Select.Option value="Manufacturing">Manufacturing</Select.Option>
        <Select.Option value="Other">Other</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item label="Department" name="department">
      <Select placeholder="Select your department">
        <Select.Option value="Sales">Sales</Select.Option>
        <Select.Option value="Marketing">Marketing</Select.Option>
        <Select.Option value="IT">IT</Select.Option>
        <Select.Option value="Finance">Finance</Select.Option>
        <Select.Option value="HR">HR</Select.Option>
        <Select.Option value="Operations">Operations</Select.Option>
        <Select.Option value="Other">Other</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="How many employees are in your company?"
      name="employee_count"
    >
      <Select placeholder="Select the number of employees">
        <Select.Option value="1-10">1-10</Select.Option>
        <Select.Option value="11-50">11-50</Select.Option>
        <Select.Option value="51-100">51-100</Select.Option>
        <Select.Option value="101-200">101-200</Select.Option>
        <Select.Option value="201-500">201-500</Select.Option>
        <Select.Option value="501-1000">501-1000</Select.Option>
        <Select.Option value="1001+">1001+</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="How experienced would you say you are in the field of compliance & standards?"
      name="experience_level"
    >
      <Select placeholder="Select experience level">
        <Select.Option value="Beginner">Beginner</Select.Option>
        <Select.Option value="Intermediate">Intermediate</Select.Option>
        <Select.Option value="Advanced">Advanced</Select.Option>
        <Select.Option value="Expert">Expert</Select.Option>
      </Select>
    </Form.Item>
    <Text />

    <Form.Item label="Why are you signing up today?" name="user_role">
      <Checkbox.Group>
        <Checkbox value="board_member">I'm a board member</Checkbox>
        <Checkbox value="team_leader">
          I'm a senior executive responsible
        </Checkbox>
        <Checkbox value="manager">
          I'm a manager that wants to use in my team
        </Checkbox>
      </Checkbox.Group>
    </Form.Item>
  </>
);

export default StepTwo;
