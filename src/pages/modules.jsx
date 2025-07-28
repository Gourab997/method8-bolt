import { Button, Col, Row, Typography } from 'antd';
import { Add01Icon } from 'hugeicons-react';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateAssessmentModuleMutation,
  useGetAssessmentModulesQuery,
} from '../api/features/module/module-api.js';
import MaturityScoreDisplay from '../components/module/maturity-score-display.jsx';
import ModuleList from '../components/module/module-list.jsx';
import { BreadcrumbContext } from '../context/breadcrumb/breadcrumb-context.js';

const { Title } = Typography;

const Modules = () => {
  const { assessment_id } = useParams();
  const navigate = useNavigate();
  const { setItems } = useContext(BreadcrumbContext);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
  });

  const [createAssessmentModule, { isLoading: isCreating }] =
    useCreateAssessmentModuleMutation();

  const { data: assessmentModulesData, isLoading } =
    useGetAssessmentModulesQuery({
      assessmentId: assessment_id,
      page: pagination.page,
      limit: pagination.limit,
    });

  const assessment = assessmentModulesData?.data?.assessment;

  useEffect(() => {
    if (assessment) {
      setItems([
        {
          title: 'Assessments',
          href: '/assessments',
        },
        {
          title: assessment.name,
        },
      ]);
    }
    return () => {
      setItems([]);
    };
  }, [assessment, setItems]);

  const handleTableChange = (newPagination) => {
    setPagination({
      page: newPagination.current,
      limit: newPagination.pageSize,
    });
  };

  const handleNewModule = async () => {
    const result = await createAssessmentModule(assessment_id).unwrap();
    const newModuleId = result?.data?.assessment_module?.id;
    if (newModuleId) {
      navigate(`/edit_module/${newModuleId}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>{assessment?.name || 'Modules'}</title>
      </Helmet>
      <Row align="middle" justify="space-between" style={{ marginBottom: 24 }}>
        <Col>
          <Row align="middle" gutter={16}>
            <Col>
              <Title level={2} style={{ margin: 0 }}>
                {assessment?.name}
              </Title>
            </Col>
            <Col>
              <MaturityScoreDisplay
                title="Total Maturity Score"
                value={assessment?.maturity_score}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Button
            icon={<Add01Icon size={16} />}
            loading={isCreating}
            onClick={handleNewModule}
            size="large"
            type="primary"
          >
            New Module
          </Button>
        </Col>
      </Row>
      <ModuleList
        assessmentModulesData={assessmentModulesData}
        handleTableChange={handleTableChange}
        isLoading={isLoading}
        pagination={pagination}
      />
    </>
  );
};

export default Modules;
