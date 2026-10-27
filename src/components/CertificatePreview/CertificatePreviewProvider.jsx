import { useCallback, useMemo, useRef, useState } from 'react';
import { CertificatePreviewContext } from '../../context/CertificatePreviewContext.js';
import { classNames } from '../../utils/classNames.js';
import { hasFinePointer } from '../../utils/motion.js';
import CertificateModal from './CertificateModal.jsx';
import styles from './CertificatePreview.module.css';

const PEEK_WIDTH = 300;
const PEEK_OFFSET = 24;
const EDGE_MARGIN = 12;

/**
 * Hover a certificate trigger to see a small preview next to the cursor.
 * Click (or tap "View certificate") to open it large in a dialog.
 * On touch screens there is no hover, so only the dialog is used.
 */
export default function CertificatePreviewProvider({ children }) {
  const peekRef = useRef(null);
  const [peekCertificate, setPeekCertificate] = useState(null);
  const [isPeekVisible, setIsPeekVisible] = useState(false);
  const [modalCertificate, setModalCertificate] = useState(null);

  const movePeek = useCallback((event) => {
    const peek = peekRef.current;
    if (!peek) return;
    const height = peek.offsetHeight || 220;
    let x = event.clientX + PEEK_OFFSET;
    if (x + PEEK_WIDTH > window.innerWidth - EDGE_MARGIN) {
      x = event.clientX - PEEK_WIDTH - PEEK_OFFSET;
    }
    const y = Math.max(
      EDGE_MARGIN,
      Math.min(window.innerHeight - height - EDGE_MARGIN, event.clientY - height / 2),
    );
    peek.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const openCertificate = useCallback((certificate) => {
    setIsPeekVisible(false);
    setModalCertificate(certificate);
  }, []);

  const closeCertificate = useCallback(() => setModalCertificate(null), []);

  const getTriggerProps = useCallback(
    (certificate) => {
      if (!hasFinePointer()) return {};
      return {
        onMouseEnter: (event) => {
          setPeekCertificate(certificate);
          setIsPeekVisible(true);
          movePeek(event);
        },
        onMouseMove: movePeek,
        onMouseLeave: () => setIsPeekVisible(false),
        onClick: (event) => {
          if (event.target.closest('a')) return;
          openCertificate(certificate);
        },
      };
    },
    [movePeek, openCertificate],
  );

  const contextValue = useMemo(
    () => ({ getTriggerProps, openCertificate }),
    [getTriggerProps, openCertificate],
  );

  return (
    <CertificatePreviewContext.Provider value={contextValue}>
      {children}

      <div
        ref={peekRef}
        className={classNames(styles.peek, isPeekVisible && styles.visible)}
        aria-hidden="true"
      >
        {peekCertificate && (
          <div className={styles.sheet}>
            <img src={peekCertificate.image} alt="" />
          </div>
        )}
      </div>

      <CertificateModal certificate={modalCertificate} onClose={closeCertificate} />
    </CertificatePreviewContext.Provider>
  );
}
