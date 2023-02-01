import {
  createSlice,
  nanoid,
  createAsyncThunk, //fetch
  createSelector, //optimization.txt
  createEntityAdapter, //optimization.txt
} from '@reduxjs/toolkit';
import { Report } from 'notiflix';
import { fetchItems } from '../../hooks/fetchItem';
import { fetchCRUD } from '../../hooks/fetchCRUD';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  // We not write posts: [] because postsAdapter have Default []
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
  count: 0,
});

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
      const existingPost = state.entities[postId];

      if (existingPost) {
        existingPost.reactions[reaction]++; //is work
      }
    },

    increaseCount(state, action) {
      state.count += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //state.posts = action.payload;
        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(apiRequest.fulfilled, (state, action) => {
        // state.posts.push(action.payload)
        //state.status = 'idle';
        //console.log(action.meta.arg.method);

        switch (action.meta.arg.method) {
          case 'put':
            postsAdapter.upsertOne(state, action.payload);
            break;
          case 'delete':
            const id = action.meta.arg.url.split('/');
            postsAdapter.removeOne(state, id[id.length - 1]);
            break;
          case 'post':
            postsAdapter.addOne(state, action.payload);
            break;
          default:
            state.status = 'idle';
            break;
        }
      });
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
// postsAdapter.getSelectors have  own methods (selectAll,selectById,selectIds ...) we just changed the name.

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts);

export const postStatus = state => state.posts.status;
export const errorMessage = state => state.posts.error;
export const getCount = state => state.posts.count;

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, id) => id],
  (posts, id) => posts.filter(post => post.userId === Number(id))
);

export const { increaseCount, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
