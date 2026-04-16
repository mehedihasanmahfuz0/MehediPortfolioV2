"use client";
/**
 * Cursor — Magnetic custom cursor (desktop / hover-capable devices only).
 * Uses gsap.quickTo for performance — reusable setter, zero tween overhead.
 */
import { useEffect } from "react";
import { gsap } from "gsap";
import { isHoverDevice } from "@/lib/utils";

export function Cursor() {
  useEffect(() => {
    if (!isHoverDevice()) return;

    const dot  = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    dot.style.display  = "block";
    ring.style.display = "block";

    // quickTo: single reusable setter — far more performant than gsap.to in mousemove
    const xDot  = gsap.quickTo(dot,  "x", { duration: .12, ease: "power3.out" });
    const yDot  = gsap.quickTo(dot,  "y", { duration: .12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: .55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: .55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);  yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    // Magnetic pull on .mag-btn elements
    const setupMagnetic = () => {
      document.querySelectorAll<HTMLElement>(".mag-btn").forEach((btn) => {
        const onEnter = () => document.body.classList.add("cursor-hover");
        const onLeave = () => {
          document.body.classList.remove("cursor-hover");
          gsap.to(btn, { x: 0, y: 0, duration: .45, ease: "elastic.out(1,.5)" });
        };
        const onMMove = (e: MouseEvent) => {
          const r  = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width  * .5);
          const dy = e.clientY - (r.top  + r.height * .5);
          gsap.to(btn, { x: dx * .18, y: dy * .18, duration: .35, ease: "power3.out" });
        };
        btn.addEventListener("mouseenter",  onEnter);
        btn.addEventListener("mouseleave",  onLeave);
        btn.addEventListener("mousemove",   onMMove as EventListener);
      });
    };

    // Run once after mount (DOM ready)
    setupMagnetic();

    // I-beam on text
    const addTextListeners = () => {
      document.querySelectorAll("p, h1, h2, h3, h4, li").forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-text"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-text"));
      });
    };
    addTextListeners();

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div id="cursor"      aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  );
}
