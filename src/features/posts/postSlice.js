import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { Report } from 'notiflix';
import { fetchItems } from '../../hooks/fetchItem';
import { fetchCRUD } from '../../hooks/fetchCRUD';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchItems', async url => {
  return await fetchItems(url);
});

export const apiRequest = createAsyncThunk(
  'posts/apiRequest',
  async options => {
    try {
      const request = await fetchCRUD(options);
      Report.success(`Post ${options.name} successfully`, '');
      return request;
    } catch (e) {
      Report.failure(`Error Post not ${options.name}`, `Error: ${e.message}`);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    //or postUpdate can work as reactionAdded
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++; //is work
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(apiRequest.fulfilled, (state, action) => {
        // state.posts.push(action.payload)
        state.status = 'idle';
      });
  },
});

export const { reactionAdded } = postSlice.actions;
export default postSlice.reducer;

export const selectAllPosts = state => state.posts.posts;
export const postStatus = state => state.posts.status;
export const errorMessage = state => state.posts.error;

export const selectPostById = (state, postId) => {
  const post = state.posts.posts.find(post => post.id === postId);

  if (!post) {
    Report.failure('Post not found', '');
    return [];
  }
  return post;
};
