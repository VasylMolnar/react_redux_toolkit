import {
  createSelector, //optimization.txt
  createEntityAdapter, //optimization.txt
} from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
}); //have default []
const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      //img
      transformResponse: responseData => {
        //save to postsAdapter (img 1) providesTags have data that has been transformed into postsAdapter
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        //create Object ids and save to cache (apiSlice.js)
        return [...result.ids.map(id => ({ type: 'Post', id }))];
      },
    }),
  }),
}); //redux (in this extendedApiSlice we are creating functions and extended apiSlice.js (createApi))

export const { useGetPostsQuery } = extendedApiSlice; //export function from extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring (img)
// postsAdapter.getSelectors have  own methods (selectAll,selectById,selectIds ...) we just changed the name.
/*
entities: 
    2: {id: 2, title: 'qui est esse', content: 'hey there', userId: 1, date: '2022-04-13T23:02:19.248Z', …}
    3: {id: 3, title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut', content: 'hey there!', userId: 1, date: '2022-05-02T20:41:05.437Z', …}
    5: {id: 5, title: 'nesciunt quas odio', content: 'Hello there!', userId: 1, date: '2022-04-14T17:46:43.450Z', …}
ids: 
  Array(3)
    0: 3
    1: 5
    2: 2
length: 3
*/
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);
