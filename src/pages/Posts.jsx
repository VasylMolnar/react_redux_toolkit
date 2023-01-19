import { useState, React } from 'react';
import PostCard from '../components/PostCard';
import Search from '../components/Search';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSort } from '../hooks/useSort';

const Posts = () => {
  //const [searchValue, setSearchValue] = useState('');
  const posts = useSelector(state => state.posts.posts);
  //const searchResults = useSort(posts, searchValue);

  if (!posts || !posts.length) {
    return (
      <section className="section post">
        <h1 className="container  text-danger text-center">List empty.</h1>

        <Link
          to="/NewPost"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            marginTop: '50px',
          }}
        >
          <button className="btn btn-success "> Create Post</button>
        </Link>
      </section>
    );
  }

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
