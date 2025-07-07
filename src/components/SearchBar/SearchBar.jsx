import styles from './SearchBar.module.scss';

const SearchBar = ({ query, filter, onQueryChange, onFilterChange }) => {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="query" className={styles.label}>
        Поиск:
        <input
          id="query"
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Поиск книг..."
          className={styles.search}
        />
      </label>
      <label htmlFor="filter" className={styles.label}>
        Тип книги:
        <select id="filter" value={filter} onChange={onFilterChange} className={styles.filter}>
          <option value="ebooks">Все электронные книги</option>
          <option value="free-ebooks">Бесплатные</option>
          <option value="paid-ebooks">Платные</option>
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
