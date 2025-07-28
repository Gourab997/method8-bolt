import { Typography } from 'antd';
import { HelpCircleIcon } from 'hugeicons-react';

const { Title, Text } = Typography;

import { green } from '@ant-design/colors';

export const TotalModuleCount = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <HelpCircleIcon size={16} style={{ color: green[5] }} />
        <Text type="secondary">Total Module</Text>
      </div>
      <Title level={3} style={{ marginBottom: 0, marginTop: 4 }}>
        123
      </Title>
    </div>
  );
};

export const TotalModuleTrend = () => {
  return (
    <div style={{ textAlign: 'left', padding: '0 16px' }}>
      <Text type="secondary">
        <Text style={{ color: green[5] }}>+15%</Text> from last month
      </Text>
      {/*<Text type="secondary"><Text style={{color: red[5]}}>-10%</Text> from last month</Text>*/}
    </div>
  );
};
