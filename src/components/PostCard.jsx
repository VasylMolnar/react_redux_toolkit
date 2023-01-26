import React from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix';
import ReactionButtons from './ReactionButtons';
import PostAuthor from './PostAuthor';

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
        <p className="card-name">
          <PostAuthor userId={item.userId} />
        </p>
        <p className="card-body">{item.content}</p>
        <p className="card-date">{item.date}</p>
      </Link>
      <div className="button_list">
        <ReactionButtons reactions={item.reactions} id={item.id} />
      </div>
    </div>
  ));
};

export default PostCard;
