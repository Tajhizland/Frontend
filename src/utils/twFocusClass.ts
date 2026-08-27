export default function twFocusClass(hasRing = false) {
  if (!hasRing) {
    return "focus:outline-hidden";
  }
  return "focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0";
}
