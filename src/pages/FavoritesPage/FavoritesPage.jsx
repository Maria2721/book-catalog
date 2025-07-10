import useFavoritesStore from '../../hooks/useFavoritesStore';
import BookList from '../../components/BookList/BookList';

const FavoritesPage = () => {
  const books = useFavoritesStore();

  return (
    <div>
      <h1>Каталог избранных книг</h1>
      <BookList books={books} />
    </div>
  );
};

export default FavoritesPage;
