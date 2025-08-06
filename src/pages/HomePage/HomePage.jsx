import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';
import useLoadBooks from '../../hooks/useLoadBooks';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/BookList/BookList';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';

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

  return (
    <div>
      <h1>Каталог книг</h1>
      <SearchBar
        query={query}
        filter={filter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
      />
      <InfiniteScroll loadMore={loadBooks} hasMore={!isDone} isLoading={isFetching}>
        <BookList books={books} />
      </InfiniteScroll>

      {error && !isFetching && <p>{error}</p>}
      {isDone && books.length > 0 && <p>Все книги загружены</p>}
    </div>
  );
};

export default HomePage;
