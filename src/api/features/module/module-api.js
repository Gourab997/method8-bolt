import { apiSlice } from '../../api-slice.js';

const ASSESSMENT_MODULE_TAG = 'assessment_module';

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssessmentModules: builder.query({
      query: ({ assessmentId, page, limit }) => {
        const params = new URLSearchParams({
          assessment_id: assessmentId,
          page,
          limit,
        });
        return `/api/v1/assessment_modules?${params.toString()}`;
      },
      providesTags: (result) => {
        if (!result?.data?.assessment_modules) {
          return [{ type: ASSESSMENT_MODULE_TAG, id: 'LIST' }];
        }
        const moduleTags = result.data.assessment_modules.map(({ id }) => ({
          type: ASSESSMENT_MODULE_TAG,
          id,
        }));
        return [...moduleTags, { type: ASSESSMENT_MODULE_TAG, id: 'LIST' }];
      },
      keepUnusedDataFor: 60,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),
    getModule: builder.query({
      query: (id) => `/api/v1/assessment_modules/${id}`,
      providesTags: (_result, _error, id) => [
        { type: ASSESSMENT_MODULE_TAG, id },
      ],
    }),
    updateModule: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/v1/assessment_modules/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: ASSESSMENT_MODULE_TAG, id },
        { type: ASSESSMENT_MODULE_TAG, id: 'LIST' },
      ],
      async onQueryStarted({ id, form_data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          moduleApi.util.updateQueryData('getModule', id, (draft) => {
            draft.data.assessment_module.form_data = form_data;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    createAssessmentModule: builder.mutation({
      query: (assessmentId) => ({
        url: `/api/v1/assessment_modules?assessment_id=${assessmentId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: ASSESSMENT_MODULE_TAG, id: 'LIST' }],
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/api/v1/assessment_modules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: ASSESSMENT_MODULE_TAG, id },
        { type: ASSESSMENT_MODULE_TAG, id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAssessmentModulesQuery,
  useGetModuleQuery,
  useUpdateModuleMutation,
  useCreateAssessmentModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
