import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../components/Ul/Button/Button';

const Post = () => {
  const { id } = useParams();
  const posts = useSelector(state => state.posts.posts);
  const post = posts.find(post => post.id);

  return (
    <section className="section post">
      <div className="container">
        <div className=" card card-body " style={{ marginBottom: '10px' }}>
          <h5 className="card-title">{post.title}</h5>
          <h5 className="card-body">{post.body}</h5>
          <p className="card-date">{post.datetime}</p>
        </div>

        <Button
          type="button"
          className="btn btn-danger"
          style={{ border: 'none' }}
        >
          Delete
        </Button>

        <Button
          type="button"
          className="btn btn-warning"
          style={{ border: 'none' }}
        >
          Edit
        </Button>
      </div>
    </section>
  );
};

export default Post;
