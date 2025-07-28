import { Typography } from 'antd';
import { Analytics01Icon } from 'hugeicons-react';

const { Title, Text } = Typography;

import { magenta } from '@ant-design/colors';

export const TotalResponseCount = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Analytics01Icon size={16} style={{ color: magenta[5] }} />
        <Text type="secondary">Response Collected</Text>
      </div>
      <Title level={3} style={{ marginBottom: 0, marginTop: 4 }}>
        6,780
      </Title>
    </div>
  );
};

export const TotalResponseTrend = () => {
  return (
    <div style={{ textAlign: 'left', padding: '0 16px' }}>
      <Text type="secondary">Updated June 22, 2022</Text>
    </div>
  );
};
