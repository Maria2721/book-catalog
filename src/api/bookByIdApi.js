import axios from 'axios';

export const buildBookApiUrl = (bookId) => `https://www.googleapis.com/books/v1/volumes/${bookId}`;

export const fetchBookById = async (bookId) => {
  const url = buildBookApiUrl(bookId);
  const response = await axios.get(url);
  return response.data;
};
