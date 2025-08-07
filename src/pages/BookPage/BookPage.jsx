import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import useBookById from '../../hooks/useBookById';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import styles from './BookPage.module.scss';

const BookPage = () => {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useBookById(bookId);

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка при загрузке книги</p>;

  const description =
    typeof book?.volumeInfo?.description === 'string'
      ? parse(book.volumeInfo.description)
      : 'Нет описания';

  return (
    <div>
      <h1>Информация о книге</h1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img
            className={styles.image}
            src={book?.volumeInfo?.imageLinks?.thumbnail}
            alt={book?.volumeInfo?.title}
            loading="lazy"
          />
          <div className={styles.info}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>{book?.volumeInfo?.title}</h2>
              <FavoriteButton book={book} />
            </div>
            <p>
              <strong>Автор: </strong>
              {book?.volumeInfo?.authors?.join(', ') || 'Не указаны'}
            </p>
            <p>
              <strong>Издательство: </strong>
              {book?.volumeInfo?.publisher || 'Не указано'}
            </p>
            <p>
              <strong>Дата публикации: </strong>
              {book?.volumeInfo?.publishedDate || 'Не указана'}
            </p>
            <p>
              <strong>Количество страниц: </strong>
              {book?.volumeInfo?.pageCount || 'Не указано'}
            </p>
            <p>
              <strong> Средний рейтинг : </strong>
              {book?.volumeInfo?.averageRating
                ? book?.volumeInfo?.averageRating + '/5'
                : 'Не указан'}
            </p>
          </div>
        </div>
        <div>
          <strong>Описание: </strong>
          {description}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
