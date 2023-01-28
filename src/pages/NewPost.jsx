import { useState, React } from 'react';
import Input from '../components/Ul/Input/Input';
import Button from '../components/Ul/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAdded } from '../features/posts/postSlice';
import { selectAllUsers } from '../features/users/userSlice';

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers);

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
            dispatch(postAdded({ title, content, userId }));
            dispatch();
            navigate('/posts');
          }}
        >
          <h3>New Post</h3>

          <label htmlFor="postAuthor" style={{ width: '500px' }}>
            Author:
            <select
              id="postAuthor"
              value={userId}
              onChange={e => setUserId(e.target.value)}
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
