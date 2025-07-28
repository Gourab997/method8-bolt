import { green, red } from '@ant-design/colors';
import {
  Avatar,
  Button,
  Dropdown,
  Empty,
  Modal,
  Progress,
  Table,
  Tag,
} from 'antd';
import { format } from 'date-fns';
import { Delete02Icon, Edit02Icon, MoreVerticalIcon } from 'hugeicons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useDeleteAssessmentMutation,
  useUpdateAssessmentMutation,
} from '../../api/features/assessment/assessment-api.js';
import { AVATAR_COLORS } from '../../utils/constants';
import EditAssessmentModal from './edit-assessment-modal.jsx';

const statusColorMapper = {
  in_design: 'blue',
  pending: 'gold',
  completed: 'green',
};

const AssessmentTable = ({ useAssessmentQuery }) => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
  });
  const { data: assessmentData, isLoading } = useAssessmentQuery({
    page: pagination.page,
    limit: pagination.limit,
  });
  const [updateAssessment] = useUpdateAssessmentMutation();
  const [deleteAssessment] = useDeleteAssessmentMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);

  const handleTableChange = (newPagination) => {
    setPagination({
      page: newPagination.current,
      limit: newPagination.pageSize,
    });
  };

  const handleEdit = (record) => {
    setEditingAssessment(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this assessment?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, keep it',
      onOk: async () => {
        await deleteAssessment(record.key).unwrap();
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAssessment(null);
  };

  const handleOk = async (values) => {
    await updateAssessment({ id: editingAssessment.key, ...values }).unwrap();
    setIsModalVisible(false);
    setEditingAssessment(null);
  };

  const columns = [
    {
      title: 'Assessment Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link style={{ color: 'inherit' }} to={`/modules/${record.key}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Assessment Owner',
      dataIndex: 'owner_name',
      key: 'owner_name',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            style={{
              marginRight: 8,
              backgroundColor: AVATAR_COLORS[text.charAt(0).toUpperCase()],
            }}
          >
            {text.charAt(0).toUpperCase()}
          </Avatar>
          {text}
        </div>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={statusColorMapper[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </Tag>
      ),
    },
    {
      title: 'Maturity Score',
      key: 'maturity_score',
      dataIndex: 'maturity_score',
      render: (maturity_score) => (
        <Progress percent={maturity_score} strokeColor={green[5]} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => {
        const handleMenuClick = ({ key, domEvent }) => {
          domEvent.stopPropagation();
          if (key === '1') {
            handleEdit(record);
          } else if (key === '2') {
            handleDelete(record);
          }
        };

        const items = [
          {
            key: '1',
            label: (
              <span>
                <Edit02Icon size={14} style={{ marginRight: '10px' }} />
                Edit
              </span>
            ),
          },
          {
            key: '2',
            label: (
              <span style={{ color: red[5] }}>
                <Delete02Icon size={14} style={{ marginRight: '10px' }} />
                Delete
              </span>
            ),
          },
        ];
        return (
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={['click']}
          >
            <Button
              icon={<MoreVerticalIcon size={20} />}
              onClick={(e) => e.stopPropagation()}
              type="text"
            />
          </Dropdown>
        );
      },
    },
  ];

  const data =
    assessmentData?.data?.assessments.map((assessment) => ({
      key: assessment.id,
      name: assessment.name,
      department: assessment.department,
      priority: assessment.priority,
      owner_name: assessment.creator_name,
      created_at: format(new Date(assessment.created_at), 'MMMM d, yyyy'),
      status: assessment.status,
      tags: assessment.tags,
      maturity_score: assessment.maturity_score,
    })) || [];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        locale={{
          emptyText: <Empty description="No data" />,
        }}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: (e) => {
            if (e.target.closest('.ant-dropdown-trigger')) {
              return;
            }
            navigate(`/modules/${record.key}`);
          },
          style: { cursor: 'pointer' },
        })}
        pagination={{
          position: ['bottomRight'],
          current: pagination.page,
          pageSize: pagination.limit,
          total: assessmentData?.data?.pagy?.items,
        }}
      />
      <EditAssessmentModal
        initialData={editingAssessment}
        onCancel={handleCancel}
        onOk={handleOk}
        visible={isModalVisible}
      />
    </div>
  );
};

export default AssessmentTable;
