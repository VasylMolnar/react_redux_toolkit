import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { Report } from 'notiflix';
import { fetchItems } from '../../hooks/fetchItem';
import { fetchCRUD } from '../../hooks/fetchCRUD';
/*
const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I say slice, the more I want pizza.',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];*/
//const initialState = JSON.parse(localStorage.getItem('posts')) || [];

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
    console.log(options);
    return await fetchCRUD(options);
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePost: (state, action) => {
      try {
        const post = state.filter(el => el.id.toString() !== action.payload);
        Report.success('Post deleted successfully', '');
        localStorage.setItem('posts', JSON.stringify(post));
        return (state = post);
      } catch (e) {
        Report.failure('Error Post not deleted', `Error: ${e.message}`);
      }
    },

    postAdded: (state, action) => {
      const newPost = {
        id: nanoid,
        userId: action.payload.userId,
        title: action.payload.title,
        content: action.payload.content,
        date: new Date().toISOString(),
      };

      const option = {
        url: '/posts',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      };

      state.apiRequest(option);
    },

    postUpdate: {
      reducer(state, action) {
        const updateList = state.map(el =>
          el.id === action.payload.id ? { ...el, ...action.payload } : el
        );
        localStorage.setItem('posts', JSON.stringify(updateList));
        return (state = updateList);
      },

      prepare(title, content, id, userId) {
        try {
          Report.success('Post update successfully', '');
          return {
            payload: {
              id,
              title,
              content,
              userId,
              date: new Date().toISOString(),
            },
          };
        } catch (e) {
          Report.failure('Error Post not update', `Error: ${e.message}`);
        }
      },
    },
    //or postUpdate can work as reactionAdded
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++; //is work
      }

      localStorage.setItem('posts', JSON.stringify(state));
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
      });
  },
});

export const selectAllPosts = state => state.posts.posts;
export const postStatus = state => state.posts.status;
export const errorMessage = state => state.posts.error;

export const { deletePost, postAdded, postUpdate, reactionAdded } =
  postSlice.actions;

export default postSlice.reducer;
