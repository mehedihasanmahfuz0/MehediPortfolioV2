"use client";
/**
 * ExperienceSection
 *
 * ANIMATIONS:
 *  - Sidebar line draws downward (scaleY 0→1) — single ScrollTrigger
 *  - Each entry slides in from translateX(32px) with stagger
 *  - ease: power3.out — smooth deceleration, no elastic bounce
 */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EXPERIENCES } from "@/lib/data";
import styles from "./ExperienceSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const entryRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(entryRefs.current, { opacity: 0, x: 32 });

    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 72%", once: true,
      onEnter() {
        gsap.to([".exp-ey", ".exp-ttl"], {
          opacity: 1, y: 0, duration: .85, stagger: .1, ease: "power3.out",
        });
        gsap.to(lineRef.current, { scaleY: 1, duration: 1.6, ease: "power3.out", delay: .2 });
        gsap.to(entryRefs.current, {
          opacity: 1, x: 0, duration: 1.0, ease: "power3.out",
          stagger: .18, delay: .35,
        });
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} className={styles.section} aria-label="Work experience">
      <div className={styles.wrap}>
        <div className={`${styles.eyebrow} exp-ey anim-hidden`}>Experience</div>
        <h2 className={`${styles.title} exp-ttl anim-hidden`}>Where I&apos;ve <em>worked.</em></h2>

        <div className={styles.layout}>
          {/* Sidebar */}
          <div className={styles.sidebar} aria-hidden="true">
            <div className={styles.sidebarInner}>
              <span className={styles.sidebarLabel}>Timeline</span>
              <div ref={lineRef} className={styles.sidebarLine} />
            </div>
          </div>

          {/* Entries */}
          <div className={styles.entries}>
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.company + exp.period}
                ref={(el) => { entryRefs.current[i] = el; }}
                className={styles.entry}
              >
                <div className={styles.entryHeader}>
                  <div>
                    <div className={styles.role}>{exp.role}</div>
                    <div className={styles.company}>{exp.company}</div>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <ul className={styles.bullets} aria-label="Responsibilities">
                  {exp.bullets.map((b) => (
                    <li key={b} className={styles.bullet}>{b}</li>
                  ))}
                </ul>
                <div className={styles.tags} aria-label="Technologies">
                  {exp.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
