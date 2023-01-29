import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItems } from '../../hooks/fetchItem';
import { Report } from 'notiflix';
/*
const initialState = [
  { id: '0', name: 'User 1' },
  { id: '1', name: 'User 2' },
  { id: '2', name: 'User 3' },
];*/

let initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchItems', async url => {
  return await fetchItems(url);
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //console.log(action.payload);
      return action.payload;
    });
  },
});

export const selectAllUsers = state => state.users;
export const selectUserById = (state, id) => {
  const user = state.users.find(user => user.id === id);

  if (!user) {
    Report.failure('User not found', '');
    return [];
  }

  return user;
};

export default usersSlice.reducer;

/* this is not working because in Redux we mast working in createAsyncThunk (in js and React Component is working but not in Redux) 
 usersPost: (state, action) => {
      let a = [];

      FetchPost().then(response => {
        a = response;
        console.log(a);
      });
      console.log(a);
      // return (state = rez);
    },
*/
