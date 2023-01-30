import { useState, React } from 'react';
import Input from '../components/Ul/Input/Input';
import Button from '../components/Ul/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest, selectPostById } from '../features/posts/postSlice';
import { selectAllUsers } from '../features/users/userSlice';
import { nanoid } from '@reduxjs/toolkit';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector(state => selectPostById(state, id));
  const users = useSelector(selectAllUsers);

  const [userId, setUserId] = useState(post.userId);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  let canUpdate = false;

  const updatePost = () => {
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
      url: `/posts/${id}`,
      method: 'put',
      name: 'update',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    };

    dispatch(apiRequest(option));
    navigate('/posts');
  };

  return (
    <section className="section newPost">
      <div className="container ">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            if (canUpdate) {
              updatePost();
            }
          }}
        >
          <h3>Update Post</h3>

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
            New Title:
            <Input
              onChange={e => setTitle(e.target.value)}
              value={title}
              type="text"
              name="title"
              placeholder="title"
              required
            />
          </label>

          <label>
            New Content:
            <textarea
              onChange={e => setContent(e.target.value)}
              value={content}
              type="text"
              name="content"
              placeholder="content"
              required
            />
          </label>

          <div>
            <Button
              type="submit"
              aria-label="Add Item"
              className="btn btn-warning"
              style={{ border: 'none', width: '250px', height: '60px' }}
              onClick={() => (canUpdate = true)}
            >
              Update Post
            </Button>
            <Button
              type="submit"
              onClick={e => {
                navigate(-1);
                canUpdate = false;
              }}
              className="btn btn-primary"
              style={{ border: 'none', width: '250px', height: '60px' }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePost;
