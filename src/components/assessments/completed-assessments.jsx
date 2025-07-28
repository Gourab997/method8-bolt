import { useGetCompletedAssessmentsQuery } from '../../api/features/assessment/assessment-api.js';
import AssessmentTable from './assessment-table.jsx';

const CompletedAssessments = () => {
  return (
    <AssessmentTable useAssessmentQuery={useGetCompletedAssessmentsQuery} />
  );
};

export default CompletedAssessments;
