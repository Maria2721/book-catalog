import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useSearchBooks from '../../hooks/useSearchBooks';

const HomePage = () => {
  const [query, setQuery] = useState('JavaScript');
  const [filter, setFilter] = useState('ebooks');
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 10;

  const [books, setBooks] = useState([]);

  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError, error, isFetching } = useSearchBooks({
    query: debouncedQuery,
    filter,
    maxResults,
    startIndex,
  });

  useEffect(() => {
    if (data?.items) {
      setBooks((prevBooks) => {
        return startIndex === 0 ? data.items : [...prevBooks, ...data.items];
      });
    }
  }, [data, startIndex]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setStartIndex(0);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setStartIndex(0);
  };

  const loadMore = () => {
    setStartIndex((prev) => prev + maxResults);
  };

  return (
    <div>
      <h1>Каталог книг</h1>

      <div>
        <input type="text" value={query} onChange={handleQueryChange} placeholder="Поиск книг..." />

        <select value={filter} onChange={handleFilterChange}>
          <option value="ebooks">Все электронные книги</option>
          <option value="free-ebooks">Бесплатные</option>
          <option value="paid-ebooks">Платные</option>
        </select>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>
              <strong>Автор: </strong>
              {book.volumeInfo.authors?.join(', ') || 'Не указаны'}
            </p>
            <p>
              <strong>Описание: </strong>
              {book.volumeInfo.description?.slice(0, 150) || 'Нет описания'}...
            </p>
          </li>
        ))}
      </ul>

      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Ошибка: {error.message}</p>}

      {!isLoading && books.length === 0 && <p>Книги не найдены.</p>}

      {data?.totalItems > startIndex + maxResults && (
        <button onClick={loadMore} disabled={isFetching}>
          {isFetching ? 'Загрузка...' : 'Показать ещё'}
        </button>
      )}
    </div>
  );
};

export default HomePage;
