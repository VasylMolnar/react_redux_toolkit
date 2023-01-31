import React from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix';
import ReactionButtons from './ReactionButtons';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

let PostCard = ({ post }) => {
  if (!post) {
    Notify.warning('List is empty.');
    return (
      <section className="section post">
        <h1 className="container  text-warning text-center">List is empty.</h1>
      </section>
    );
  }

  return (
    <div
      className="card"
      key={post.id}
      style={{ margin: '10px', cursor: 'pointer' }}
    >
      <Link
        to={`/posts/${post.id}`}
        className="card-body"
        style={{ textDecoration: 'none' }}
      >
        <h3 className="card-title">{post.title}</h3>
        <p className="card-name">
          <PostAuthor userId={post.userId} />
        </p>
        <p className="card-body">{post.content}</p>
        <p className="card-date">
          <TimeAgo timestamp={post.date} />
        </p>
      </Link>
      <div className="button_list">
        <ReactionButtons reactions={post.reactions} id={post.id} />
      </div>
    </div>
  );
};

PostCard = React.memo(PostCard);
export default PostCard;
