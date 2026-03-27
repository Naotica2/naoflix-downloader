import { motion } from 'framer-motion'
import {
  Play,
  Download,
} from 'lucide-react'

// Lucide brand icons were removed from the main package in recent versions.
// We inline the standard Lucide SVG paths for Instagram and Github to maintain the exact look.
function Instagram({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function Github({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  )
}

/* ──────────────────────── Animation Variants ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

/* ──────────────────────── Navbar ──────────────────────── */

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle/50 bg-surface/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2.5" id="nav-logo">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08] transition-all duration-200 group-hover:bg-white/[0.1] group-hover:ring-white/[0.14]">
            <img src="/logo.png" alt="NaoFlix Logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-text-primary">
            NaoFlix
          </span>
        </a>
      </div>
    </motion.nav>
  )
}

/* ──────────────────────── Hero Section ──────────────────────── */

function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      id="hero"
    >
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} custom={0} className="mb-8 inline-flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-elevated/60 px-4 py-1.5 text-[13px] font-medium text-text-secondary backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available Now
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-text-primary"
        >
          Watch Movies, Anime <br className="hidden sm:block" />
          <span className="text-text-secondary">& Read Comics.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-text-secondary sm:text-base"
        >
          Your all-in-one entertainment app. NaoFlix is the ultimate platform to stream films, watch anime, and read your favorite comics.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          {/* Primary – Download APK */}
          <a
            href="https://pbqxnmfvclduirsvckxz.supabase.co/storage/v1/object/public/naoflix/anime-release.apk"
            download="naoflix.apk"
            id="cta-download"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-text-primary px-6 py-3 text-[14px] font-semibold text-surface shadow-lg shadow-white/[0.04] transition-all duration-200 ease-in-out hover:bg-accent hover:shadow-white/[0.08] active:scale-[0.98] sm:w-auto"
          >
            <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Download APK
          </a>

          {/* Secondary – GitHub */}
          <a
            href="https://github.com/Naotica2"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-github"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-border-subtle bg-white/[0.03] px-6 py-3 text-[14px] font-medium text-text-secondary backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-text-primary active:scale-[0.98] sm:w-auto"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────── Footer ──────────────────────── */

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="border-t border-border-subtle/50 py-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-[13px] text-text-muted">
          &copy; 2026 NaoFlix. All rights reserved.
        </p>
        
        {/* Social Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/for_evershya10"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-instagram"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-all duration-200 hover:bg-white/[0.06] hover:text-text-primary"
            aria-label="Instagram"
          >
            <Instagram className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

/* ──────────────────────── App ──────────────────────── */

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
