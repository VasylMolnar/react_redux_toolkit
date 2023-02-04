import { useState, React } from 'react';
import Input from '../components/Ul/Input/Input';
import Button from '../components/Ul/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  //const users = useSelector(selectAllUsers);
  const users = [];
  const createNewPost = () => {
    const newPost = {
      id: nanoid(),
      userId,
      title,
      content,
      date: new Date().toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    };

    const option = {
      url: '/posts',
      method: 'post',
      name: 'create',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    };

    //dispatch(apiRequest(option));
    navigate('/posts');
  };

  return (
    <section className="section newPost">
      <div className="container ">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            createNewPost();
          }}
        >
          <h3>New Post</h3>

          <label htmlFor="postAuthor" style={{ width: '500px' }}>
            Author:
            <select
              id="postAuthor"
              value={userId}
              onChange={e => setUserId(Number(e.target.value))}
            >
              <option value=""></option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Title:
            <Input
              onChange={e => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="title"
              required
            />
          </label>

          <label>
            Content:
            <textarea
              onChange={e => setContent(e.target.value)}
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
