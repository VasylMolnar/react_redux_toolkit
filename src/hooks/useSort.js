import { useMemo } from 'react';

const useSort = (items, searchValue) => {
  console.log('useSort');
  const sort = useMemo(() => {
    console.log('useMemo');

    return items.filter(
      item =>
        item.content.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [items, searchValue]);

  return sort;
};

export default useSort;
