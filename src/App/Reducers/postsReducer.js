import { DELETE_POST, NEW_POST, UPDATE_POST } from './type';
import { Report } from 'notiflix';

const initialState = {
  posts: JSON.parse(localStorage.getItem('listItems')) || [],
};

const posts = (state = initialState, action) => {
  //console.log(action.payload.currentTarget.elements.title.value); form elements (action newPost)
  switch (action.type) {
    case DELETE_POST:
      try {
        const post = state.posts.filter(
          el => el.id.toString() !== action.payload
        );
        localStorage.setItem('listItems', JSON.stringify(post));
        Report.success('Post deleted successfully', '');
        return { posts: post };
      } catch (e) {
        Report.failure('Error Post not deleted', `Error: ${e.message}`);
        break;
      }

    case NEW_POST:
      try {
        const id = state.posts.length
          ? state.posts[state.posts.length - 1].id + 1
          : 1;
        const newPost = [...state.posts, { ...action.payload, id }];
        localStorage.setItem('listItems', JSON.stringify(newPost));
        Report.success('Post create successfully', '');
        return { posts: newPost };
      } catch (e) {
        Report.failure('Error Post not create', `Error: ${e.message}`);
        break;
      }

    case UPDATE_POST:
      try {
        const updatePost = state.posts.map(el =>
          el.id.toString() === action.payload.id ? { ...action.payload } : el
        );
        localStorage.setItem('listItems', JSON.stringify(updatePost));
        Report.success('Post update successfully', '');
        return { posts: updatePost };
      } catch (e) {
        Report.failure('Error Update post not update', `Error: ${e.message}`);
        break;
      }

    default:
      return state;
  }
};

export default posts;
