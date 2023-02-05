import React from 'react';
import Button from './Ul/Button/Button';
import { useAddReactionMutation } from '../features/posts/postSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ reactions, id }) => {
  const reactionButtons = [];
  const [reactionAdded] = useAddReactionMutation();

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
        onClick={() => {
          reactionAdded({
            postId: id,
            reactions: { ...reactions, [key]: reactions[key] + 1 },
          });
        }}
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
