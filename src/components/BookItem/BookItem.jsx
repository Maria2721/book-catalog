import styles from './BookItem.module.scss';

const BookItem = ({ book }) => {
  const { id, volumeInfo } = book;
  const { title, authors, description } = volumeInfo;

  const handleClick = () => {
    console.log(`Добавить в избранное книгу с id ${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h3>{title}</h3>
      <p>
        <strong>Автор: </strong>
        {authors?.join(', ') || 'Не указаны'}
      </p>
      <p>
        <strong>Описание: </strong>
        {description?.slice(0, 200) || 'Нет описания'}...
      </p>
    </div>
  );
};

export default BookItem;
