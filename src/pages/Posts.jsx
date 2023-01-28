import { useState, React, useEffect } from 'react';
import Search from '../components/Search';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  errorMessage,
  postStatus,
  fetchPosts,
} from '../features/posts/postSlice';

import useSort from '../hooks/useSort';
import { Loading, Report } from 'notiflix';

const Posts = () => {
  //const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(postStatus);
  const error = useSelector(errorMessage);
  const [searchValue, setSearchValue] = useState('');
  const sortPosts = useSort(posts, searchValue);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts('posts'));
    }
  }, [status, dispatch]);

  return (
    <section className="section posts">
      <div className="container">
        <Search setSearchValue={setSearchValue} />
        {status === 'loading' && Loading.hourglass(' Loading Items...')}
        {error && (Report.failure('Error', `${error}`), Loading.remove())}
        {status === 'succeeded' &&
          !error &&
          (Loading.remove(500), (<PostCard posts={sortPosts} />))}
      </div>
    </section>
  );
};

export default Posts;
