import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { addFavorite, removeFavorite, getFavorites } from '../store/favoritesStore';

const useFavorite = (book) => {
  const { id } = book;
  const [liked, setLiked] = useState(false);
  const firstRender = useRef(true);
  const actionRef = useRef(null);

  useEffect(() => {
    const alreadyLiked = getFavorites().some((item) => item.id === id);
    setLiked(alreadyLiked);
  }, [id]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (actionRef.current === 'add') {
      toast.success('Книга добавлена в избранное');
    } else if (actionRef.current === 'remove') {
      toast.info('Книга удалена из избранного');
    }

    actionRef.current = null;
  }, [liked]);

  const toggleFavorite = (e) => {
    e?.stopPropagation?.();

    const newLiked = !liked;
    setLiked(newLiked);

    if (newLiked) {
      addFavorite(book);
      actionRef.current = 'add';
    } else {
      removeFavorite(book.id);
      actionRef.current = 'remove';
    }
  };

  return { liked, toggleFavorite };
};

export default useFavorite;
