import axios from 'axios';

export const buildBooksApiUrl = ({ query, filter, maxResults, startIndex }) =>
  `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=${filter}&maxResults=${maxResults}&printType=BOOKS&startIndex=${startIndex}`;

export const fetchBooks = async ({ query, filter, maxResults, startIndex }) => {
  const url = buildBooksApiUrl({ query, filter, maxResults, startIndex });
  const response = await axios.get(url);
  return response.data;
};
