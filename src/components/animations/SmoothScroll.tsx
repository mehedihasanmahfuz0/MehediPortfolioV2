"use client";
/**
 * SmoothScroll — Lenis-powered smooth scroll
 * Integrates Lenis with GSAP ScrollTrigger for perfect sync.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Sync Lenis RAF with GSAP ticker — required for ScrollTrigger accuracy
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Expose lenis on window so Nav anchor clicks can use lenis.scrollTo()
    (window as unknown as Window & { lenis?: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
