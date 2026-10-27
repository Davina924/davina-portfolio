import { useEffect, useRef } from 'react';
import { useProcess } from '../../hooks/useProcess.js';
import { classNames } from '../../utils/classNames.js';
import CheckIcon from '../Icons/CheckIcon.jsx';
import styles from './Step.module.css';

/**
 * One step of the process.
 * nodeType: 'start' | 'task' | 'data' | 'gateway' | 'end' (BPMN shapes)
 * layout: 'single' | 'two' columns for the content area
 * variant: 'hero' for the first step, which has its own spacing
 * kickerNote: optional muted text next to the kicker
 */
export default function Step({
  id,
  nodeType,
  kicker,
  kickerNote,
  title,
  intro,
  layout = 'single',
  variant,
  bare = false,
  children,
}) {
  const nodeRef = useRef(null);
  const { registerNode, reachedSteps, playedSteps, setHoveredStep } = useProcess();
  const isReached = reachedSteps.has(id);
  const isPlayed = playedSteps.has(id);
  const isTask = nodeType === 'task';

  useEffect(() => registerNode(id, nodeRef.current), [id, registerNode]);

  const hoverProps = isTask
    ? {
        onMouseEnter: () => setHoveredStep(id),
        onMouseLeave: () => setHoveredStep(null),
        onFocus: () => setHoveredStep(id),
        onBlur: () => setHoveredStep(null),
      }
    : {};

  return (
    <section
      id={id}
      className={classNames(
        styles.step,
        variant === 'hero' && styles.hero,
        isReached && styles.reached,
        isPlayed && styles.played,
      )}
      {...hoverProps}
    >
      <span ref={nodeRef} className={classNames(styles.node, styles[nodeType])} aria-hidden="true">
        {isTask && <CheckIcon className={styles.check} />}
      </span>

      {kicker && (
        <div className={styles.kicker}>
          <span className="label">{kicker}</span>
          {kickerNote && <span className="label">{kickerNote}</span>}
          {isTask && <span className={styles.state}>done</span>}
        </div>
      )}
      {title && <h2 className={styles.title}>{title}</h2>}
      {intro && <p className={styles.intro}>{intro}</p>}

      {bare ? (
        children
      ) : (
        <div className={classNames(styles.content, layout === 'two' && styles.twoColumns)}>
          {children}
        </div>
      )}
    </section>
  );
}
