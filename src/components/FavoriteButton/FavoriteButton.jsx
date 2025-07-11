import useFavorite from '../../hooks/useFavorite';
import HeartIcon from '../HeartIcon/HeartIcon';
import styles from './FavoriteButton.module.scss';

const FavoriteButton = ({ book }) => {
  const { liked, toggleFavorite } = useFavorite(book);

  return (
    <button
      className={styles.favorite}
      onClick={toggleFavorite}
      aria-label={liked ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      <HeartIcon liked={liked} />
    </button>
  );
};

export default FavoriteButton;
