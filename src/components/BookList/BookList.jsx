import BookItem from '../BookItem/BookItem';
import styles from './BookList.module.scss';

const BookList = ({ books }) => {
  return (
    <div className={styles.container}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
