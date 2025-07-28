import { Typography } from 'antd';
import { UserGroupIcon } from 'hugeicons-react';

const { Title, Text } = Typography;

import { gold, green } from '@ant-design/colors';

export const TotalUserCount = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <UserGroupIcon size={16} style={{ color: gold[5] }} />
        <Text type="secondary">Active Users</Text>
      </div>
      <Title level={3} style={{ marginBottom: 0, marginTop: 4 }}>
        47
      </Title>
    </div>
  );
};

export const TotalUserTrend = () => {
  return (
    <div style={{ textAlign: 'left', padding: '0 16px' }}>
      <Text type="secondary">
        <Text style={{ color: green[5] }}>+7%</Text> new users today
      </Text>
    </div>
  );
};
