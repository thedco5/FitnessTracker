import {api} from '../api';

export const dataApi = api.injectEndpoints({
  endpoints: (build) => ({
    // getExercises: build.query<any, any>({
    //   query: () => ({
    //     url: `/api/exercise`,
    //     method: 'GET',
    //   }),
    //   providesTags: [{ type: 'Exercises', id: 'LIST' }],
    // }),
    getWorkouts: build.query<any, any>({
      query: () => ({
        url: 'api/workout',
        method: 'GET',
      }),
      providesTags: [{type: 'Workouts', id: 'LIST'}],
    }),
  })
});

export const {
  useGetExercisesQuery,
  useAddWorkoutMutation,
  useGetWorkoutsQuery,
} = dataApi;