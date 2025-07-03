import { useParams } from 'react-router-dom';

const BookPage = () => {
  const { bookId } = useParams();

  return (
    <div>
      <h1>Информация о книге</h1>
      <p>ID книги: {bookId}</p>
    </div>
  );
};

export default BookPage;
