import { Typography } from 'antd';
import { NoteEditIcon } from 'hugeicons-react';

const { Title, Text } = Typography;

import { cyan, green } from '@ant-design/colors';

export const TotalAssessmentCount = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <NoteEditIcon size={16} style={{ color: cyan[5] }} />
        <Text type="secondary">Total Assessment</Text>
      </div>
      <Title level={3} style={{ marginBottom: 0, marginTop: 4 }}>
        50
      </Title>
    </div>
  );
};

export const TotalAssessmentTrend = () => {
  return (
    <div style={{ textAlign: 'left', padding: '0 16px' }}>
      <Text type="secondary">
        <Text style={{ color: green[5] }}>+15%</Text> from last month
      </Text>
      {/*<Text type="secondary"><Text style={{color: red[5]}}>-10%</Text> from last month</Text>*/}
    </div>
  );
};
