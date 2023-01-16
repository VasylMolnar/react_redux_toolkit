import React from 'react';
import PostCard from '../components/PostCard';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  return (
    <section className="section post">
      <div className="container">
        <Search />
        <PostCard posts={posts} />
      </div>
    </section>
  );
};

export default Posts;
