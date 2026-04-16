"use client";
/**
 * AboutSection
 *
 * ANIMATIONS:
 *  - Photo panel: clip-path curtain sweeps right (inset 0 100% → 0 0%)
 *  - Bio lines: each .bioInner translateY(100%) → 0 — "venetian blind"
 *  - Fact cards: scale(0.94) + opacity → 1 with elastic stagger
 *  - Numbers count up as cards enter
 */
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PERSON, ABOUT_PARAGRAPHS } from "@/lib/data";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FACTS = [
  { count: 1,    suffix: "+", label: "Year experience"     },
  { count: 3,    suffix: "",  label: "Projects shipped"     },
  { count: 15,   suffix: "+", label: "Technologies"         },
  { count: null, suffix: "",  label: "Open to opportunities", display: "Open" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const factRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 72%",
      once: true,
      onEnter() {
        // Eyebrow + heading
        gsap.to([".about-eyebrow", ".about-heading"], {
          opacity: 1, y: 0, duration: .8, stagger: .1, ease: "power3.out",
        });

        // Photo curtain sweep
        gsap.to(photoRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.3, ease: "power4.inOut", delay: .2,
        });

        // Bio lines venetian blind
        gsap.to(".bio-inner", {
          y: "0%", duration: .85, ease: "power3.out",
          stagger: .07, delay: .3,
        });

        // Fact cards
        gsap.to(factRefs.current, {
          opacity: 1, y: 0, scale: 1,
          duration: .65, ease: "back.out(1.6)",
          stagger: .09, delay: .55,
        });

        // Count up
        factRefs.current.forEach((card, i) => {
          const fact = FACTS[i];
          if (!card || fact.count === null) return;
          const numEl = card.querySelector<HTMLSpanElement>(".fact-num");
          if (!numEl) return;
          const obj = { n: 0 };
          gsap.to(obj, {
            n: fact.count, duration: 1.2, delay: .65, ease: "power2.out",
            onUpdate() {
              numEl.textContent = Math.floor(obj.n) + (obj.n >= fact.count! && fact.suffix ? fact.suffix : "");
            },
          });
        });
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className={styles.section} aria-label="About me">
      <div className={styles.wrap}>
        <div className={styles.grid}>

          {/* Photo */}
          <div ref={photoRef} className={styles.photo} aria-label="Mehedi Hasan Mahfuz photo">
            <Image
              src="/images/Profile.webp"
              alt="Mehedi Hasan Mahfuz"
              fill
              className={styles.photoImg}
              priority
            />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <div className={`${styles.eyebrow} about-eyebrow anim-hidden`}>About Me</div>
            <h2 className={`${styles.heading} about-heading anim-hidden`}>
              Building for the<br /><em>web&apos;s future.</em>
            </h2>

            <div className={styles.bioStack}>
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <div key={i} className={styles.bioLine}>
                  <p
                    className={`${styles.bioInner} bio-inner`}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                </div>
              ))}
            </div>

            <div className={styles.facts}>
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  ref={(el) => { factRefs.current[i] = el; }}
                  className={styles.factCard}
                  style={{ opacity: 0, transform: "scale(.94) translateY(14px)" }}
                >
                  <span className={`${styles.factNum} fact-num`}>
                    {f.display ?? "0"}
                  </span>
                  <span className={styles.factLabel}>{f.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.avail}>
              <span className={styles.availDot} aria-hidden="true" />
              <span className={styles.availText}>
                Available for select work · {PERSON.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
