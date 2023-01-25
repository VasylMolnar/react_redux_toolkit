import React from 'react';
import Button from './Ul/Button/Button';
import { useDispatch } from 'react-redux';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ items }) => {
  const dispatch = useDispatch();

  return reactionEmoji.map(el => (
    <Button type="button" className="reactionButton">
      {el}
    </Button>
  ));
};

export default ReactionButtons;
