import { Card, Table, Typography } from 'antd';

const { Title } = Typography;

const dataSource = [
  {
    key: '1',
    client_name: 'Marvin McKinney',
    planned: 32,
    in_design: 0,
    in_progress: 1,
    completed: 8,
  },
  {
    key: '2',
    client_name: 'Kathryn Murphy',
    planned: 42,
    in_design: 9,
    in_progress: 1,
    completed: 8,
  },
  {
    key: '3',
    client_name: 'Mapleton',
    planned: 42,
    in_design: 9,
    in_progress: 1,
    completed: 8,
  },
];

const columns = [
  {
    title: 'Client Name',
    dataIndex: 'client_name',
    key: 'client_name',
  },
  {
    title: 'Planned',
    dataIndex: 'planned',
    key: 'planned',
  },
  {
    title: 'In Design',
    dataIndex: 'in_design',
    key: 'in_design',
  },
  {
    title: 'In Progress',
    dataIndex: 'in_progress',
    key: 'in_progress',
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    key: 'completed',
  },
];

const ClientList = () => {
  return (
    <Card>
      <Title level={2}>Client Activities</Title>
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  );
};

export default ClientList;
