const initialState = {
  posts: [
    {
      id: 1,
      title: 'test1',
      datetime: 'January 04, 2023 2:39:38 PM',
      body: 'test1',
    },
    {
      id: 2,
      title: 'test2',
      datetime: 'January 10, 2023 12:39:38 PM',
      body: 'test2',
    },
    {
      id: 3,
      title: 'test3',
      datetime: 'January 04, 2023 5:9:38 PM',
      body: 'test4',
    },
  ],
};

const posts = (state = initialState, action) => {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    default:
      return state;
  }
};

export default posts;
