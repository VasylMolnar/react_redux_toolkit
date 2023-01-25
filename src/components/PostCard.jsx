import React from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix';
import ReactionButtons from './ReactionButtons';

const PostCard = ({ items }) => {
  if (!items || !items.length) {
    Notify.warning('List is empty.');
    return (
      <section className="section post">
        <h1 className="container  text-warning text-center">List is empty.</h1>
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
        <h5 className="card-name">{item.user}</h5>
        <p className="card-body">{item.content}</p>
        <p className="card-date">{item.date}</p>
        <div className="button_list">
          <ReactionButtons items={items} />
        </div>
      </Link>
    </div>
  ));
};

export default PostCard;
