import { useContext } from 'react';
import { CertificatePreviewContext } from '../context/CertificatePreviewContext.js';

export function useCertificatePreview() {
  const context = useContext(CertificatePreviewContext);
  if (!context) {
    throw new Error('useCertificatePreview must be used inside CertificatePreviewProvider');
  }
  return context;
}
