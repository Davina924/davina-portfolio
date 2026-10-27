import styles from './Entry.module.css';

export default function Tags({ items }) {
  return (
    <ul className={styles.tags}>
      {items.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
