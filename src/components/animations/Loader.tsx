"use client";
/**
 * Loader — Elegant entrance screen.
 * Counts to 100% then fades out, firing startAnimations() on the page.
 */
import { useEffect } from "react";
import { gsap } from "gsap";

export function Loader() {
  useEffect(() => {
    const fill   = document.getElementById("loader-fill") as HTMLElement;
    const pctEl  = document.getElementById("loader-pct")  as HTMLElement;
    const loader = document.getElementById("loader")      as HTMLElement;

    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 12 + 4, 95);
      fill.style.width    = p + "%";
      pctEl.textContent   = Math.floor(p) + "%";
    }, 80);

    const onLoad = () => {
      clearInterval(iv);
      fill.style.width  = "100%";
      pctEl.textContent = "100%";
      setTimeout(() => {
        gsap.to(loader, {
          opacity: 0, duration: .6, ease: "power2.inOut",
          onComplete: () => {
            loader.style.display = "none";
            // Fire the global startAnimations function defined in HeroSection
            if (typeof (window as Window & { startAnimations?: () => void }).startAnimations === "function") {
              (window as Window & { startAnimations?: () => void }).startAnimations!();
            }
          },
        });
      }, 400);
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => clearInterval(iv);
  }, []);

  return (
    <div id="loader" aria-hidden="true">
      <p className="loader-name">Mehedi Hasan Mahfuz</p>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" id="loader-fill" />
      </div>
      <p className="loader-pct" id="loader-pct">0%</p>
    </div>
  );
}
