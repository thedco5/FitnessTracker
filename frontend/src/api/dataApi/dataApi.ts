import { api } from '../api';

export const dataApi = api.injectEndpoints({
    endpoints: (build) => ({
      getExercises: build.query<any, any>({
        query: () => ({
          url: `/`,
          method: 'GET',
        }),
        providesTags: [{ type: 'Exercises', id: 'LIST' }],
      }),
      addWorkout: build.mutation<any, any>({
        query: ({ body }) => ({
          url: ``,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Workouts', id: 'LIST' }],
    }),
  }),
  });

export const {
  useGetExercisesQuery,
  useAddWorkoutMutation,
} = dataApi;