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

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />

          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path=":id" element={<Post />} />
            <Route path="updatePost" element={<UpdatePost />} />
          </Route>

          <Route path="newPost" element={<NewPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default AppRouter;
