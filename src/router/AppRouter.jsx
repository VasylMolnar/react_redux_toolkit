import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import About from '../pages/About';
import Missing from '../pages/Missing';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import NewPost from '../pages/NewPost';
import UpdatePost from '../pages/UpdatePost';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Home from '../pages/Home';
import Users from '../pages/Users';
import UserPage from '../pages/UserPage';
import { extendedApiSlice } from '../features/posts/postSlice';
import { usersApiSlice } from '../features/users/userSlice';

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Header />}>
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
