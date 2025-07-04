import styles from './SearchBar.module.scss';

const SearchBar = ({ query, filter, onQueryChange, onFilterChange }) => {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="query">
        Поиск:
        <input
          id="query"
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Поиск книг..."
        />
      </label>
      <label htmlFor="filter">
        Тип книги:
        <select id="filter" value={filter} onChange={onFilterChange}>
          <option value="ebooks">Все электронные книги</option>
          <option value="free-ebooks">Бесплатные</option>
          <option value="paid-ebooks">Платные</option>
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
