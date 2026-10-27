import { classNames } from '../../utils/classNames.js';
import styles from './Gateway.module.css';

/** BPMN exclusive gateway. The "Yes" path draws itself once the step is reached. */
export default function Gateway({ isReached }) {
  return (
    <figure
      className={classNames(styles.gateway, isReached && styles.reached)}
      aria-label="Decision: if a remote internship is available, go to contact. If not yet, keep learning and building."
    >
      <svg viewBox="0 0 520 150" aria-hidden="true">
        <path className={styles.base} d="M58 44 H 470" />
        <path className={styles.yesPath} d="M58 44 H 470" />
        <polygon className={styles.yesArrow} points="470,38 482,44 470,50" />
        <path className={styles.noPath} d="M34 68 V 118 H 470" />
        <polygon className={styles.noArrow} points="470,112 482,118 470,124" />
        <rect
          className={styles.diamond}
          x="18"
          y="28"
          width="32"
          height="32"
          rx="3"
          transform="rotate(45 34 44)"
        />
        <text className={styles.cross} x="29" y="50">
          ×
        </text>
        <text className={styles.text} x="78" y="34">
          Yes, a remote role is open
        </text>
        <text className={styles.caption} x="78" y="62">
          go to the next step: contact
        </text>
        <text className={classNames(styles.text, styles.muted)} x="78" y="108">
          Not yet
        </text>
        <text className={styles.caption} x="78" y="138">
          keep learning and building, then try again
        </text>
      </svg>
    </figure>
  );
}
