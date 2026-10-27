import styles from './Footer.module.css';

export default function Footer({ name }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>
        © {year} {name}
      </span>
      <span>drawn as a process, like most things I make</span>
    </footer>
  );
}
