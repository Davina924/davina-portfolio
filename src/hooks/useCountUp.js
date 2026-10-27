import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

const DURATION_MS = 900;

/**
 * Counts from 0 to `target` once `play` becomes true.
 * Before that (and with reduced motion) it shows the final value,
 * so the number is always readable.
 */
export function useCountUp(target, { play, decimals = 0 }) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!play || prefersReducedMotion()) {
      return undefined;
    }

    let frameId = 0;
    let startTime = null;

    const tick = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min(1, (now - startTime) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [play, target]);

  return value.toFixed(decimals);
}
