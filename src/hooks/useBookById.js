import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchBookById } from '../api/bookByIdApi';

const useBookById = (bookId) => {
  const query = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => fetchBookById(bookId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!bookId,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error('Не удалось загрузить книгу. Попробуйте позже');
    }
  }, [query.isError]);

  return query;
};

export default useBookById;
