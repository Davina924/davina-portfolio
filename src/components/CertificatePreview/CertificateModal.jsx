import { useEffect, useRef } from 'react';
import styles from './CertificatePreview.module.css';

/** Large certificate view in a native <dialog> (Esc and backdrop click close it). */
export default function CertificateModal({ certificate, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (certificate && !dialog.open) dialog.showModal();
    if (!certificate && dialog.open) dialog.close();
  }, [certificate]);

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-label={certificate ? `Certificate: ${certificate.title}` : 'Certificate'}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {certificate && (
        <>
          <div className={styles.sheet}>
            <img src={certificate.image} alt={`Certificate: ${certificate.title}`} />
          </div>
          <div className={styles.modalBar}>
            <span>{certificate.title}</span>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
