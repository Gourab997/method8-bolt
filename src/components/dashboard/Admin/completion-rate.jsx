import { Typography } from 'antd';
import { CheckmarkCircle03Icon } from 'hugeicons-react';

const { Title, Text } = Typography;

import { blue } from '@ant-design/colors';

export const TotalCompletionCount = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <CheckmarkCircle03Icon size={16} style={{ color: blue[5] }} />
        <Text type="secondary">Completion Rate</Text>
      </div>
      <Title level={3} style={{ marginBottom: 0, marginTop: 4 }}>
        82%
      </Title>
    </div>
  );
};

export const TotalCompletionTrend = () => {
  return (
    <div style={{ textAlign: 'left', padding: '0 16px' }}>
      <Text type="secondary">Across all modules</Text>
    </div>
  );
};
