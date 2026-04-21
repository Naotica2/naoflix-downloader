import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import Releases from './pages/Releases'
import {
  Play,
  Download,
  ShieldOff,
  Monitor,
  Library,
  Subtitles,
  ChevronDown,
  ExternalLink,
  ArrowUpRight,
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

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

/* ──────────────────────── Data ──────────────────────── */

const FEATURES = [
  {
    icon: ShieldOff,
    title: 'No Ads',
    description:
      'Enjoy uninterrupted viewing with absolutely zero advertisements. No pop-ups, no banners — just pure content.',
  },
  {
    icon: Monitor,
    title: 'HD Resolution',
    description:
      'Crystal-clear streaming quality up to 1080p. Every scene rendered in stunning detail on any screen size.',
  },
  {
    icon: Library,
    title: 'Complete Library',
    description:
      'Access thousands of movies, anime series, and comics all in one place. New titles added regularly.',
  },
  {
    icon: Subtitles,
    title: 'Indonesian Subtitles',
    description:
      'Built-in Indonesian subtitles available for all content. Watch comfortably in your preferred language.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Is this application safe to use?',
    answer:
      'Yes, NaoFlix is completely safe. Our APK has been verified and scanned for malware. You can check the full security report on VirusTotal.',
    hasLink: true,
    linkText: 'View VirusTotal Report',
    linkHref: 'https://www.virustotal.com/gui/file/69ff3cd124c78cd2977774202a6ed1afa91be31b382c875671d2e3cf19d1dbf2?nocache=1',
  },
  {
    question: 'Is NaoFlix completely free?',
    answer:
      'Absolutely. NaoFlix is 100% free to download and use. There are no hidden fees, no premium tiers, and no in-app purchases. All content is available to every user.',
  },
  {
    question: 'What devices are supported?',
    answer:
      'NaoFlix is currently available for Android devices running Android 7.0 (Nougat) and above. We are working on expanding to more platforms in the future.',
  },
  {
    question: 'How do I update the app?',
    answer:
      'When a new version is available, simply download the latest APK from this page and install it over the existing version. Your data will be preserved.',
  },
  {
    question: 'Where does the content come from?',
    answer:
      'NaoFlix aggregates content from various publicly available sources across the internet. We do not host any content on our own servers.',
  },
]

const FOOTER_LINKS = {
  Product: [
    { label: 'Download', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'FAQ', href: '#faq' },
  ],
  Company: [
    {
      label: 'GitHub',
      href: 'https://github.com/Naotica2',
      external: true,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/for_evershya10',
      external: true,
    },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
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
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2.5" id="nav-logo">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08] transition-all duration-200 group-hover:bg-white/[0.1] group-hover:ring-white/[0.14]">
            <img src="/logo.png" alt="NaoFlix Logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-text-primary">
            NaoFlix
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden items-center gap-6 sm:flex">
          <a href="/#features" className="text-[13px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary">Features</a>
          <a href="/#faq" className="text-[13px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary">FAQ</a>
          <a
            href=""
            download="naoflix.apk"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-text-primary ring-1 ring-white/[0.08] transition-all duration-200 hover:bg-white/[0.1] hover:ring-white/[0.14]"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

/* ──────────────────────── Hero Section ──────────────────────── */

function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6"
      id="hero"
    >
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-[120px] sm:h-[600px]" />
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
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary – Download APK */}
          <div className="flex w-full flex-col items-center sm:w-auto">
            <a
              href="https://gnsnwcipctlgehcwiukq.supabase.co/storage/v1/object/public/naoflix/naoflix%20v1.2.8.apk"
              download="naoflix.apk"
              id="cta-download"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-text-primary px-6 py-3 text-[14px] font-semibold text-surface shadow-lg shadow-white/[0.04] transition-all duration-200 ease-in-out hover:bg-accent hover:shadow-white/[0.08] active:scale-[0.98] sm:w-auto"
            >
              <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Download APK
            </a>
            <span className="mt-2 text-[12px] font-medium text-text-muted">Gets the latest version</span>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 sm:-mt-6">
            <Link
              to="/releases"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-border-subtle bg-white/[0.03] px-6 py-3 text-[14px] font-medium text-text-secondary backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-text-primary active:scale-[0.98] sm:w-auto"
            >
              View Previous Releases
            </Link>

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
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────── Why NaoFlix Section ──────────────────────── */

function WhyNaoFlix() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="features">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[300px] w-[90vw] max-w-[800px] -translate-x-1/2 rounded-full bg-white/[0.008] blur-[100px] sm:h-[400px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="mb-4 inline-block rounded-full border border-border-subtle bg-surface-elevated/60 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-text-secondary"
          >
            Why NaoFlix
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Built for the Best <br className="hidden sm:block" />
            Viewing Experience
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-text-secondary"
          >
            Everything you need for seamless entertainment, with none of the
            hassle. Here is what sets NaoFlix apart.
          </motion.p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={index}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={cardHover}
                  className="group relative flex h-full flex-col rounded-2xl border border-border-subtle/70 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.08] hover:bg-white/[0.04]"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.08] group-hover:ring-white/[0.1]">
                    <Icon className="h-5 w-5 text-text-secondary transition-colors duration-300 group-hover:text-text-primary" />
                  </div>

                  {/* Text */}
                  <h3 className="mb-2 text-[15px] font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── FAQ Section ──────────────────────── */

function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="border-b border-border-subtle/50 last:border-b-0"
    >
      <button
        onClick={onToggle}
        id={`faq-item-${index}`}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-text-primary"
        aria-expanded={isOpen}
      >
        <span className={`text-[15px] font-medium transition-colors duration-200 ${isOpen ? 'text-text-primary' : 'text-text-secondary'}`}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06]"
        >
          <ChevronDown className={`h-4 w-4 transition-colors duration-200 ${isOpen ? 'text-text-primary' : 'text-text-muted'}`} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-12">
              <p className="text-[14px] leading-relaxed text-text-muted">
                {item.answer}
              </p>
              {item.hasLink && (
                <a
                  href={item.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary underline decoration-border-subtle underline-offset-4 transition-colors duration-200 hover:text-text-primary hover:decoration-text-muted"
                >
                  {item.linkText}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="faq">
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="mb-4 inline-block rounded-full border border-border-subtle bg-surface-elevated/60 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-text-secondary"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-text-secondary"
          >
            Got questions? We have the answers. If you can not find what you
            are looking for, feel free to reach out.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="rounded-2xl border border-border-subtle/70 bg-white/[0.015] p-2 backdrop-blur-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <div className="divide-y-0 px-4">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── Footer ──────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border-subtle/50">
      {/* Main footer area */}
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08] transition-all duration-200 group-hover:bg-white/[0.1] group-hover:ring-white/[0.14]">
                <img src="/logo.png" alt="NaoFlix Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-text-primary">
                NaoFlix
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-text-muted">
              Your all-in-one entertainment platform. Stream movies, watch anime, and read comics —
              all for free, with no ads, in high definition.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://instagram.com/for_evershya10"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-all duration-200 hover:bg-white/[0.06] hover:text-text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://github.com/Naotica2"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-github"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-all duration-200 hover:bg-white/[0.06] hover:text-text-primary"
                aria-label="GitHub"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="lg:col-span-2">
              <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-text-muted">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1 text-[13px] text-text-secondary transition-colors duration-200 hover:text-text-primary"
                    >
                      {link.label}
                      {link.external && (
                        <ArrowUpRight className="h-3 w-3 text-text-muted" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle/40">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-[12px] text-text-muted">
            &copy; {new Date().getFullYear()} NaoFlix. All rights reserved.
          </p>
          <p className="text-[12px] text-text-muted">
            Made by{' '}
            <a
              href="https://github.com/Naotica2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              Naotica
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ──────────────────────── Home ──────────────────────── */

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyNaoFlix />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

/* ──────────────────────── App ──────────────────────── */

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/releases" element={<Releases />} />
    </Routes>
  )
}
