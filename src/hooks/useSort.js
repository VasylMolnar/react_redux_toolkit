import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectPostById } from '../features/posts/postSlice';

const useSort = (postsIds, searchValue) => {
  const items = useSelector(state => {
    return postsIds.map(postId => selectPostById(state, postId));
  });

  const sort = useMemo(() => {
    return items.filter(
      item =>
        item.content.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [items, searchValue]);

  return sort;
};

export default useSort;
