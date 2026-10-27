/**
 * Joins class names and skips falsy values.
 * classNames('a', isOn && 'b') -> 'a b' or 'a'
 */
export function classNames(...names) {
  return names.filter(Boolean).join(' ');
}
