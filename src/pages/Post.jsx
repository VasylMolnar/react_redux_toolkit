import React from 'react';
import { Report } from 'notiflix';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/Ul/Button/Button';
import TimeAgo from '../components/TimeAgo';
import {
  selectPostById,
  useDeletePostMutation,
} from '../features/posts/postSlice';
import { selectUserById } from '../features/users/userSlice';

const Post = () => {
  const { id } = useParams();
  const post = useSelector(state => selectPostById(state, id));
  const user = useSelector(state => selectUserById(state, post.userId));
  const [deletePost] = useDeletePostMutation();

  if (!post) {
    Report.warning('Post not found', '');

    return (
      <section className="section posts text-center">
        <h1 className="container  text-warning text-center">Posts not found</h1>

        <Link to="/posts">
          <button
            className="btn btn-primary"
            style={{ width: '250px', marginTop: '30px' }}
          >
            Visit Our Homepage
          </button>
        </Link>
      </section>
    );
  }

  return (
    <section className="posts section">
      <div
        className=" card"
        style={{
          margin: '0px 30px',
          cursor: 'pointer',
          padding: '30px',
        }}
      >
        <h2>Author: {user?.name}</h2>
        <h3 className="card-title">{post.title}</h3>
        <p className="card-body">{post.content}</p>
        <p className="card-date">
          <TimeAgo timestamp={post.date} />
        </p>

        <div style={{ marginTop: '50px' }}>
          <Link to={'/posts'}>
            <Button className="btn btn-danger" onClick={() => deletePost(id)}>
              Delete
            </Button>
          </Link>

          <Link to={`/posts/updatePost/${id}`}>
            <Button className="btn btn-warning">Edit</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Post;
