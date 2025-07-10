let cachedFavorites = null;
let listeners = [];

export const getFavorites = () => {
  if (cachedFavorites === null) {
    try {
      cachedFavorites = JSON.parse(localStorage.getItem('favoritesBooks')) || [];
    } catch {
      cachedFavorites = [];
    }
  }
  return cachedFavorites;
};

export const setFavorites = (books) => {
  localStorage.setItem('favoritesBooks', JSON.stringify(books));
  cachedFavorites = books;
  notify();
};

export const addFavorite = (book) => {
  const books = getFavorites();
  const exists = books.some((b) => b.id === book.id);
  if (exists) return;

  let bookItem = {
    id: book.id,
    volumeInfo: {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      imageLinks: book.volumeInfo.imageLinks,
    },
  };

  books.push(bookItem);
  setFavorites(books);
};

export const removeFavorite = (bookId) => {
  const filtered = getFavorites().filter((b) => b.id !== bookId);
  setFavorites(filtered);
};

export const subscribe = (callback) => {
  listeners.push(callback);

  const onStorage = (e) => {
    if (e.key === 'favoritesBooks') {
      cachedFavorites = null;
      callback();
    }
  };

  window.addEventListener('storage', onStorage);

  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener('storage', onStorage);
  };
};

export const notify = () => {
  for (const listener of listeners) {
    listener();
  }
};
