import { Form, Input, Modal, message, Select, Tag } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateAssessmentMutation } from '../../api/features/assessment/assessment-api.js';

const { Option } = Select;

const priorityColors = {
  2: 'red', // high
  1: 'blue', // medium
  0: 'gold', // low
};

const statusColors = {
  0: 'blue', // in_progress
  1: 'gold', // pending
  2: 'green', // completed
};

const statusLabels = {
  0: 'In Design',
  1: 'Pending',
  2: 'Completed',
};

const CreateAssessmentModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [createAssessment, { isLoading, isSuccess, isError, error }] =
    useCreateAssessmentMutation();
  const organization = useSelector((state) => state.auth.organization);

  useEffect(() => {
    if (isSuccess) {
      message.success('Assessment created successfully!');
      form.resetFields();
      onCancel();
    }
    if (isError) {
      const errorMessage =
        error.data?.errors ||
        error.data?.message ||
        'An unexpected error occurred.';
      message.error(errorMessage);
    }
  }, [isSuccess, isError, error, form, onCancel]);

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = { ...values, organization_id: organization.id };
    await createAssessment(payload);
  };

  return (
    <Modal
      cancelText="Cancel"
      confirmLoading={isLoading}
      okButtonProps={{ disabled: !organization || isLoading }}
      okText="Create"
      onCancel={onCancel}
      onOk={handleOk}
      open={visible}
      title="Add New Assessment"
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        requiredMark={false}
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
          <Input autoComplete="off" />
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
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          initialValue={1}
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
            <Option value={2}>
              <Tag color={priorityColors[2]}>High</Tag>
            </Option>
            <Option value={1}>
              <Tag color={priorityColors[1]}>Medium</Tag>
            </Option>
            <Option value={0}>
              <Tag color={priorityColors[0]}>Low</Tag>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={0}
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: 'Please select a status!',
            },
          ]}
        >
          <Select placeholder="Select a status">
            <Option value={0}>
              <Tag color={statusColors[0]}>{statusLabels[0]}</Tag>
            </Option>
            <Option value={1}>
              <Tag color={statusColors[1]}>{statusLabels[1]}</Tag>
            </Option>
            <Option value={2}>
              <Tag color={statusColors[2]}>{statusLabels[2]}</Tag>
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

export default CreateAssessmentModal;
