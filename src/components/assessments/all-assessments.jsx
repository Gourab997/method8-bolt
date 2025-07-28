import { useGetAllAssessmentsQuery } from '../../api/features/assessment/assessment-api.js';
import AssessmentTable from './assessment-table.jsx';

const AllAssessments = () => {
  return <AssessmentTable useAssessmentQuery={useGetAllAssessmentsQuery} />;
};

export default AllAssessments;
