import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Логотип" className={styles.logoImg} />
        <p className={styles.logoText}>
          Найди свою <br />
          книгу
        </p>
      </div>
      <nav className={styles.navigation}>
        <div class={styles.linkWrapper}>
          <Link to="/">Главная</Link>
        </div>
        <div class={styles.linkWrapper}>
          <Link to="/favorites">Избранное</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
