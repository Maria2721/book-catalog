const useFavorites = () => {
  const toggleFavorite = (book, liked) => {
    let books = JSON.parse(localStorage.getItem('favoritesBooks')) || [];

    let bookItem = {
      id: book.id,
      volumeInfo: {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        imageLinks: book.volumeInfo.imageLinks,
      },
    };

    if (liked) {
      const alreadyExist = books.some((item) => item.id === book.id);
      if (!alreadyExist) {
        books.push(bookItem);
        localStorage.setItem('favoritesBooks', JSON.stringify(books));
      }
    } else {
      let filteredBooks = books.filter((item) => item.id !== book.id);
      localStorage.setItem('favoritesBooks', JSON.stringify(filteredBooks));
    }
  };

  return { toggleFavorite };
};

export default useFavorites;
