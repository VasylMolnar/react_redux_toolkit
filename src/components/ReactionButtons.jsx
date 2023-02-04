import React from 'react';
import Button from './Ul/Button/Button';
import { useDispatch } from 'react-redux';
import { reactionAdded } from '../features/posts/postSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ reactions, id }) => {
  const dispatch = useDispatch();
  const reactionButtons = [];

  for (const key in reactions) {
    reactionButtons.push(
      <Button
        key={key}
        type="button"
        className="btn btn-outline-primary"
        style={{
          width: '70px',
          height: '45x',
          border: '1px solid gray',
          borderRadius: '20px',
        }}
        //onClick={() => dispatch(reactionAdded({ postId: id, reaction: key }))}
      >
        {reactionEmoji[key]} {reactions[key]}
      </Button>
    );
  }

  //console.log(reactionButtons);
  return reactionButtons;
};

export default ReactionButtons;

/*
 //console.log('key', key);
 //console.log('value', reactionEmoji[key]);
 */
