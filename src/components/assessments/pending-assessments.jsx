import { red } from '@ant-design/colors';
import { Avatar, Button, Dropdown, Table, Tag } from 'antd';
import { Delete02Icon, Edit02Icon, MoreVerticalIcon } from 'hugeicons-react';
import { Link, useNavigate } from 'react-router-dom';
import { AVATAR_COLORS } from '../../utils/constants';

const statusColorMapper = {
  Pending: 'orange',
};

const PendingAssessments = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Assessment Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link style={{ color: 'inherit' }} to={`/module-list/${record.key}`}>
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
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => <Tag color={statusColorMapper[status]}>{status}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => {
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
          <Dropdown menu={{ items }} trigger={['click']}>
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

  const data = [
    {
      key: '1',
      name: 'New Assessment 1',
      owner_name: 'John Doe',
      created_at: 'July 20, 2025',
      status: 'Pending',
    },
    {
      key: '2',
      name: 'New Assessment 2',
      owner_name: 'Jane Smith',
      created_at: 'July 21, 2025',
      status: 'Pending',
    },
    {
      key: '3',
      name: 'New Assessment 3',
      owner_name: 'Peter Jones',
      created_at: 'July 22, 2025',
      status: 'Pending',
    },
    {
      key: '4',
      name: 'New Assessment 4',
      owner_name: 'Mary Williams',
      created_at: 'July 23, 2025',
      status: 'Pending',
    },
    {
      key: '5',
      name: 'New Assessment 5',
      owner_name: 'David Brown',
      created_at: 'July 24, 2025',
      status: 'Pending',
    },
    {
      key: '6',
      name: 'New Assessment 6',
      owner_name: 'Susan Davis',
      created_at: 'July 25, 2025',
      status: 'Pending',
    },
    {
      key: '7',
      name: 'New Assessment 7',
      owner_name: 'Robert Miller',
      created_at: 'July 26, 2025',
      status: 'Pending',
    },
    {
      key: '8',
      name: 'New Assessment 8',
      owner_name: 'Patricia Wilson',
      created_at: 'July 27, 2025',
      status: 'Pending',
    },
    {
      key: '9',
      name: 'New Assessment 9',
      owner_name: 'Michael Moore',
      created_at: 'July 28, 2025',
      status: 'Pending',
    },
    {
      key: '10',
      name: 'New Assessment 10',
      owner_name: 'Linda Taylor',
      created_at: 'July 29, 2025',
      status: 'Pending',
    },
    {
      key: '11',
      name: 'New Assessment 11',
      owner_name: 'James Anderson',
      created_at: 'July 30, 2025',
      status: 'Pending',
    },
    {
      key: '12',
      name: 'New Assessment 12',
      owner_name: 'Barbara Thomas',
      created_at: 'July 31, 2025',
      status: 'Pending',
    },
    {
      key: '13',
      name: 'New Assessment 13',
      owner_name: 'William Jackson',
      created_at: 'August 1, 2025',
      status: 'Pending',
    },
    {
      key: '14',
      name: 'New Assessment 14',
      owner_name: 'Elizabeth White',
      created_at: 'August 2, 2025',
      status: 'Pending',
    },
    {
      key: '15',
      name: 'New Assessment 15',
      owner_name: 'Richard Harris',
      created_at: 'August 3, 2025',
      status: 'Pending',
    },
    {
      key: '16',
      name: 'New Assessment 16',
      owner_name: 'Jennifer Martin',
      created_at: 'August 4, 2025',
      status: 'Pending',
    },
    {
      key: '17',
      name: 'New Assessment 17',
      owner_name: 'Charles Thompson',
      created_at: 'August 5, 2025',
      status: 'Pending',
    },
    {
      key: '18',
      name: 'New Assessment 18',
      owner_name: 'Jessica Garcia',
      created_at: 'August 6, 2025',
      status: 'Pending',
    },
    {
      key: '19',
      name: 'New Assessment 19',
      owner_name: 'Joseph Martinez',
      created_at: 'August 7, 2025',
      status: 'Pending',
    },
    {
      key: '20',
      name: 'New Assessment 20',
      owner_name: 'Sarah Robinson',
      created_at: 'August 8, 2025',
      status: 'Pending',
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => navigate(`/module-list/${record.key}`),
          style: { cursor: 'pointer' },
        })}
        pagination={{ position: ['bottomRight'], pageSize: 15 }}
      />
    </div>
  );
};

export default PendingAssessments;
