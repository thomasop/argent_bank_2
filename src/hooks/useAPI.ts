import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../utils/store'

export const useAPI = createApi({
  reducerPath: 'apiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `user/login`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    getProfile: builder.mutation({
      query: () => ({
        url: `user/profile`,
        method: 'POST',
      }),
    }),
    setProfile: builder.mutation({
      query: ({ firstName, lastName }) => ({
        url: `user/profile`,
        method: 'PUT',
        body: { firstName, lastName },
      }),
    }),
  }),
})

export const {
  useLoginUserMutation,
  useGetProfileMutation,
  useSetProfileMutation,
} = useAPI