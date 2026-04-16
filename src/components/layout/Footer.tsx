import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        © {new Date().getFullYear()} Mehedi Hasan Mahfuz · Built with Next.js 15 &amp; GSAP
      </span>
      <a href="#hero" className={styles.top}>Back to top ↑</a>
    </footer>
  );
}
