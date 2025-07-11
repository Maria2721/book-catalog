import { useQuery } from '@tanstack/react-query';
import { fetchBookById } from '../api/bookByIdApi';

const useBookById = (bookId) => {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: () => fetchBookById(bookId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !!bookId,
  });
};

export default useBookById;
