import React from 'react';
import { useParams } from 'react-router-dom';
import { selectUserById } from '../features/users/userSlice';
import { useSelector } from 'react-redux';
import { selectPostsByUser } from '../features/posts/postSlice';

const UserPage = () => {
  const { id } = useParams();
  const user = useSelector(state => selectUserById(state, id));
  const postsForUser = useSelector(state => selectPostsByUser(state, id));
  //  console.log('', postsForUser);

  return (
    <section className="users section">
      <div className="container">
        <h2>{user?.name}</h2>
        <ol>{postsForUser}</ol>
      </div>
    </section>
  );
};

export default UserPage;
