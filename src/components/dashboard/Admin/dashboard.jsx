import { Card, Col, Row, Typography } from 'antd';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BreadcrumbContext } from '../../../context/breadcrumb/breadcrumb-context.js';
import AddClient from './add-client.jsx';
import Chart from './chart.jsx';
import ClientList from './client-list.jsx';
import {
  TotalCompletionCount,
  TotalCompletionTrend,
} from './completion-rate.jsx';
import {
  TotalAssessmentCount,
  TotalAssessmentTrend,
} from './total-assessment.jsx';
import { TotalModuleCount, TotalModuleTrend } from './total-module.jsx';
import { TotalResponseCount, TotalResponseTrend } from './total-response.jsx';
import { TotalUserCount, TotalUserTrend } from './user-group.jsx';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { setItems } = useContext(BreadcrumbContext);

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
    ]);
  }, [setItems]);

  return (
    <>
      <Helmet>
        <title>Method 8</title>
      </Helmet>
      <Row>
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Title level={2} style={{ marginBottom: 4 }}>
                Dashboard
              </Title>
              <Text type="secondary">
                Manage your client invitations and track engagement
              </Text>
            </div>
            <AddClient />
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col flex="1">
          <Card
            actions={[<TotalAssessmentTrend key="assessment_trend" />]}
            styles={{ body: { padding: 16 } }}
          >
            <TotalAssessmentCount />
          </Card>
        </Col>
        <Col flex="1">
          <Card
            actions={[<TotalModuleTrend key="module_trend" />]}
            styles={{ body: { padding: 16 } }}
          >
            <TotalModuleCount />
          </Card>
        </Col>
        <Col flex="1">
          <Card
            actions={[<TotalResponseTrend key="response_trend" />]}
            styles={{ body: { padding: 16 } }}
          >
            <TotalResponseCount />
          </Card>
        </Col>
        <Col flex="1">
          <Card
            actions={[<TotalUserTrend key="user_trend" />]}
            styles={{ body: { padding: 16 } }}
          >
            <TotalUserCount />
          </Card>
        </Col>
        <Col flex="1">
          <Card
            actions={[<TotalCompletionTrend key="completion_trend" />]}
            styles={{ body: { padding: 16 } }}
          >
            <TotalCompletionCount />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Chart />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ClientList />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
