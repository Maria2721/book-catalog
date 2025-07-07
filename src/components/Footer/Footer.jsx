import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © 2025 by{' '}
        <a href="https://github.com/Maria2721" target="_blank">
          Maria2721
        </a>
      </p>
    </footer>
  );
};

export default Footer;
