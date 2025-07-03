import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const buildBooksApiUrl = ({ query, filter, maxResults, startIndex }) =>
  `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=${filter}&maxResults=${maxResults}&printType=BOOKS&startIndex=${startIndex}`;

const fetchBooks = async ({ queryKey }) => {
  const [, { query, filter, maxResults, startIndex }] = queryKey;
  const url = buildBooksApiUrl({ query, filter, maxResults, startIndex });
  const response = await axios.get(url);
  return response.data;
};

const useSearchBooks = ({ query, filter, maxResults, startIndex }) => {
  return useQuery({
    queryKey: ['books', { query, filter, maxResults, startIndex }],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    retry: 2,
    enabled: !!query,
  });
};

export default useSearchBooks;
