import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from '../pages/Counter';
import Missing from '../pages/Missing';
import About from '../pages/About';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/">
          <Route index element={<Counter />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default AppRouter;
