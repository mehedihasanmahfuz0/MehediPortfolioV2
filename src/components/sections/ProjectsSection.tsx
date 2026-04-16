"use client";
/**
 * ProjectsSection — Horizontal scroll exhibition
 *
 * ANIMATIONS:
 *  - ScrollTrigger pins .projSticky, translates .projTrack horizontally
 *  - scrub: 1.6 for silky inertia feel
 *  - Each project visual panel clips open (inset 0 100%→0%) on entry
 *  - Exit: opacity fade only (no yPercent — prevents Experience bleed)
 *  - Content sized to fit viewport height — no overflow, no scroll inside card
 *  - Mobile: vertical stack, no pin
 */
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/lib/data";
import { isMobileViewport } from "@/lib/utils";
import styles from "./ProjectsSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const pinRef      = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const visualRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Header reveal
    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 80%", once: true,
      onEnter() {
        gsap.to([".proj-ey", ".proj-ttl"], {
          opacity: 1, y: 0, duration: .85, stagger: .12, ease: "power3.out",
        });
      },
    });

    if (isMobileViewport()) return;

    const pin    = pinRef.current!;
    const track  = trackRef.current!;
    const sticky = stickyRef.current!;
    const n      = PROJECTS.length;
    const vw     = window.innerWidth;
    // Slide width: 75vw for big screens, 100vw otherwise (matches CSS)
    const slideW = vw >= 1024 ? vw * 0.75 : vw;
    const totalX = (n - 1) * slideW;
    const extraVh = window.innerHeight * .5;

    pin.style.height = (n * window.innerHeight + extraVh) + "px";

    gsap.to(track, {
      x: -totalX, ease: "none",
      scrollTrigger: {
        trigger:       pin,
        start:         "top top",
        end:           () => "+=" + (totalX + extraVh),
        scrub:         2.0,
        pin:           sticky,
        pinSpacing:    true,
        anticipatePin: 1,
        onUpdate(self) {
          const rawIdx = self.progress * (totalX + extraVh) / slideW;
          const idx    = Math.min(n - 1, Math.round(Math.max(0, rawIdx)));
          // Reveal visual panel on slide entry
          const vis = visualRefs.current[idx];
          if (vis && vis.dataset.revealed !== "1") {
            vis.dataset.revealed = "1";
            gsap.to(vis, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut" });
          }
          // Exit fade — opacity only, no transform
          const exitZone = totalX / (totalX + extraVh);
          const exitProg = Math.max(0, (self.progress - exitZone) / (1 - exitZone));
          gsap.set(sticky, { opacity: 1 - exitProg * 0.7 });
        },
        onLeaveBack: () => gsap.set(sticky, { opacity: 1 }),
        onLeave:     () => gsap.set(sticky, { opacity: 1 }),
      },
    });

    // Reveal first visual immediately on section enter
    ScrollTrigger.create({
      trigger: sectionRef.current, start: "top 80%", once: true,
      onEnter() {
        const vis = visualRefs.current[0];
        if (vis) {
          gsap.to(vis, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut", delay: .3 });
          vis.dataset.revealed = "1";
        }
      },
    });

    // Reveal all visual panels as they come into viewport
    visualRefs.current.forEach((vis) => {
      if (vis) {
        ScrollTrigger.create({
          trigger: vis,
          start: "top 90%",
          once: true,
          onEnter() {
            if (vis.dataset.revealed !== "1") {
              vis.dataset.revealed = "1";
              gsap.to(vis, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut" });
            }
          },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className={styles.section} aria-label="Selected projects">

      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={`${styles.eyebrow} proj-ey anim-hidden`}>Selected Work</div>
          <h2 className={`${styles.title} proj-ttl anim-hidden`}>
            Projects I&apos;ve <em>built.</em>
          </h2>
        </div>
        <span className={styles.count}>{PROJECTS.length.toString().padStart(2,"0")} projects</span>
      </div>

      {/* Pin wrapper */}
      <div ref={pinRef}>
        <div ref={stickyRef} className={styles.sticky}>
          <div ref={trackRef} className={styles.track}>
            {PROJECTS.map((p, i) => (
              <article key={p.number} className={styles.slide} aria-label={`Project: ${p.name.join(" ")}`}>

                {/* Top-left links */}
                <div className={styles.topLinks}>
                  <a href={p.liveUrl} className={styles.topLink} target="_blank" rel="noopener" aria-label={`${p.name[0]} live demo`}>
                    Live Demo <span className={styles.arr}>→</span>
                  </a>
                  <a href={p.gitUrl} className={styles.topLink} target="_blank" rel="noopener" aria-label={`${p.name[0]} GitHub repo`}>
                    Git <span className={styles.arr}>→</span>
                  </a>
                </div>

                {/* Info panel */}
                <div className={styles.info}>
                  <div>
                    <p className={styles.num}>{p.number}</p>
                    <h3 className={styles.projName}>
                      {p.name[0]}<br /><em>{p.name[1]}</em>
                    </h3>
                    {p.status && <p className={styles.status}>{p.status}</p>}
                    <p className={styles.tagline}>{p.tagline}</p>
                    <p className={styles.desc}>{p.desc}</p>

                    <ul className={styles.features} aria-label="Key features">
                      {p.features.slice(0, 3).map((f) => (
                        <li key={f} className={styles.feat}>{f}</li>
                      ))}
                    </ul>

                    <div className={styles.tags} aria-label="Technologies used">
                      {p.tags.slice(0, 5).map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Visual panel */}
                <div
                  ref={(el) => { visualRefs.current[i] = el; }}
                  className={styles.visual}
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                  aria-hidden="true"
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      className={styles.img}
                    />
                  ) : (
                    /* ── PHOTO PLACEHOLDER — add image path in src/lib/data.ts ── */
                    <div className={styles.ph}>
                      <div className={styles.phBox}>
                        <div className={`${styles.phBar} ${styles.w80}`} />
                        <div className={styles.phRow}>
                          <div className={styles.phSq} />
                          <div className={styles.phSq} />
                        </div>
                        <div className={`${styles.phBar} ${styles.w60}`} />
                        <div className={`${styles.phBar} ${styles.w40}`} />
                      </div>
                      <p className={styles.phLabel}>Add screenshot in data.ts</p>
                    </div>
                  )}
                  <div className={styles.visualCornerTL} />
                  <div className={styles.visualCornerBR} />
                </div>

              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
