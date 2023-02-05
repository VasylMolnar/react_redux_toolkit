import { useState, React } from 'react';
import Search from '../components/Search';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import useSort from '../hooks/useSort';
import { Loading, Report } from 'notiflix';
import Button from '../components/Ul/Button/Button';
import { Link } from 'react-router-dom';
import { useGetPostsQuery, selectPostIds } from '../features/posts/postSlice';

const Posts = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery(); //have data byt we use orderedPostIds
  /*console.log(useGetPostsQuery());
  entities: 
      2: {…}, 3: {…}, 5: {…}}
  ids: 
      (3) [3, 5, 2]
    because in here we take data from postsAdapter (postSlices.js 17)

     return postsAdapter.setAll(initialState, responseData);     
     return responseData; if we delete (postsAdapter)  data will be different 
  */

  const orderedPostIds = useSelector(selectPostIds);
  /*console.log(orderedPostIds);[3, 5, 2]
   because in here we take data from selectPostIds === ids: (3) [3, 5, 2])*/

  const [searchValue, setSearchValue] = useState('');
  const sortPosts = useSort(orderedPostIds, searchValue);

  if (orderedPostIds.length === 0) {
    return (
      <section className="section posts">
        <div className="container">
          <section className="section post text-center">
            <h1 className="container  text-warning">List is empty.</h1>

            <Link to={'/NewPost'}>
              <Button className="btn btn-success" style={{ marginTop: '50px' }}>
                Create Post
              </Button>
            </Link>
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="section posts">
      <div className="container">
        <Search setSearchValue={setSearchValue} />
        {isLoading && Loading.hourglass(' Loading Items...')}
        {error && (Report.failure('Error', `${error}`), Loading.remove())}

        {!sortPosts ? (
          <div
            className="container text-center"
            style={{ marginTop: '100px', color: 'red' }}
          >
            <h1>Post Not Found</h1>
          </div>
        ) : (
          isSuccess &&
          !isError &&
          (Loading.remove(500),
          sortPosts.map(postIds => (
            <PostCard postIds={postIds.id} key={postIds.id} />
          )))
        )}
      </div>
    </section>
  );
};

export default Posts;
