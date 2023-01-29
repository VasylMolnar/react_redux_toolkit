import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../features/users/userSlice';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(selectAllUsers);

  const content = users.map(user => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section className="users section">
      <div className="container">
        <ul
          style={{
            fontSize: '24px',
          }}
        >
          <h2 style={{ marginBottom: '30px' }}>Users</h2>

          {content}
        </ul>
      </div>
    </section>
  );
};

export default Users;
