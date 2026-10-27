import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames.js';
import styles from './ProcessRail.module.css';

/**
 * The vertical line, its blue fill, the token, and the arrowheads between steps.
 * The fill and token are positioned by useProcessProgress through refs.
 */
const ProcessRail = forwardRef(function ProcessRail({ arrows, reachedSteps, tokenRef }, fillRef) {
  return (
    <div className={styles.rail} aria-hidden="true">
      <span className={styles.track} />
      <span ref={fillRef} className={styles.fill} />
      <span ref={tokenRef} className={styles.token} />
      {arrows.map((arrow) => (
        <svg
          key={arrow.toStepId}
          className={classNames(styles.arrow, reachedSteps.has(arrow.toStepId) && styles.done)}
          style={{ top: arrow.y - 4 }}
          viewBox="0 0 12 8"
        >
          <path d="M1 1 L6 6 L11 1" />
        </svg>
      ))}
    </div>
  );
});

export default ProcessRail;
