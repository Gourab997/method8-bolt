import { apiSlice } from '../../api-slice.js';

const ASSESSMENT_URL = '/api/v1/assessments';
const IN_DESIGN_ASSESSMENT_URL = '/api/v1/assessments/in_design';
const COMPLETED_ASSESSMENT_URL = '/api/v1/assessments/completed';

export const assessmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAssessment: builder.mutation({
      query: (data) => ({
        url: ASSESSMENT_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assessments'],
    }),
    getInDesignAssessments: builder.query({
      query: ({ page, limit }) => ({
        url: `${IN_DESIGN_ASSESSMENT_URL}?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Assessments'],
      keepUnusedDataFor: 300,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),
    getAllAssessments: builder.query({
      query: ({ page, limit }) => ({
        url: `${ASSESSMENT_URL}?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Assessments'],
      keepUnusedDataFor: 300,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),
    getCompletedAssessments: builder.query({
      query: ({ page, limit }) => ({
        url: `${COMPLETED_ASSESSMENT_URL}?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Assessments'],
      keepUnusedDataFor: 300,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),
    updateAssessment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${ASSESSMENT_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [
        'Assessments',
        { type: 'assessment_module', id: 'LIST' },
      ],
    }),
    deleteAssessment: builder.mutation({
      query: (id) => ({
        url: `${ASSESSMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assessments'],
    }),
  }),
});

export const {
  useCreateAssessmentMutation,
  useGetAllAssessmentsQuery,
  useGetInDesignAssessmentsQuery,
  useGetCompletedAssessmentsQuery,
  useUpdateAssessmentMutation,
  useDeleteAssessmentMutation,
} = assessmentApiSlice;
