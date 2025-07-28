import { Statistic, Typography } from 'antd';

const { Text } = Typography;

const containerStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  border: '1px solid #1DC300',
  borderRadius: '8px',
  backgroundColor: '#f6fff6',
};

const titleStyle = {
  fontSize: '14px',
  fontWeight: 500,
  marginRight: 6,
};

const valueStyle = {
  color: '#1DC300',
  fontWeight: 700,
  fontSize: '16px',
};

const MaturityScoreDisplay = ({
  title,
  value,
  precision = 0,
  suffix = '%',
}) => {
  return (
    <div style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <Statistic
        precision={precision}
        suffix={suffix}
        value={value}
        valueStyle={valueStyle}
      />
    </div>
  );
};

export default MaturityScoreDisplay;
