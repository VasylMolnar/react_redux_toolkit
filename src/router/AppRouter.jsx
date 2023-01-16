import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from '../pages/Counter';
import About from '../pages/About';
import Missing from '../pages/Missing';
import Header from '../components/Header';
import store from '../app/index';
import { Provider } from 'react-redux';
import Posts from '../pages/Posts';
import Post from '../pages/Post';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Counter />} />

          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path=":id" element={<Post />} />
          </Route>

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default AppRouter;
