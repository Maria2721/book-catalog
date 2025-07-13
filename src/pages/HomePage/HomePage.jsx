import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';
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
    if (!debouncedQuery) {
      toast.error('Введите обязательный параметр: Поиск');
      return;
    }

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
      {isFetching && <p>Загрузка...</p>}
      {error && !isFetching && <p>{error}</p>}
      {isDone && books.length > 0 && <p>Все книги загружены</p>}
    </div>
  );
};

export default HomePage;
