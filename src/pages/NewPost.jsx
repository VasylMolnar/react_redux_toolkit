import React from 'react';
import Input from '../components/Ul/Input/Input';
import Button from '../components/Ul/Button/Button';
import { useDispatch } from 'react-redux';
import { newPost } from '../app/Reducers/actions';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section className="section newPost">
      <div className="container ">
        <form
          className="form"
          onSubmit={e => {
            dispatch(newPost(e));
            navigate('/posts/');
          }}
        >
          <h3>New Post</h3>
          <label>
            Title:
            <Input type="text" name="title" placeholder="title" required />
          </label>

          <label>
            Body:
            <textarea type="text" name="body" placeholder="body" required />
          </label>

          <Button
            type="submit"
            aria-label="Add Item"
            className="btn btn-warning"
            style={{ border: 'none', width: '250px', height: '60px' }}
          >
            Create
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewPost;
