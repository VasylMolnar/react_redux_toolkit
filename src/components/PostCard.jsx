import React from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix';

const PostCard = ({ items }) => {
  if (!items || !items.length) {
    Notify.warning('Posts not found');
    return (
      <section className="section post">
        <h1 className="container  text-warning text-center">Posts not found</h1>
      </section>
    );
  }

  return items.map(item => (
    <div
      className="card"
      key={item.id}
      style={{ margin: '10px', cursor: 'pointer' }}
    >
      <Link
        to={`/posts/${item.id}`}
        className="card-body"
        style={{ textDecoration: 'none' }}
      >
        <h3 className="card-title">{item.title}</h3>
        <p className="card-body">{item.content}</p>
        <p className="card-date">{item.date}</p>
      </Link>
    </div>
  ));
};

export default PostCard;
