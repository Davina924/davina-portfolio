import { classNames } from '../../utils/classNames.js';
import styles from './Button.module.css';

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * variant: 'primary' | 'outline'
 * tone: 'default' | 'inverse' (inverse is for dark cards like Contact)
 */
export default function Button({
  href,
  variant = 'outline',
  tone = 'default',
  external = false,
  className,
  children,
  ...rest
}) {
  const buttonClassName = classNames(
    styles.button,
    styles[variant],
    tone === 'inverse' && styles.inverse,
    className,
  );

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a className={buttonClassName} href={href} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClassName} type="button" {...rest}>
      {children}
    </button>
  );
}
