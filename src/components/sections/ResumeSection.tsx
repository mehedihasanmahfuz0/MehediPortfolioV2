"use client";
/**
 * ResumeSection
 * ANIMATIONS: Card scales from 0.96→1 with elastic ease. Highlights stagger from X(24px).
 */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PERSON } from "@/lib/data";
import styles from "./ResumeSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HIGHLIGHTS = [
  { chip: "FE", title: "Frontend Specialist",       sub: "React, Next.js, TypeScript, Tailwind — production-ready component architecture." },
  { chip: "AI", title: "AI-Augmented Workflow",     sub: "Uses AI tooling deliberately to accelerate delivery without compromising discipline." },
  { chip: "MK", title: "Marketing + Engineering",   sub: "Understands both the product and the channel it needs to reach." },
  { chip: "GR", title: "Fast, Honest Learner",      sub: "1+ year, 3 shipped projects, 15+ technologies — driven by curiosity." },
];

export function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const hlRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(cardRef.current,  { scale: .96 });
    gsap.set(hlRefs.current,   { opacity: 0, x: 24 });

    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 75%", once: true,
      onEnter() {
        gsap.to([".re-ey",".re-ttl"], { opacity:1, y:0, duration:.85, stagger:.1, ease:"power3.out" });
        gsap.to(cardRef.current,  { opacity:1, scale:1, duration:.85, ease:"back.out(1.4)", delay:.15 });
        gsap.to(hlRefs.current,   { opacity:1, x:0, duration:.65, ease:"power3.out", stagger:.1, delay:.4 });
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="resume" ref={sectionRef} className={styles.section} aria-label="Resume download">
      <div className={styles.wrap}>
        <div className={`${styles.eyebrow} re-ey anim-hidden`}>Resume</div>
        <h2 className={`${styles.title} re-ttl anim-hidden`}>Download my <em>CV.</em></h2>

        <div ref={cardRef} className={styles.card} style={{ opacity: 0 }}>
          {/* Left */}
          <div className={styles.left}>
            <h3 className={styles.name}>{PERSON.name}</h3>
            <p  className={styles.role}>Frontend Developer</p>
            <p  className={styles.desc}>
              My CV covers technical skills, all projects, and background in full detail. Last updated 2025.
            </p>
            {/*
              ── RESUME LINK SLOT ──
              Update resumeUrl in src/lib/data.ts with your PDF URL.
              Recommended: upload to Google Drive → Share → "Anyone with link" → Copy link.
            */}
            <a href={PERSON.resumeUrl} className={`${styles.btnDownload} mag-btn`} download aria-label="Download resume PDF">
              <svg viewBox="0 0 14 14" aria-hidden="true" className={styles.dlIcon}>
                <path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Download PDF</span>
            </a>
          </div>

          {/* Right */}
          <div className={styles.right}>
            <p className={styles.hlLabel}>Quick Highlights</p>
            <div className={styles.hls}>
              {HIGHLIGHTS.map((h, i) => (
                <div key={h.chip} ref={(el) => { hlRefs.current[i] = el; }} className={styles.hl}>
                  <div className={styles.chip}>{h.chip}</div>
                  <div>
                    <div className={styles.hlTitle}>{h.title}</div>
                    <div className={styles.hlSub}>{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
