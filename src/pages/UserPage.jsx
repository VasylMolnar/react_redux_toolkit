import React from 'react';
import { useParams } from 'react-router-dom';
import { selectUserById } from '../features/users/userSlice';
import { useSelector } from 'react-redux';

const UserPage = () => {
  const { id } = useParams;
  const user = useSelector(state => selectUserById(state, id));

  return (
    <section className="users section">
      <div className="container"></div>
    </section>
  );
};

export default UserPage;
