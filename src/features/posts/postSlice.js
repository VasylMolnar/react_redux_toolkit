import {
  nanoid,
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
        //in this we are starting create a new [Post] and push data
        //create Object ids and save to cache (apiSlice.js)
        return [
          { type: 'Post', id: 'LIST' }, //create a new [Post]
          ...result.ids.map(id => ({ type: 'Post', id })),
        ];
      },
    }),

    getPostsByUserId: builder.query({
      query: id => `/posts/?userId=${id}`,
      transformResponse: responseData => {
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        return [...result.ids.map(id => ({ type: 'Post', id }))];
      },
    }),

    addPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'post',
        body: {
          ...initialPost,
          id: nanoid(),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),

      invalidatesTags: [{ type: 'Post', id: 'LIST' }], //in this we add to all [Post]
    }),

    updatePost: builder.mutation({
      query: initialPost => ({
        url: `/posts/${initialPost.id}`,
        method: 'PUT',
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
      /*this changes post  by id  in [Post]
        [Post] = {id:{id,title,content...}} img 1 (apiSlice.js tagTypes: ['Post', 'User'])
      */
    }),

    deletePost: builder.mutation({
      query: id => ({
        url: `posts/${id}`,
        method: 'delete',
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),

    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: 'PATCH',
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { reactions },
      }),

      async onQueryStarted(
        { postId, reactions },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            draft => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const post = draft.entities[postId];
              if (post) post.reactions = reactions;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
}); //redux (in this extendedApiSlice we are creating functions and extended apiSlice.js (createApi))

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsByUserIdQuery,
  useAddReactionMutation,
} = extendedApiSlice; //export function from extendedApiSlice

// Creates memoized selector
const selectPostsData = createSelector(
  extendedApiSlice.endpoints.getPosts.select(), // returns the query result object
  postsResult => {
    //console.log(postsResult);
    return postsResult.data;
  } // normalized state object with ids & entities
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
