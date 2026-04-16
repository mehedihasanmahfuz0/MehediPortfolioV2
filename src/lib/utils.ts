/* Utility helpers */

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Check if device supports hover (non-touch) */
export function isHoverDevice(): boolean {
  return window.matchMedia("(hover: hover)").matches;
}

/** Check if viewport is mobile */
export function isMobileViewport(): boolean {
  return window.innerWidth < 768;
}

/** Proficiency level label map */
export const LEVEL_LABEL: Record<string, string> = {
  expert:     "Expert",
  proficient: "Proficient",
  familiar:   "Familiar",
  learning:   "Learning",
};
