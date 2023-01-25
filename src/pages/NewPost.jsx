import React from 'react';
import Input from '../components/Ul/Input/Input';
import Button from '../components/Ul/Button/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAdded } from '../features/posts/postSlice';

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section className="section newPost">
      <div className="container ">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();

            //dispatch(postAdded(e));
            //or (postSlice.js)
            const title = e.target.title.value;
            const content = e.target.content.value;
            dispatch(postAdded(title, content));
            navigate('/posts');
          }}
        >
          <h3>New Post</h3>
          <label>
            Title:
            <Input type="text" name="title" placeholder="title" required />
          </label>

          <label>
            Content:
            <textarea
              type="text"
              name="content"
              placeholder="content"
              required
            />
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
