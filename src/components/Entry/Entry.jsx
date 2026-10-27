import { useCertificatePreview } from '../../hooks/useCertificatePreview.js';
import { classNames } from '../../utils/classNames.js';
import Stat from '../Stat/Stat.jsx';
import Tags from './Tags.jsx';
import styles from './Entry.module.css';

/**
 * One experience, project, or education item.
 * If `certificate` is given, hovering shows its image and clicking opens it.
 */
export default function Entry({
  title,
  period,
  organization,
  stat,
  description,
  tags,
  certificate,
  playStat = false,
  children,
}) {
  const { getTriggerProps, openCertificate } = useCertificatePreview();
  const triggerProps = certificate ? getTriggerProps(certificate) : {};

  return (
    <article
      className={classNames(styles.entry, certificate && styles.hasCertificate)}
      {...triggerProps}
    >
      <div className={styles.top}>
        <h3 className={styles.title}>{title}</h3>
        {period && <span className={styles.period}>{period}</span>}
      </div>
      {organization && <span className={styles.organization}>{organization}</span>}
      {stat && <Stat {...stat} play={playStat} />}
      {description && <p className={styles.description}>{description}</p>}
      {tags && <Tags items={tags} />}
      {children}
      {certificate && (
        <button
          type="button"
          className={styles.certificateButton}
          onClick={(event) => {
            event.stopPropagation();
            openCertificate(certificate);
          }}
        >
          View certificate
        </button>
      )}
    </article>
  );
}
