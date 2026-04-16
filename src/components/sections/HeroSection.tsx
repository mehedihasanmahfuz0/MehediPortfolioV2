"use client";
/**
 * HeroSection
 *
 * ANIMATIONS:
 *  1. Hero badge fades up first
 *  2. Name chars split via SplitType and stagger up from translateY(110%)
 *     with per-char blur snap — "typewriter collapse" effect
 *  3. Role, value statement, CTAs, stats cascade in with overlap
 *  4. Scroll indicator line draws itself
 *  5. Hero bg: diagonal lines + "</>" watermark + horizontal rule all parallax
 *
 * Uses useGSAP() from @gsap/react for safe Next.js cleanup.
 */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { PERSON, STATS } from "@/lib/data";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const name1Ref    = useRef<HTMLHeadingElement>(null);
  const name2Ref    = useRef<HTMLHeadingElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const roleRef     = useRef<HTMLParagraphElement>(null);
  const valueRef    = useRef<HTMLParagraphElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const scrollCueRef= useRef<HTMLDivElement>(null);
  const scrollLineRef=useRef<HTMLDivElement>(null);
  const ruleRef     = useRef<HTMLDivElement>(null);
  const cornerRef   = useRef<HTMLDivElement>(null);
  const linesRef    = useRef<HTMLDivElement>(null);
  const markRef     = useRef<HTMLDivElement>(null);

  // Stat counter refs
  const statRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  function countUp(el: HTMLSpanElement, target: number, dur: number, suffix: string) {
    const obj = { n: 0 };
    gsap.to(obj, {
      n: target, duration: dur, ease: "power2.out",
      onUpdate() {
        el.textContent = Math.floor(obj.n) + (obj.n >= target && suffix ? suffix : "");
      },
    });
  }

  useGSAP(() => {
    if (!sectionRef.current) return;

    // ── Expose startAnimations globally so Loader can trigger it ──
    const run = () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Badge
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: .6, ease: "power3.out" });

      // 2. Name chars — SplitType splits into individual characters
      //    Each char starts at translateY(110%) inside overflow:hidden container
      const st1 = new SplitType(name1Ref.current!, { types: "chars" });
      const st2 = new SplitType(name2Ref.current!, { types: "chars" });
      gsap.set([st1.chars, st2.chars], { y: "110%", opacity: 0, filter: "blur(4px)" });

      tl.to(st1.chars, {
        y: "0%", opacity: 1, filter: "blur(0px)",
        duration: .75, ease: "power4.out",
        stagger: { each: .028, from: "start" },
      }, "-=.2");

      tl.to(st2.chars, {
        y: "0%", opacity: 1, filter: "blur(0px)",
        duration: .75, ease: "power4.out",
        stagger: { each: .04, from: "start" },
      }, "-=.55");

      // 3. Role + value + CTAs cascade
      tl.to(roleRef.current,  { opacity: 1, y: 0, duration: .6, ease: "power3.out" }, "-=.3");
      tl.to(valueRef.current, { opacity: 1, y: 0, duration: .6, ease: "power3.out" }, "-=.4");
      tl.to(ctasRef.current,  { opacity: 1, y: 0, duration: .6, ease: "power3.out" }, "-=.4");

      // 4. Stats count up
      tl.to(statsRef.current, { opacity: 1, y: 0, duration: .6, ease: "power3.out" }, "-=.3");
      tl.add(() => {
        STATS.forEach((s, i) => {
          const el = statRefs.current[i];
          if (el) countUp(el, s.number, 1.2 + i * 0.1, s.suffix);
        });
      }, "-=.4");

      // 5. Scroll cue + line draw
      tl.to(scrollCueRef.current, { opacity: 1, duration: .6 }, "-=.2");
      tl.to(scrollLineRef.current, { width: "48px", duration: 1.2, ease: "power3.out" }, "-=.5");

      // 6. Hero bg rule draws across
      tl.to(ruleRef.current,   { scaleX: 1, duration: 1.6, ease: "power3.inOut" }, 0.3);
      tl.to(cornerRef.current, { opacity: 1, duration: .8, ease: "power3.out" },   "-=.4");

      // ── Parallax on scroll ──
      gsap.to(linesRef.current, {
        y: -60, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.8 },
      });
      gsap.to(markRef.current, {
        y: -40, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2.5 },
      });
      gsap.to(ruleRef.current, {
        opacity: 0, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "40% top", end: "bottom top", scrub: 1 },
      });
    };

    // Register globally so Loader.tsx can call it after countdown
    (window as Window & { startAnimations?: () => void }).startAnimations = run;

  }, { scope: sectionRef });

  return (
    <section id="hero" ref={sectionRef} className={styles.hero} aria-label="Introduction">
      {/* Background layers */}
      <div ref={linesRef}  className={styles.bgLines}  aria-hidden="true" />
      <div ref={markRef}   className={styles.bgMark}   aria-hidden="true">&lt;/&gt;</div>
      <div ref={ruleRef}   className={styles.bgRule}   aria-hidden="true" />
      <div ref={cornerRef} className={styles.bgCorner} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Badge */}
        <div ref={badgeRef} className={`${styles.badge} anim-hidden`} id="hero-badge">
          <span className={styles.badgeDot} aria-hidden="true" />
          Open to opportunities
        </div>

        {/* Name — overflow hidden on wrappers clips translateY reveal */}
        <div className={styles.nameWrap}>
          <h1 ref={name1Ref} className={styles.name1} aria-label={PERSON.nameShort1}>
            {PERSON.nameShort1}
          </h1>
        </div>
        <div className={styles.name2Wrap}>
          <h2 ref={name2Ref} className={styles.name2} aria-label={PERSON.nameShort2}>
            {PERSON.nameShort2}
          </h2>
        </div>

        {/* Role */}
        <p ref={roleRef} className={`${styles.role} anim-hidden`}>
          {PERSON.role}
        </p>

        {/* Value statement */}
        <p ref={valueRef} className={`${styles.value} anim-hidden`}>
          I build frontend systems that are{" "}
          <strong>scalable, maintainable,</strong> and <strong>fast</strong>
          {" "}— using React and Next.js.
        </p>

        {/* CTAs */}
        <div ref={ctasRef} className={`${styles.ctas} anim-hidden`}>
          <a href="#projects" className={`${styles.btnSolid} mag-btn`} aria-label="View my projects">
            <span>View Projects</span>
          </a>
          <a href="#contact" className={`${styles.btnOutline} mag-btn`} aria-label="Contact me">
            <span>Contact Me</span>
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className={`${styles.stats} anim-hidden`} aria-label="Career statistics">
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.stat}>
              <span
                className={styles.statN}
                ref={(el) => { statRefs.current[i] = el; }}
                aria-label={`${s.number}${s.suffix} ${s.label}`}
              >
                0
              </span>
              <span className={styles.statL}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div ref={scrollCueRef} className={`${styles.scrollCue} anim-hidden`} aria-hidden="true">
          <div ref={scrollLineRef} className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
