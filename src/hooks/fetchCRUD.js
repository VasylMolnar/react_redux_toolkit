import api from '../api/post';

export const fetchCRUD = async options => {
  const response = await api[options.method](
    options.url,
    options.body ? JSON.parse(options.body) : null
  );

  console.log(response.data);
  return response.data;
};

/*
export const fetchCRUD = async (url, options) => {
  const response = await axios
    .create(baseURL)
    [options.method](
      url,
      options.body ? JSON.parse(options.body) : null,
      options.headers
    );

  return response.data;
};*/

/*
 reducer(state, action) {
        state.push(action.payload);
      },

      prepare(title, content, userId) {
        try {
          Report.success('Post create successfully', '');
          return {
            payload: {
              id: nanoid(), //random id
              title,
              content,
              date: sub(new Date(), { minutes: 10 }).toISOString(),
              userId,
              reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
              },
            },
          };
        } catch (e) {
          Report.failure('Error Post not create', `Error: ${e.message}`);
        }
      },
*/
