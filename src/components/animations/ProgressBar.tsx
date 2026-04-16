"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end:   "bottom bottom",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress, transformOrigin: "left" });
      },
    });
  }, []);

  return <div id="progress-bar" aria-hidden="true" />;
}
