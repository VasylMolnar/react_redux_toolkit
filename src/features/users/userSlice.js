import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Report } from 'notiflix';

let initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = state => state.users;
export const selectUserById = (state, id) => {
  const user = state.users.find(user => {
    return user.id === Number(id);
  });

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
