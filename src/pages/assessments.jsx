import { Button, Col, Row, Tabs, Typography } from 'antd';
import { Add01Icon } from 'hugeicons-react';
import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AllAssessments from '../components/assessments/all-assessments.jsx';
import CompletedAssessments from '../components/assessments/completed-assessments.jsx';
import InDesignAssessments from '../components/assessments/in-design-assessments.jsx';
import { BreadcrumbContext } from '../context/breadcrumb/breadcrumb-context.js';

const CreateAssessmentModal = lazy(
  () => import('../components/assessments/create-assessment-modal.jsx')
);

const { Title } = Typography;

const items = [
  {
    key: '1',
    label: 'All',
    children: <AllAssessments />,
  },
  {
    key: '2',
    label: 'Completed',
    children: <CompletedAssessments />,
  },
  {
    key: '3',
    label: 'In Design',
    children: <InDesignAssessments />,
  },
];

const Assessments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setItems } = useContext(BreadcrumbContext);

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Assessments',
        href: '/assessments',
      },
    ]);
  }, [setItems]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = (_values) => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Helmet>
        <title>Assessments</title>
      </Helmet>
      <Row>
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title level={2}>My Assessments</Title>
            <Button
              icon={<Add01Icon size={16} />}
              onClick={showModal}
              size="large"
              type="primary"
            >
              New Assessment
            </Button>
          </div>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        {isModalVisible && (
          <CreateAssessmentModal
            onCancel={handleCancel}
            onCreate={handleCreate}
            visible={isModalVisible}
          />
        )}
      </Suspense>
    </>
  );
};

export default Assessments;
