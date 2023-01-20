import { DELETE_POST, NEW_POST, UPDATE_POST } from './type';

const initialState = {
  posts: JSON.parse(localStorage.getItem('listItems')) || [],
};

const posts = (state = initialState, action) => {
  //console.log(action.payload.currentTarget.elements.title.value); form elements (action newPost)
  switch (action.type) {
    case DELETE_POST:
      const post = state.posts.filter(
        el => el.id.toString() !== action.payload
      );
      localStorage.setItem('listItems', JSON.stringify(post));
      return { posts: post };

    case NEW_POST:
      const id = state.posts.length
        ? state.posts[state.posts.length - 1].id + 1
        : 1;
      const newPost = [...state.posts, { ...action.payload, id }];
      localStorage.setItem('listItems', JSON.stringify(newPost));
      return { posts: newPost };

    case UPDATE_POST:
      const updatePost = state.posts.map(el =>
        el.id.toString() === action.payload.id ? { ...action.payload } : el
      );
      localStorage.setItem('listItems', JSON.stringify(updatePost));
      return { posts: updatePost };

    default:
      return state;
  }
};

export default posts;
