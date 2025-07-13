import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './BookItem.module.scss';

const BookItem = ({ book }) => {
  const navigate = useNavigate();
  const { id, volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;

  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <FavoriteButton book={book} />
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
