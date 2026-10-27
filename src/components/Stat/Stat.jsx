import { useCountUp } from '../../hooks/useCountUp.js';
import styles from './Stat.module.css';

/** A big number that counts up when its step is reached for the first time. */
export default function Stat({ value, decimals = 0, prefix = '', suffix = '', label, play }) {
  const displayValue = useCountUp(value, { play, decimals });

  return (
    <div className={styles.stat}>
      <b className={styles.value}>
        {prefix}
        {displayValue}
        {suffix}
      </b>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
