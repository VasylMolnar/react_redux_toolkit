import { useState, React } from 'react';
import Search from '../components/Search';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../features/posts/postSlice';
import useSort from '../hooks/useSort';

const Posts = () => {
  //const posts = useSelector(state => state.posts);
  const posts = useSelector(selectAllPosts);
  const [searchValue, setSearchValue] = useState('');
  const sortPosts = useSort(posts, searchValue);

  return (
    <section className="section posts">
      <div className="container">
        <Search setSearchValue={setSearchValue} />
        <PostCard posts={sortPosts.reverse()} />
      </div>
    </section>
  );
};

export default Posts;
