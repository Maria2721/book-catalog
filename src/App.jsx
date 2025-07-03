import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import BookPage from './pages/BookPage/BookPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <header>Header</header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:bookId" element={<BookPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </BrowserRouter>
  );
};

export default App;
