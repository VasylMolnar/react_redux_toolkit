import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../app/Reducers/actions';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Ul/Input/Input';
import Button from '../components/Ul/Button/Button';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <section className="section newPost">
      <div className="container ">
        <form
          className="form"
          onSubmit={e => {
            dispatch(updatePost(id, e));
            navigate('/posts');
          }}
        >
          <h3>Edit Post</h3>
          <label>
            New Title:
            <Input type="text" name="title" placeholder="New title" required />
          </label>

          <label>
            New Body:
            <textarea type="text" name="body" placeholder="New body" required />
          </label>

          <Button
            type="submit"
            aria-label="Add Item"
            className="btn btn-primary"
            style={{ border: 'none', width: '250px', height: '60px' }}
          >
            Update
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
