"use client";
/**
 * SkillsSection
 *
 * ANIMATIONS:
 *  - Section header fades up
 *  - Each card rises from translateY(24px) with stagger
 *  - Skill bars: GSAP fromTo scaleX(0 → pct/100) — GPU composited, no layout
 *  - Proficiency badges use a colour-coded system (Expert / Proficient / Familiar / Learning)
 */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SKILL_CATEGORIES, type Proficiency } from "@/lib/data";
import { LEVEL_LABEL } from "@/lib/utils";
import styles from "./SkillsSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LEVEL_COLORS: Record<Proficiency, string> = {
  expert:     styles.expert,
  proficient: styles.proficient,
  familiar:   styles.familiar,
  learning:   styles.learning,
};
const BAR_COLORS: Record<Proficiency, string> = {
  expert:     styles.barExpert,
  proficient: styles.barProficient,
  familiar:   styles.barFamiliar,
  learning:   styles.barLearning,
};

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Header
    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 78%", once: true,
      onEnter() {
        gsap.to([".skills-ey", ".skills-ttl", ".skills-sub", ".skills-legend", ".skills-note"], {
          opacity: 1, y: 0, duration: .8, stagger: .09, ease: "power3.out",
        });
      },
    });

    // Cards + bars
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      ScrollTrigger.create({
        trigger: card, start: "top 86%", once: true,
        onEnter() {
          const delay = i * .12;

          // Card rise
          gsap.to(card, { opacity: 1, y: 0, duration: .75, ease: "power3.out", delay });

          // Bars — scaleX fromTo, stagger within card
          card.querySelectorAll<HTMLElement>("[data-pct]").forEach((bar, j) => {
            const pct = parseInt(bar.dataset.pct ?? "0") / 100;
            gsap.fromTo(bar,
              { scaleX: 0 },
              { scaleX: pct, duration: 1.4, ease: "power3.out", delay: delay + .35 + j * .07 },
            );
          });
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className={styles.section} aria-label="Skills and tech stack">
      <div className={styles.wrap}>
        <div className={`${styles.eyebrow} skills-ey anim-hidden`}>Tech Stack</div>
        <h2 className={`${styles.title} skills-ttl anim-hidden`}>
          What I work <em>with.</em>
        </h2>
        <p className={`${styles.sub} skills-sub anim-hidden`}>
          Honest skill levels — bars reflect actual depth, not aspirations.
        </p>

        {/* Legend */}
        <div className={`${styles.legend} skills-legend anim-hidden`} aria-label="Proficiency legend">
          {(["expert","proficient","familiar","learning"] as Proficiency[]).map((l) => (
            <div key={l} className={styles.legendItem}>
              <span className={`${styles.legendDot} ${LEVEL_COLORS[l]}`} aria-hidden="true" />
              <span>{LEVEL_LABEL[l]}</span>
            </div>
          ))}
        </div>

        {/* Skill categories */}
        <div className={styles.grid}>
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div
              key={cat.title}
              ref={(el) => { cardRefs.current[ci] = el; }}
              className={styles.card}
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon} aria-hidden="true">{cat.icon}</span>
                <span className={styles.cardTitle}>{cat.title}</span>
              </div>

              {cat.skills.map((skill) => (
                <div key={skill.name} className={styles.skillRow}>
                  <div className={styles.skillTop}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={`${styles.badge} ${LEVEL_COLORS[skill.level]}`}>
                      {LEVEL_LABEL[skill.level]}
                    </span>
                  </div>
                  <div className={styles.barTrack} role="progressbar" aria-valuenow={skill.pct} aria-valuemin={0} aria-valuemax={100} aria-label={skill.name}>
                    <div
                      className={`${styles.barFill} ${BAR_COLORS[skill.level]}`}
                      data-pct={skill.pct}
                      style={{ transform: "scaleX(0)", transformOrigin: "left", willChange: "transform" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={`${styles.note} skills-note anim-hidden`}>
          <strong>Transparency matters:</strong> Frontend (React, Next.js, TypeScript, Tailwind) is my primary strength. Backend, databases, and DevOps are real skills I&apos;ve used in projects — but I don&apos;t claim expertise there yet. That&apos;s the next chapter.
        </div>
      </div>
    </section>
  );
}
