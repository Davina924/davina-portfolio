import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button.jsx';
import styles from './Contact.module.css';

const COPIED_RESET_MS = 1800;

export default function Contact({ email, linkedinUrl }) {
  const emailRef = useRef(null);
  const [copyLabel, setCopyLabel] = useState('Copy email');

  useEffect(() => {
    if (copyLabel === 'Copy email') return undefined;
    const timer = setTimeout(() => setCopyLabel('Copy email'), COPIED_RESET_MS);
    return () => clearTimeout(timer);
  }, [copyLabel]);

  const selectEmailText = () => {
    const range = document.createRange();
    range.selectNodeContents(emailRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    setCopyLabel('Selected, press Ctrl+C');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyLabel('Copied');
    } catch {
      selectEmailText();
    }
  };

  return (
    <div className={styles.contact}>
      <h2 className={styles.title}>The next step could be your team.</h2>
      <p className={styles.text}>
        I&apos;m open to remote internships in ERP and process automation. Email me or send a
        message on LinkedIn.
      </p>
      <div className={styles.actions}>
        <span ref={emailRef} className={styles.email}>
          {email}
        </span>
        <Button variant="primary" tone="inverse" onClick={handleCopy}>
          {copyLabel}
        </Button>
        <Button href={linkedinUrl} tone="inverse" external>
          Message on LinkedIn
        </Button>
      </div>
    </div>
  );
}
