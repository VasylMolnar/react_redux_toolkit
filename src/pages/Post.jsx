import React from 'react';
import { Report } from 'notiflix';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts } from '../features/posts/postSlice';
import Button from '../components/Ul/Button/Button';
import { deletePost } from '../features/posts/postSlice';

const Post = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const posts = useSelector(selectAllPosts);
  const post = posts.find(post => post.id === id);

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
        <h3 className="card-title">{post.title}</h3>
        <p className="card-body">{post.content}</p>
        <p className="card-date">{post.date}</p>

        <div style={{ marginTop: '50px' }}>
          <Link to={'/posts'}>
            <Button
              className="btn btn-danger"
              onClick={() => dispatch(deletePost(id))}
            >
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
