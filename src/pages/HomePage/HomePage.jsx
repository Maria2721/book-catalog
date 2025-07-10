import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import useLoadBooks from '../../hooks/useLoadBooks';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/BookList/BookList';

const HomePage = () => {
  const [query, setQuery] = useState('JavaScript');
  const [filter, setFilter] = useState('ebooks');
  const maxResults = 20;

  const [debouncedQuery] = useDebounce(query, 500);

  const { books, loadBooks, reset, isFetching, isDone, error } = useLoadBooks({
    query: debouncedQuery,
    filter,
    maxResults,
  });

  const isFetchingRef = useRef(isFetching);
  const isDoneRef = useRef(isDone);

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  useEffect(() => {
    isDoneRef.current = isDone;
  }, [isDone]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (!debouncedQuery) return;

    reset();
    loadBooks();
  }, [debouncedQuery, filter]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (nearBottom && !isFetchingRef.current && !isDoneRef.current) {
        loadBooks();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h1>Каталог книг</h1>

      <SearchBar
        query={query}
        filter={filter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
      />

      <BookList books={books} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isFetching && <p>Загрузка...</p>}

      {!isFetching && books.length === 0 && !error && (
        <p>Ничего не найдено. Попробуйте изменить запрос.</p>
      )}

      {isDone && books.length > 0 && <p style={{ marginTop: '1rem' }}>Все книги загружены</p>}
    </div>
  );
};

export default HomePage;
