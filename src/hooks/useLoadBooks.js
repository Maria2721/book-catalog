import { useState, useRef } from 'react';
import { fetchBooks } from '../api/booksApi';

const useLoadBooks = ({ query, filter, maxResults }) => {
  const [books, setBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);
  const currentStartIndex = useRef(0);

  const loadBooks = async () => {
    if (isFetching || isDone) return;

    setIsFetching(true);
    setError(null);

    let newBooks = [];
    let startIndex = currentStartIndex.current;

    const bookIds = new Set(books.map((book) => book.id));
    const newBookIds = new Set();

    try {
      while (newBooks.length < maxResults) {
        const data = await fetchBooks({
          query,
          filter,
          maxResults,
          startIndex,
        });

        if (!data?.items?.length) {
          if (books.length === 0) {
            setError('Ничего не найдено по вашему запросу');
          }
          setIsDone(true);
          break;
        }

        const uniqueBooks = data.items.filter((item) => {
          const isUnique = !bookIds.has(item.id) && !newBookIds.has(item.id);
          if (isUnique) {
            newBookIds.add(item.id);
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

      setBooks((prev) => [...prev, ...newBooks.slice(0, maxResults)]);
      currentStartIndex.current = startIndex;
    } catch {
      setError('Не удалось загрузить книги. Попробуйте позже');
    } finally {
      setIsFetching(false);
    }
  };

  const reset = () => {
    setBooks([]);
    setIsDone(false);
    setError(null);
    currentStartIndex.current = 0;
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
