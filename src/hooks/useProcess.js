import { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext.js';

export function useProcess() {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error('useProcess must be used inside ProcessContext.Provider');
  }
  return context;
}
