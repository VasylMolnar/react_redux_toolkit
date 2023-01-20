import { React } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ posts }) => {
  if (!posts || !posts.length) {
    return (
      <section className="section post">
        <h1 className="container  text-warning text-center">Posts not found</h1>
      </section>
    );
  }

  return posts.map(post => (
    <div className="card" key={post.id} style={{ margin: '10px' }}>
      <Link
        to={`/posts/${post.id}`}
        className="card-body"
        style={{ textDecoration: 'none' }}
      >
        <h5 className="card-title">{post.title}</h5>
        <h5 className="card-body">{post.body}</h5>
        <p className="card-date">{post.datetime}</p>
      </Link>
    </div>
  ));
};

export default PostCard;
