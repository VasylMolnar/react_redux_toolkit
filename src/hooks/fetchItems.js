import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:1234/';

export const fetchItems = createAsyncThunk('users/fetchItems', async url => {
  const response = await axios.get(`${baseURL}${url}`);
  return response.data;
});
