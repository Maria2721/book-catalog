import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/booksApi';

const useSearchBooks = ({ query, filter, maxResults, startIndex }) => {
  return useQuery({
    queryKey: ['books', { query, filter, maxResults, startIndex }],
    queryFn: () => fetchBooks({ query, filter, maxResults, startIndex }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    retry: 1,
    enabled: !!query,
  });
};

export default useSearchBooks;
