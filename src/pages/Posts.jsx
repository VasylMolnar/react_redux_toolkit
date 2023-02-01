import { useState, React, useEffect } from 'react';
import Search from '../components/Search';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPostIds,
  errorMessage,
  postStatus,
  fetchPosts,
} from '../features/posts/postSlice';
import useSort from '../hooks/useSort';
import { Loading, Report, Notify } from 'notiflix';
import Button from '../components/Ul/Button/Button';
import { Link } from 'react-router-dom';

const Posts = () => {
  //const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const status = useSelector(postStatus);
  const error = useSelector(errorMessage);

  const orderedPostIds = useSelector(selectPostIds);
  const [searchValue, setSearchValue] = useState('');
  const sortPosts = useSort(orderedPostIds, searchValue);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts('posts'));
    }
  }, [status, dispatch]);

  if (sortPosts.length === 0) {
    return (
      <section className="section posts">
        <div className="container">
          {Notify.warning('List is empty.')}
          <section className="section post text-center">
            <h1 className="container  text-warning">List is empty.</h1>

            <Link to={'/NewPost'}>
              <Button className="btn btn-success" style={{ marginTop: '50px' }}>
                Create Post
              </Button>
            </Link>
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="section posts">
      <div className="container">
        <Search setSearchValue={setSearchValue} />
        {status === 'loading' && Loading.hourglass(' Loading Items...')}
        {error && (Report.failure('Error', `${error}`), Loading.remove())}
        {status === 'succeeded' &&
          !error &&
          (Loading.remove(500),
          sortPosts.map(postIds => (
            <PostCard postIds={postIds.id} key={postIds} />
          )))}
      </div>
    </section>
  );
};

export default Posts;
