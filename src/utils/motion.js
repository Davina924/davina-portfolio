/** True when the visitor asked their device to reduce motion. */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** True on devices with a mouse or trackpad (hover is reliable). */
export function hasFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
