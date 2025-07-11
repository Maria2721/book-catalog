import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../store/favoritesStore';

const useFavorite = (book) => {
  const { id } = book;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const alreadyLiked = getFavorites().some((item) => item.id === id);
    setLiked(alreadyLiked);
  }, [id]);

  const toggleFavorite = (e) => {
    e?.stopPropagation?.();

    const newLiked = !liked;
    setLiked(newLiked);

    if (newLiked) {
      addFavorite(book);
    } else {
      removeFavorite(book.id);
    }
  };

  return { liked, toggleFavorite };
};

export default useFavorite;
