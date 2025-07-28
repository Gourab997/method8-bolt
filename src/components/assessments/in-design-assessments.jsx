import { useGetInDesignAssessmentsQuery } from '../../api/features/assessment/assessment-api.js';
import AssessmentTable from './assessment-table.jsx';

const InDesignAssessments = () => {
  return (
    <AssessmentTable useAssessmentQuery={useGetInDesignAssessmentsQuery} />
  );
};

export default InDesignAssessments;
