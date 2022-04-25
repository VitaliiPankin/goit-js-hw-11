import axios from 'axios';
import { refs } from '../index';
axios.defaults.baseURL = `https://pixabay.com/api/`;

const fetchSearchFN = async () => {
  const { data } = await axios.get(
    `?key=26643040-32c641035684a1e3b6d895020&q=${refs.searchInputValue}&page=${
      refs.pageNumber
    }&per_page=${8}&image_type=photo&orientation=horizontal&safesearch=true`,
  );

  return data;
};

export default { fetchSearchFN };
