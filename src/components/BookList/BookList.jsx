import BookItem from '../BookItem/BookItem';

const BookList = ({ books }) => {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
