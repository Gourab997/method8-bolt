import { Button, Form, Input, Modal, Typography } from 'antd';
import { AddTeamIcon, SentIcon } from 'hugeicons-react';
import { useState } from 'react';

const { Title } = Typography;

const AddClient = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleAddNewClient = (_values) => {
    // message.success(`Invitation sent to ${values.clientName}`);
    handleClose();
  };

  return (
    <>
      <Button
        icon={<AddTeamIcon size={16} />}
        onClick={showModal}
        size="large"
        type="primary"
      >
        Add Client
      </Button>
      <Modal
        centered
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="submit" onClick={() => form.submit()} type="primary">
            <SentIcon animate={true} color="#ffffff" size={16} /> Send Invite
          </Button>,
        ]}
        onCancel={handleClose}
        open={modalOpen}
        title={<Title level={4}>Invite New Client</Title>}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddNewClient}
          requiredMark={false}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Client Name"
            name="clientName"
            rules={[
              { required: true, message: "Please enter the client's name" },
            ]}
          >
            <Input placeholder="Enter client name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please enter an email address' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="e.g., contact@company.com" />
          </Form.Item>

          <Form.Item
            label="Invitation Message"
            name="message"
            rules={[
              { required: true, message: 'Please enter an invitation message' },
            ]}
          >
            <Input.TextArea
              placeholder="Write a brief welcome message..."
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddClient;
