import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useLoadBooks from '../../hooks/useLoadBooks';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/BookList/BookList';

const HomePage = () => {
  const [query, setQuery] = useState('JavaScript');
  const [filter, setFilter] = useState('ebooks');
  const maxResults = 10;

  const [debouncedQuery] = useDebounce(query, 500);

  const { books, loadBooks, reset, isFetching, isDone, error } = useLoadBooks({
    query: debouncedQuery,
    filter,
    maxResults,
  });

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

      {!isFetching && !isDone && books.length > 0 && (
        <button onClick={loadBooks} disabled={isFetching}>
          Показать ещё
        </button>
      )}

      {isDone && books.length > 0 && <p style={{ marginTop: '1rem' }}>Все книги загружены</p>}
    </div>
  );
};

export default HomePage;
