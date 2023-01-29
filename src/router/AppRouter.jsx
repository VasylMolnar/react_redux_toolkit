import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Missing from '../pages/Missing';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import NewPost from '../pages/NewPost';
import UpdatePost from '../pages/UpdatePost';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Home from '../pages/Home';
import { fetchUsers } from '../features/users/userSlice';
import Users from '../pages/Users';
import UserPage from '../pages/UserPage';

store.dispatch(fetchUsers('users'));

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />

          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path=":id" element={<Post />} />
            <Route path="updatePost/:id" element={<UpdatePost />} />
          </Route>
          <Route path="newPost" element={<NewPost />} />

          <Route path="users">
            <Route index element={<Users />} />
            <Route path=":id" element={<UserPage />} />
          </Route>

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default AppRouter;
