import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../components/Ul/Button/Button';
import { deletePost } from '../app/Reducers/actions';

const Post = () => {
  //const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const post = posts.find(post => post.id.toString() === id);

  return (
    <section className="section post">
      <div className="container">
        <div className=" card card-body " style={{ marginBottom: '10px' }}>
          <h5 className="card-title">{post.title}</h5>
          <h5 className="card-body">{post.body}</h5>
          <p className="card-date">{post.datetime}</p>
        </div>

        <Link to={`/posts`}>
          {/* or navigate */}
          <Button
            type="button"
            className="btn btn-danger"
            style={{ border: 'none' }}
            onClick={() => {
              dispatch(deletePost(id));
              //navigate('/posts');
            }}
          >
            Delete
          </Button>
        </Link>

        <Link to={`/posts/edit/${id}`}>
          <Button
            type="button"
            className="btn btn-warning"
            style={{ border: 'none' }}
          >
            Edit
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Post;
