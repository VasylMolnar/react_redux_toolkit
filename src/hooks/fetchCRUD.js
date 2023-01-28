import api from '../api/post';

export const fetchCRUD = async options => {
  const response = await api[options.method](
    options.url,
    options.body ? JSON.parse(options.body) : null,
    options.headers
  );

  return response.data;
};
