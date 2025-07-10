import { useState, useEffect } from 'react';
import useFavorites from '../../hooks/useFavorites';
import HeartIcon from '../HeartIcon/HeartIcon';
import styles from './BookItem.module.scss';

const BookItem = ({ book }) => {
  const { id, volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;

  const [liked, setLiked] = useState(false);
  const { toggleFavorite } = useFavorites();

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    const alreadyLiked = books.some((item) => item.id === id);
    if (alreadyLiked) {
      setLiked(true);
    }
  }, [id]);

  const handleClick = () => {
    console.log(`Открыть старницу книги с id ${id}`);
  };

  const handleFavoriteChange = (e) => {
    e.stopPropagation();

    const newLiked = !liked;
    setLiked(newLiked);
    toggleFavorite(book, newLiked);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <button
        className={styles.favorite}
        onClick={handleFavoriteChange}
        aria-label={liked ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <HeartIcon liked={liked} />
      </button>

      <img className={styles.image} src={imageLinks?.thumbnail} alt={title} />

      <h3 className={styles.title}>{title}</h3>
      <p>
        <strong>Автор: </strong>
        {authors?.join(', ') || 'Не указаны'}
      </p>
      <p>
        <strong>Описание: </strong>
        {description?.slice(0, 150) || 'Нет описания'}...
      </p>
    </div>
  );
};

export default BookItem;
