import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCount, increaseCount } from '../../../features/posts/postSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ padding: '10px' }}
    >
      <NavLink to="posts" className="navbar-brand">
        Posts
      </NavLink>
      <NavLink to="newPost" className="navbar-brand">
        New Post
      </NavLink>
      <NavLink to="users" className="navbar-brand">
        Users
      </NavLink>
      <NavLink to="/about" className="navbar-brand">
        About
      </NavLink>
      <button onClick={() => dispatch(increaseCount())}>{count}</button>
    </nav>
  );
};

export default Nav;
