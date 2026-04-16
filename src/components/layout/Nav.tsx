"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "#about",      label: "About"      },
  { href: "#skills",     label: "Skills"     },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#resume",     label: "Resume"     },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Nav slides down on load — triggered after loader exits
    gsap.from("#main-nav", { y: -80, opacity: 0, duration: .8, ease: "power3.out", delay: .1 });
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as Window & { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -64, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const spans = document.querySelectorAll<HTMLElement>("#burger span");
    if (menuOpen) {
      gsap.to(spans[0], { y: 6.5,  rotate: 45,  duration: .3, ease: "power2.inOut" });
      gsap.to(spans[1], { opacity: 0,            duration: .3 });
      gsap.to(spans[2], { y: -6.5, rotate: -45, duration: .3, ease: "power2.inOut" });
      gsap.to(".mob-link", { opacity: 1, y: 0, stagger: .07, duration: .4, ease: "power3.out", delay: .1 });
    } else {
      gsap.to(spans,    { y: 0, rotate: 0, opacity: 1, duration: .3, ease: "power2.inOut" });
      gsap.to(".mob-link", { opacity: 0, y: 20, duration: .2 });
    }
  }, [menuOpen]);

  return (
    <>
      <nav id="main-nav" className={styles.nav} aria-label="Primary navigation">
        <a href="#hero" className={styles.logo} onClick={(e) => scrollTo(e, "#hero")}>
          M.<b>Mahfuz</b>
        </a>
        <ul className={styles.links} role="list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={styles.link} onClick={(e) => scrollTo(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={`${styles.hire} mag-btn`} onClick={(e) => scrollTo(e, "#contact")}>
              Hire Me
            </a>
          </li>
        </ul>
        <button
          id="burger"
          className={styles.burger}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <nav
        className={`${styles.mobMenu} ${menuOpen ? styles.open : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className={`mob-link ${styles.mobLink}`} onClick={(e) => scrollTo(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className={`mob-link ${styles.mobLink}`} onClick={(e) => scrollTo(e, "#contact")}>
          Hire Me
        </a>
      </nav>
    </>
  );
}
