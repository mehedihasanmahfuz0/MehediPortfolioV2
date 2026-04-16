import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Syne, DM_Mono } from "next/font/google";
import "@/styles/globals.css";

/* ── Google Fonts via next/font (zero layout shift) ── */
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mehedi Hasan Mahfuz — Frontend Developer",
  description:
    "Frontend Developer specialising in React & Next.js. I build scalable, maintainable, and performant web applications.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Tailwind CSS", "Bangladesh"],
  authors: [{ name: "Mehedi Hasan Mahfuz" }],
  creator: "Mehedi Hasan Mahfuz",
  icons: {
    icon: "/Favicons_M.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahfuz.dev", // ← update with your real domain
    title: "Mehedi Hasan Mahfuz — Frontend Developer",
    description: "Frontend Developer specialising in React & Next.js.",
    siteName: "Mehedi Hasan Mahfuz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan Mahfuz — Frontend Developer",
    description: "Frontend Developer specialising in React & Next.js.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)",  color: "#0c0c0b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Scroll to top on page load
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${syne.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
