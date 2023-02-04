import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { selectUserById } from '../features/users/userSlice';
import { useSelector } from 'react-redux';
//import { selectPostsByUser } from '../features/posts/postSlice';

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(state => selectUserById(state, id));
  // = useSelector(state => selectPostsByUser(state, id));
  const postsForUser = [];
  if (!postsForUser.length) {
    return (
      <section className="users section">
        <div className="container">
          <h2>Author: {user?.name}</h2>
          <p style={{ color: 'red' }}>List empty.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/newPost')}
          >
            Create Post
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="users section">
      <div className="container">
        <h2>Author: {user?.name}</h2>
        <ol className="section" style={{ fontSize: '20px' }}>
          {postsForUser.map(post => (
            <Link
              to={`/posts/updatePost/${post.id}`}
              className="container"
              style={{ marginTop: '10px', cursor: 'pointer' }}
            >
              <div className="card" style={{ padding: '30px' }}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>{post.date}</p>
              </div>
            </Link>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default UserPage;
