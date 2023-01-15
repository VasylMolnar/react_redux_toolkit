import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from '../pages/Counter';
import About from '../pages/About';
import Missing from '../pages/Missing';
import Header from '../components/Header';
import store from '../App/index';
import { Provider } from 'react-redux';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Counter />} />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default AppRouter;
