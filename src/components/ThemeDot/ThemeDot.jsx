import { useLayoutEffect, useRef } from 'react';
import styles from './ThemeDot.module.css';

/** Size of the dot and the gap above the stem, as a share of the font size. */
const DOT_SIZE = 0.2;
const DOT_GAP = 0.07;

/**
 * A dotless "ı" whose dot is a button that switches light/dark mode.
 * The dot is placed with canvas text metrics, so it sits exactly
 * above the stem in any font and size.
 */
export default function ThemeDot({ theme, onToggle }) {
  const letterRef = useRef(null);
  const dotRef = useRef(null);
  const isDark = theme === 'dark';

  useLayoutEffect(() => {
    const placeDot = () => {
      const letter = letterRef.current;
      const dot = dotRef.current;
      if (!letter || !dot) return;

      const style = getComputedStyle(letter);
      const fontSize = parseFloat(style.fontSize);
      const context = document.createElement('canvas').getContext('2d');
      context.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
      const metrics = context.measureText('ı');
      if (!metrics.actualBoundingBoxAscent) return;

      const boxHeight = letter.getBoundingClientRect().height;
      const baseline =
        (boxHeight + metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2;
      const stemTop = baseline - metrics.actualBoundingBoxAscent;
      const top = stemTop - fontSize * (DOT_GAP + DOT_SIZE);
      dot.style.setProperty('--dot-top', `${top}px`);
    };

    placeDot();
    document.fonts?.ready.then(placeDot);
    window.addEventListener('resize', placeDot);
    return () => window.removeEventListener('resize', placeDot);
  }, []);

  return (
    <span ref={letterRef} className={styles.letter}>
      ı
      <button
        ref={dotRef}
        type="button"
        className={styles.dot}
        onClick={onToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title="Switch the lights"
      />
    </span>
  );
}
