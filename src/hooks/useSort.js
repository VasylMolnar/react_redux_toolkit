import { useMemo } from 'react';

export const useSort = (posts, searchValue) => {
  //console.log('useSort');
  return useMemo(() => {
    //console.log('useMemo');
    const filteredResults = posts.filter(
      post =>
        post.body.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredResults;
  }, [posts, searchValue]);
};
