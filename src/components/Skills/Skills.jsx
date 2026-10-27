import { classNames } from '../../utils/classNames.js';
import styles from './Skills.module.css';

/** Tool groups. Tools used by the hovered step are highlighted. */
export default function Skills({ groups, highlightedStep }) {
  return (
    <div className={styles.skills}>
      <p className={styles.hint}>Hover a task above to see which tools it used.</p>
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <ul className={styles.list}>
            {group.items.map((skill) => (
              <li
                key={skill.name}
                className={classNames(
                  styles.skill,
                  skill.usedIn.includes(highlightedStep) && styles.used,
                )}
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
