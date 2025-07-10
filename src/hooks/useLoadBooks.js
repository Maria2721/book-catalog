import { useState, useRef } from 'react';
import { fetchBooks } from '../api/booksApi';

const useLoadBooks = ({ query, filter, maxResults }) => {
  const [books, setBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);

  const currentStartIndex = useRef(0);
  const isLoadingLock = useRef(false);

  const bookIds = useRef(new Set());

  const loadBooks = async () => {
    if (isLoadingLock.current || isFetching || isDone) return;

    isLoadingLock.current = true;
    setIsFetching(true);
    setError(null);

    let newBooks = [];
    let startIndex = currentStartIndex.current;

    try {
      while (newBooks.length < maxResults) {
        console.log(
          '[fetchBooks]',
          `query="${query}", filter="${filter}", startIndex=${startIndex}, maxResults=${maxResults}`,
        );

        const data = await fetchBooks({
          query,
          filter,
          maxResults,
          startIndex,
        });

        if (!data?.items?.length) {
          console.log('[Пустой ответ от API]');

          if (books.length === 0) {
            setError('Ничего не найдено по вашему запросу');
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

      //setBooks((prev) => [...prev, ...newBooks.slice(0, maxResults)]);
      console.log('[Добавлено книг]:', newBooks.length);
      setBooks((prev) => [...prev, ...newBooks]);
      currentStartIndex.current = startIndex;
    } catch (err) {
      console.error('[Ошибка запроса]', err);
      setError('Не удалось загрузить книги. Попробуйте позже');
    } finally {
      isLoadingLock.current = false;
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
