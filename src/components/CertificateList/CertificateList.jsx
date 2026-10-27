import { useCertificatePreview } from '../../hooks/useCertificatePreview.js';
import { classNames } from '../../utils/classNames.js';
import CheckIcon from '../Icons/CheckIcon.jsx';
import Tags from '../Entry/Tags.jsx';
import styles from './CertificateList.module.css';

/** Certifications with checkboxes that tick one by one when `checked` turns true. */
export default function CertificateList({ certificates, checked }) {
  const { getTriggerProps, openCertificate } = useCertificatePreview();

  return (
    <ul className={classNames(styles.list, checked && styles.checked)}>
      {certificates.map((certificate) => {
        const meta = [certificate.issuer, certificate.period].filter(Boolean).join(' · ');

        return (
          <li key={certificate.id} className={styles.item} {...getTriggerProps(certificate)}>
            <span className={styles.box} aria-hidden="true">
              <CheckIcon size={12} className={styles.check} />
            </span>
            <b className={styles.title}>{certificate.title}</b>
            {meta && <span className={styles.meta}>{meta}</span>}
            {certificate.tags && <Tags items={certificate.tags} />}
            <button
              type="button"
              className={styles.button}
              onClick={(event) => {
                event.stopPropagation();
                openCertificate(certificate);
              }}
            >
              View certificate
            </button>
          </li>
        );
      })}
    </ul>
  );
}
