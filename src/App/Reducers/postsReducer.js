import { DELETE_POST, NEW_POST } from './type';

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
      return post;

    case NEW_POST:
      console.log(state.posts[state.posts.length - 1].id); /////////
      const id = state.posts[state.posts.length - 1] || 1;
      console.log('', id);
      const newPost = [...state.posts, { ...action.payload, id }];
      localStorage.setItem('listItems', JSON.stringify(newPost));
      return { posts: newPost };
    default:
      return state;
  }
};

export default posts;
