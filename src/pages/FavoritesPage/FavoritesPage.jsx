import useFavoritesStore from '../../hooks/useFavoritesStore';
import BookList from '../../components/BookList/BookList';

const FavoritesPage = () => {
  const books = useFavoritesStore();

  return (
    <div>
      <h1>Каталог избранных книг</h1>
      {books.length ? <BookList books={books} /> : <p>У вас нет избранных книг</p>}
    </div>
  );
};

export default FavoritesPage;
