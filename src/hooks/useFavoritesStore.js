import { useSyncExternalStore } from 'react';
import { getFavorites, subscribe } from '../store/favoritesStore';

const useFavoritesStore = () => {
  return useSyncExternalStore(subscribe, getFavorites);
};

export default useFavoritesStore;
