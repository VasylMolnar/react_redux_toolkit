import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { Report } from 'notiflix';
import axios from 'axios';
const baseURL = 'http://localhost:1234/';
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
  const response = await axios.get(`${baseURL}${url}`);
  return response.data;
});

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

    /*postAdded: (state, action) => {
      const id = state ? Number(state[state.length - 1].id) + 1 : 0;

      const newPost = {
        id: id.toString(),
        title: action.payload.target.elements.title.value,
        content: action.payload.target.elements.content.value,
        date: new Date().toISOString(),
      };

      state.push(newPost);
    },*/
    //or
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
        localStorage.setItem('posts', JSON.stringify(state));
      },

      prepare(title, content, userId) {
        try {
          Report.success('Post create successfully', '');
          return {
            payload: {
              id: nanoid(), //random id
              title,
              content,
              date: sub(new Date(), { minutes: 10 }).toISOString(),
              userId,
              reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
              },
            },
          };
        } catch (e) {
          Report.failure('Error Post not create', `Error: ${e.message}`);
        }
      },
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
