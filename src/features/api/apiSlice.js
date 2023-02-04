import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1234' }),
  tagTypes: ['Post', 'User'], //to save data cache
  endpoints: builder => ({}), //is empty because we create functions in postSlice.js and userSlice.js ...
});
