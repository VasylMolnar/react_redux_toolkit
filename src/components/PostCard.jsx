import React from 'react';
import { Link } from 'react-router-dom';
import ReactionButtons from './ReactionButtons';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { useSelector } from 'react-redux';
import { selectPostById } from '../features/posts/postSlice';

const PostCard = ({ postIds }) => {
  const post = useSelector(state => selectPostById(state, postIds));
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
        <p className="card-name">{<PostAuthor userId={post.userId} />}</p>
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

export default PostCard;
