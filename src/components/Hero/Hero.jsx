import Button from '../Button/Button.jsx';
import ThemeDot from '../ThemeDot/ThemeDot.jsx';
import styles from './Hero.module.css';

const LEGEND_ITEMS = [
  { shape: 'start', label: 'start' },
  { shape: 'task', label: 'task' },
  { shape: 'data', label: 'data' },
  { shape: 'gateway', label: 'decision' },
  { shape: 'end', label: 'end' },
  { shape: 'token', label: 'you are here' },
];

/** Splits "Davina" into "Dav" + "ı" + "na" so the dot of the i can be the theme switch. */
function splitAtI(word) {
  const index = word.toLowerCase().indexOf('i');
  if (index === -1) return null;
  return { before: word.slice(0, index), after: word.slice(index + 1) };
}

export default function Hero({ profile, theme, onToggleTheme }) {
  const firstName = splitAtI(profile.firstName);

  return (
    <>
      <h1 className={styles.name}>
        <span className={styles.line}>
          {firstName ? (
            <>
              {firstName.before}
              <ThemeDot theme={theme} onToggle={onToggleTheme} />
              {firstName.after}
            </>
          ) : (
            profile.firstName
          )}
        </span>
        <span className={`${styles.line} ${styles.lastName}`}>{profile.lastName}</span>
      </h1>

      <p className={styles.hint}>
        <span className={styles.hintDot} aria-hidden="true" />
        tap the dot on the i to switch the lights
      </p>

      <p className={styles.role}>{profile.role}</p>
      <p className={styles.intro}>
        {profile.intro} <strong>{profile.availability}</strong>
      </p>

      <div className={styles.actions}>
        <Button href="#next" variant="primary">
          Get in touch
        </Button>
        <Button href={profile.linkedinUrl} external>
          LinkedIn
        </Button>
      </div>

      <div className={styles.legend} aria-label="How to read this page">
        <span>This page is drawn as a process model. Scroll to run it:</span>
        {LEGEND_ITEMS.map((item) => (
          <span key={item.shape} className={styles.legendItem}>
            <i className={`${styles.shape} ${styles[item.shape]}`} aria-hidden="true" />
            {item.label}
          </span>
        ))}
      </div>
    </>
  );
}
