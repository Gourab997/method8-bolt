import { Form, Input, Modal, Select, Tag } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const priorityColors = {
  2: 'red', // high
  1: 'blue', // medium
  0: 'gold', // low
};

const statusColors = {
  in_design: 'blue',
  pending: 'gold',
  completed: 'green',
};

const statusLabels = {
  in_design: 'In Design',
  pending: 'Pending',
  completed: 'Completed',
};

const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const EditAssessmentModal = ({ visible, onCancel, onOk, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  if (!initialData) {
    return null;
  }

  const handleOk = async () => {
    const values = await form.validateFields();
    onOk({ ...initialData, ...values });
  };

  return (
    <Modal
      destroyOnHidden
      onCancel={onCancel}
      onOk={handleOk}
      open={visible}
      title="Edit Assessment"
    >
      <Form
        form={form}
        initialValues={initialData}
        layout="vertical"
        name="edit_assessment_form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input the name of the assessment!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: 'Please input the department!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[
            {
              required: true,
              message: 'Please select a priority!',
            },
          ]}
        >
          <Select>
            <Option value="high">
              <Tag color={priorityColors[2]}>{priorityLabels.high}</Tag>
            </Option>
            <Option value="medium">
              <Tag color={priorityColors[1]}>{priorityLabels.medium}</Tag>
            </Option>
            <Option value="low">
              <Tag color={priorityColors[0]}>{priorityLabels.low}</Tag>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: 'Please select a status!',
            },
          ]}
        >
          <Select>
            <Option value="in_design">
              <Tag color={statusColors.in_design}>{statusLabels.in_design}</Tag>
            </Option>
            <Option value="pending">
              <Tag color={statusColors.pending}>{statusLabels.pending}</Tag>
            </Option>
            <Option value="completed">
              <Tag color={statusColors.completed}>{statusLabels.completed}</Tag>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Select
            mode="tags"
            placeholder="Type and press space to add tags"
            style={{ width: '100%' }}
            tokenSeparators={[' ']}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAssessmentModal;
