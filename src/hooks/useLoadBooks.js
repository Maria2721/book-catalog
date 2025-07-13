import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { fetchBooks } from '../api/booksApi';

const useLoadBooks = ({ query, filter, maxResults }) => {
  const [books, setBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);

  const cleanQuery = query?.trim();
  const currentStartIndex = useRef(0);
  const bookIds = useRef(new Set());

  const loadBooks = async () => {
    if (isFetching || isDone) return;

    setIsFetching(true);
    setError(null);

    let newBooks = [];
    let startIndex = currentStartIndex.current;

    try {
      while (newBooks.length < maxResults) {
        console.log(
          '[fetchBooks]',
          `query="${cleanQuery}", filter="${filter}", startIndex=${startIndex}, maxResults=${maxResults}`,
        );

        const data = await fetchBooks({
          query: cleanQuery,
          filter,
          maxResults,
          startIndex,
        });

        if (!data?.items?.length) {
          console.log('[Пустой ответ от API]');

          if (books.length === 0) {
            const msg = 'Ничего не найдено по вашему запросу';
            toast.info(msg);
            setError(msg);
          }
          setIsDone(true);
          break;
        }

        const uniqueBooks = data.items.filter((item) => {
          const isUnique = !bookIds.current.has(item.id);
          if (isUnique) {
            bookIds.current.add(item.id);
          }
          return isUnique;
        });

        newBooks = [...newBooks, ...uniqueBooks];
        startIndex += maxResults;

        if (startIndex >= data.totalItems) {
          setIsDone(true);
          break;
        }
      }

      console.log('[Добавлено книг]:', newBooks.length);
      setBooks((prev) => [...prev, ...newBooks]);
      currentStartIndex.current = startIndex;
    } catch (err) {
      console.error('[Ошибка запроса]', err);
      const msg = 'Не удалось загрузить книги. Попробуйте позже';
      toast.error(msg);
      setError(msg);
    } finally {
      setIsFetching(false);
    }
  };

  const reset = () => {
    console.log('[Сброс состояния]');
    setBooks([]);
    setIsDone(false);
    setError(null);
    currentStartIndex.current = 0;
    bookIds.current = new Set();
  };

  return {
    books,
    loadBooks,
    reset,
    isFetching,
    isDone,
    error,
  };
};

export default useLoadBooks;
