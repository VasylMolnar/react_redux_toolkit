import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { selectUserById } from '../features/users/userSlice';
import { useSelector } from 'react-redux';
import { useGetPostsByUserIdQuery } from '../features/posts/postSlice';

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(state => selectUserById(state, id));
  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(id);

  return (
    <section className="users section">
      <div className="container">
        <h2>Author: {user?.name}</h2>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error}</p>}
        {isSuccess &&
          (Object.values(postsForUser.entities).length ? (
            <ol className="section" style={{ fontSize: '20px' }}>
              {
                //console.log(postsForUser.entities)
                //console.log(Object.values(postsForUser.entities))
                Object.values(postsForUser.entities).map(post => (
                  <Link
                    to={`/posts/${post.id}`}
                    className="container"
                    style={{ marginTop: '10px', cursor: 'pointer' }}
                  >
                    <div className="card" style={{ padding: '30px' }}>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <p>{post.date}</p>
                    </div>
                  </Link>
                ))
              }
            </ol>
          ) : (
            <>
              <p style={{ color: 'red' }}>List empty.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/newPost')}
              >
                Create Post
              </button>
            </>
          ))}
      </div>
    </section>
  );
};

export default UserPage;
