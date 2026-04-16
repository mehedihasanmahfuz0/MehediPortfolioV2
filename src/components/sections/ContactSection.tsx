"use client";
/**
 * ContactSection
 *
 * ANIMATIONS:
 *  - CTA words start at opacity 0.1 (ghosted), illuminate L→R via scroll scrub
 *  - Contact link rows slide in from translateX(-20px)
 *  - Form fades up from translateY(20px)
 *  - Form focus: animated center-expanding underline (CSS)
 *  - Submit: gold fill sweep + success state animation
 */
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PERSON } from "@/lib/data";
import styles from "./ContactSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CTA_TEXT  = "Have a project? Let's build something great together.";
const CTA_EM    = new Set(["something", "great"]);

export function ContactSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const ctaRef      = useRef<HTMLHeadingElement>(null);
  const formRef     = useRef<HTMLFormElement>(null);
  const [submitLabel, setSubmitLabel] = useState("Send Message →");
  const [submitting,  setSubmitting]  = useState(false);

  useGSAP(() => {
    // Build CTA word spans
    const ctaEl = ctaRef.current!;
    const words = CTA_TEXT.trim().split(/\s+/);
    ctaEl.textContent = "";
    ctaEl.setAttribute("aria-label", CTA_TEXT);
    const spans = words.map((w) => {
      const s = document.createElement("span");
      s.className = styles.ctaWord + (CTA_EM.has(w.replace(/[.,?!]/g,"")) ? ` ${styles.ctaEm}` : "");
      s.textContent = w + " ";
      ctaEl.appendChild(s);
      return s;
    });

    // Spotlight scrub
    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 80%", end: "center 30%",
      scrub: .5,
      onUpdate(self) {
        spans.forEach((s, i) => {
          const thr  = i / spans.length;
          const prog = (self.progress - thr) / (1 / spans.length);
          s.style.opacity = String(Math.min(1, Math.max(.1, .1 + .9 * Math.max(0, prog))));
        });
      },
    });

    // Eyebrow
    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 78%", once: true,
      onEnter() { gsap.to(".ct-ey", { opacity: 1, y: 0, duration: .7, ease: "power3.out" }); },
    });

    // Contact rows
    gsap.set(".contact-row", { opacity: 0, x: -20 });
    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 72%", once: true,
      onEnter() {
        gsap.to(".contact-row", {
          opacity: 1, x: 0, duration: .65, ease: "power3.out", stagger: .1, delay: .2,
        });
        gsap.to(".ct-socials", { opacity: 1, x: 0, duration: .65, ease: "power3.out", delay: .4 });
        gsap.to(formRef.current, { opacity: 1, y: 0, duration: .85, ease: "power3.out", delay: .2 });
      },
    });
  }, { scope: sectionRef });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitLabel("Sending…");

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      setSubmitLabel("Config Error");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitLabel("Message Sent ✓");
        const btn = document.getElementById("ct-submit");
        if (btn) gsap.to(btn, { backgroundColor: "var(--green)", borderColor: "var(--green)", duration: .4 });
        setTimeout(() => {
          setSubmitLabel("Send Message →");
          setSubmitting(false);
          (formRef.current as HTMLFormElement)?.reset();
          const b = document.getElementById("ct-submit");
          if (b) gsap.to(b, { backgroundColor: "var(--ink)", borderColor: "var(--ink)", duration: .4 });
        }, 3000);
      } else {
        console.error("Formspree error:", res.status, await res.text());
        setSubmitLabel("Failed — Try Again");
        setSubmitting(false);
      }
    } catch (err) {
      console.error("Network error:", err);
      setSubmitLabel("Failed — Try Again");
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" ref={sectionRef} className={styles.section} aria-label="Contact">
      <div className={styles.wrap}>
        <div className={`${styles.eyebrow} ct-ey anim-hidden`}>Contact</div>

        <div className={styles.grid}>
          {/* Left */}
          <div>
            <h2 ref={ctaRef} className={styles.cta} />

            <div className={styles.links}>
              <div className={`${styles.linkRow} contact-row`}>
                <div className={styles.linkIcon} aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="M2 4l6 5 6-5M2 4h12v9H2z" /></svg>
                </div>
                <div>
                  <div className={styles.linkLabel}>Email</div>
                  <a href={`mailto:${PERSON.email}`} className={styles.linkVal}>{PERSON.email}</a>
                </div>
              </div>

              <div className={`${styles.linkRow} contact-row`}>
                <div className={styles.linkIcon} aria-hidden="true">
                  <svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M6 8h4M8 6v4"/></svg>
                </div>
                <div>
                  <div className={styles.linkLabel}>LinkedIn</div>
                  <a href={PERSON.linkedin} target="_blank" rel="noopener" className={styles.linkVal}>
                    linkedin.com/in/mehedi-hasan-mahfuz
                  </a>
                </div>
              </div>

              <div className={`${styles.linkRow} contact-row`}>
                <div className={styles.linkIcon} aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="M8 1C4.13 1 1 4.13 1 8c0 3.09 2 5.72 4.79 6.65.35.06.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.62 1.07 1.63.76 2.03.58.06-.45.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72A6.73 6.73 0 018 4.84c.6 0 1.2.08 1.76.23 1.34-.91 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.89 0 2.7-1.64 3.29-3.2 3.47.25.22.48.65.48 1.31v1.94c0 .19.13.4.48.34A7 7 0 0015 8c0-3.87-3.13-7-7-7z"/></svg>
                </div>
                <div>
                  <div className={styles.linkLabel}>GitHub</div>
                  <a href={PERSON.github} target="_blank" rel="noopener" className={styles.linkVal}>
                    github.com/mehedihasanmahfuz0
                  </a>
                </div>
              </div>
            </div>

            <div className={`${styles.socials} ct-socials anim-hidden`}>
              <a href={PERSON.linkedin} target="_blank" rel="noopener" className={styles.social}>LinkedIn ↗</a>
              <a href={PERSON.github}   target="_blank" rel="noopener" className={styles.social}>GitHub ↗</a>
              <a href={`mailto:${PERSON.email}`}        className={styles.social}>Email ↗</a>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.form}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            noValidate
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="f-name">Your name</label>
              <input className={styles.input} id="f-name" name="name" type="text" placeholder="John Smith" required autoComplete="name" />
              <div className={styles.fieldLine} aria-hidden="true" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="f-email">Email address</label>
              <input className={styles.input} id="f-email" name="email" type="email" placeholder="john@company.com" required autoComplete="email" suppressHydrationWarning />
              <div className={styles.fieldLine} aria-hidden="true" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="f-subject">Subject</label>
              <input className={styles.input} id="f-subject" name="subject" type="text" placeholder="Project enquiry / Hire me" />
              <div className={styles.fieldLine} aria-hidden="true" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="f-msg">Message</label>
              <textarea className={styles.textarea} id="f-msg" name="message" placeholder="Tell me about your project…" required rows={4} />
              <div className={styles.fieldLine} aria-hidden="true" />
            </div>
            <button
              id="ct-submit"
              type="submit"
              disabled={submitting}
              className={`${styles.submit} mag-btn`}
            >
              <span>{submitLabel}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
