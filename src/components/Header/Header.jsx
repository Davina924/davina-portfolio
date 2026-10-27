import styles from './Header.module.css';

export default function Header({ name, currentStepLabel }) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <a className={styles.logo} href="#start" aria-label={`${name}, back to top`}>
          <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
            <text x="2" y="17" className={styles.letter}>
              D
            </text>
            <text x="25" y="37" className={styles.letter}>
              A
            </text>
            <path className={styles.link} d="M14 15 L26 25" />
          </svg>
        </a>
        <p className={styles.step} aria-live="polite">
          step:{' '}
          <b key={currentStepLabel} className={styles.stepName}>
            {currentStepLabel}
          </b>
        </p>
      </nav>
    </header>
  );
}
