import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Releases from './pages/Releases'
import Donation from './pages/Donation'
import {
  Download,
  ShieldOff,
  Monitor,
  Library,
  Subtitles,
  ChevronDown,
  ExternalLink,
  ArrowUpRight,
  X,
  Menu,
} from 'lucide-react'


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


const FEATURES = [
  {
    icon: ShieldOff,
    title: 'Tanpa Iklan',
    description:
      'Nikmati pengalaman menonton tanpa gangguan. Tidak ada pop-up, tidak ada banner — hanya konten murni.',
  },
  {
    icon: Monitor,
    title: 'Resolusi HD',
    description:
      'Kualitas streaming jernih hingga 1080p. Setiap adegan ditampilkan dengan detail memukau di layar apapun.',
  },
  {
    icon: Library,
    title: 'Perpustakaan Lengkap',
    description:
      'Akses ribuan film, serial anime, dan komik di satu tempat. Judul baru ditambahkan secara berkala.',
  },
  {
    icon: Subtitles,
    title: 'Subtitle Indonesia',
    description:
      'Subtitle bahasa Indonesia tersedia untuk semua konten. Tonton dengan nyaman dalam bahasa Anda.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Apakah aplikasi ini aman digunakan?',
    answer:
      'Ya, NaoFlix sepenuhnya aman. APK kami telah diverifikasi dan dipindai dari malware. Anda dapat memeriksa laporan keamanan lengkap di VirusTotal.',
    hasLink: true,
    linkText: 'Lihat Laporan VirusTotal',
    linkHref: 'https://www.virustotal.com/gui/file/69ff3cd124c78cd2977774202a6ed1afa91be31b382c875671d2e3cf19d1dbf2?nocache=1',
  },
  {
    question: 'Apakah NaoFlix benar-benar tanpa iklan?',
    answer:
      'Ya, NaoFlix 100% tanpa iklan. Kami tidak menampilkan iklan pop-up, banner, atau video di dalam aplikasi. Anda dapat menikmati semua konten tanpa gangguan apapun.',
  },
  {
    question: 'Apakah NaoFlix gratis?',
    answer:
      'Tentu saja. NaoFlix 100% gratis untuk diunduh dan digunakan. Tidak ada biaya tersembunyi, tidak ada tier premium, dan tidak ada pembelian dalam aplikasi. Semua konten tersedia untuk setiap pengguna.',
  },
  {
    question: 'Perangkat apa saja yang didukung?',
    answer:
      'NaoFlix saat ini tersedia untuk perangkat Android yang menjalankan Android 7.0 (Nougat) ke atas. Kami sedang berupaya memperluas ke platform lain di masa depan.',
  },
  {
    question: 'Bagaimana cara memperbarui aplikasi?',
    answer:
      'Ada dua cara untuk memperbarui NaoFlix. Pertama, Anda bisa langsung memperbarui dari dalam aplikasi NaoFlix itu sendiri jika sudah pernah menginstal sebelumnya. Kedua, unduh APK terbaru dari halaman ini dan instal di atas versi yang ada. Data Anda akan tetap tersimpan.',
  },
  {
    question: 'Dari mana konten berasal?',
    answer:
      'NaoFlix mengumpulkan konten dari berbagai sumber yang tersedia secara publik di internet. Kami tidak menyimpan konten apapun di server kami sendiri.',
  },
]

const FOOTER_LINKS = {
  Produk: [
    { label: 'Unduh', href: '#hero' },
    { label: 'Fitur', href: '#fitur' },
    { label: 'FAQ', href: '#faq' },
  ],
  Perusahaan: [
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
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Syarat Layanan', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
}

function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative z-[60] flex h-9 w-full items-center justify-center bg-cohere-black px-10">
      <p className="text-[12px] leading-tight text-white">
        NaoFlix v2.0.0 sudah tersedia!{' '}
        <a href="#hero" className="underline underline-offset-2 transition-opacity hover:opacity-80">
          Unduh sekarang
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 flex h-5 w-5 items-center justify-center rounded text-white/60 transition-colors hover:text-white"
        aria-label="Tutup pengumuman"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg">
            <img src="/logo.png" alt="NaoFlix Logo" className="h-full w-full object-cover" />
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            NaoFlix
          </span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <a href="/#fitur" className="text-[14px] font-medium text-body-muted transition-colors duration-200 hover:text-ink">
            Fitur
          </a>
          <a href="/#faq" className="text-[14px] font-medium text-body-muted transition-colors duration-200 hover:text-ink">
            FAQ
          </a>
          <Link to="/donasi" className="text-[14px] font-medium text-body-muted transition-colors duration-200 hover:text-ink">
            Donasi
          </Link>
          <Link to="/releases" className="text-[14px] font-medium text-body-muted transition-colors duration-200 hover:text-ink">
            Riwayat
          </Link>
          <a
            href="https://gnsnwcipctlgehcwiukq.supabase.co/storage/v1/object/public/naoflix/naoflix%20v2.0.0.apk"
            download="naoflix.apk"
            className="inline-flex items-center gap-1.5 rounded-[32px] bg-primary px-5 py-2.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-cohere-black active:scale-[0.98]"
          >
            <Download className="h-3.5 w-3.5" />
            Unduh
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-soft-stone sm:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-hairline bg-canvas sm:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <a href="/#fitur" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-soft-stone">Fitur</a>
              <a href="/#faq" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-soft-stone">FAQ</a>
              <Link to="/donasi" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-soft-stone">Donasi</Link>
              <Link to="/releases" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-soft-stone">Riwayat</Link>
              <a
                href="https://gnsnwcipctlgehcwiukq.supabase.co/storage/v1/object/public/naoflix/naoflix%20v2.0.0.apk"
                download="naoflix.apk"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-[32px] bg-primary px-5 py-3 text-[14px] font-medium text-white"
              >
                <Download className="h-3.5 w-3.5" />
                Unduh APK
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-20"
      id="hero"
    >
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-8 inline-flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-1.5 text-[13px] font-medium text-body-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-deep-green/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-deep-green" />
            </span>
            Tersedia Sekarang
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-display text-[clamp(2rem,6vw,5rem)] font-normal leading-[1.05] tracking-[-1.92px] text-ink"
        >
          Streaming & Baca Komik Gratis{' '}
          <span className="text-body-muted">100% Tanpa Iklan</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-6 max-w-lg text-[clamp(1rem,2vw,1.125rem)] leading-[1.4] text-body-muted"
        >
          Platform hiburan all-in-one Anda. NaoFlix adalah aplikasi terbaik untuk streaming film, menonton anime, dan membaca komik favorit — gratis tanpa iklan.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex flex-col items-center">
            <a
              href="https://gnsnwcipctlgehcwiukq.supabase.co/storage/v1/object/public/naoflix/naoflix%20v2.0.1.apk"
              download="naoflix.apk"
              className="group inline-flex items-center justify-center gap-2.5 rounded-[32px] bg-primary px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-cohere-black active:scale-[0.98]"
            >
              <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Unduh APK
            </a>
            <span className="mt-2 text-[12px] font-medium text-muted">Mendapatkan versi terbaru</span>
          </div>

          <Link
            to="/releases"
            className="inline-flex items-center justify-center gap-2 rounded-[30px] border border-hairline px-6 py-3 text-[14px] font-medium text-primary transition-all duration-200 hover:border-ink/30 hover:bg-soft-stone active:scale-[0.98]"
          >
            Lihat Riwayat Versi
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Features() {
  return (
    <section className="relative overflow-hidden py-20" id="fitur">
      <div className="relative mx-auto max-w-5xl px-4">
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
            className="font-mono mb-4 inline-block text-[14px] font-normal uppercase tracking-[0.28px] text-muted"
          >
            Fitur Unggulan
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display mt-2 text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.2] tracking-[-0.48px] text-ink"
          >
            Dibangun untuk Pengalaman Menonton Terbaik
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-lg text-[16px] leading-[1.5] text-body-muted"
          >
            Semua yang Anda butuhkan untuk hiburan tanpa gangguan. Inilah yang membedakan NaoFlix.
          </motion.p>
        </motion.div>

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
              >
                <div className="group flex h-full flex-col rounded-[4px] border border-hairline/70 bg-canvas p-6 transition-colors duration-300 hover:border-hairline">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-hairline bg-canvas transition-all duration-300">
                    <Icon className="h-5 w-5 text-body-muted transition-colors duration-300 group-hover:text-ink" />
                  </div>

                  <h3 className="mb-2 text-[24px] font-normal leading-[1.3] text-ink">
                    {feature.title}
                  </h3>
                  <p className="text-[16px] leading-[1.5] text-body-muted transition-colors duration-300 group-hover:text-ink">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="border-b border-hairline last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className={`text-[24px] font-normal leading-[1.3] transition-colors duration-200 ${isOpen ? 'text-ink' : 'text-body-muted'}`}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] border border-hairline"
        >
          <ChevronDown className={`h-4 w-4 transition-colors duration-200 ${isOpen ? 'text-ink' : 'text-muted'}`} />
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
            <div className="pb-6 pr-12">
              <p className="text-[16px] leading-[1.5] text-body-muted">
                {item.answer}
              </p>
              {item.hasLink && (
                <a
                  href={item.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-action-blue underline decoration-action-blue/30 underline-offset-4 transition-colors duration-200 hover:text-action-blue hover:decoration-action-blue"
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
    <section className="relative overflow-hidden py-20" id="faq">
      <div className="relative mx-auto max-w-2xl px-4">
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
            className="font-mono mb-4 inline-block text-[14px] font-normal uppercase tracking-[0.28px] text-muted"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display mt-2 text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.2] tracking-[-0.48px] text-ink"
          >
            Pertanyaan yang Sering Diajukan
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-md text-[16px] leading-[1.5] text-body-muted"
          >
            Punya pertanyaan? Kami punya jawabannya. Jika Anda tidak menemukan yang dicari, jangan ragu untuk menghubungi kami.
          </motion.p>
        </motion.div>

        <motion.div
          className="border-t border-hairline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-primary">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-12 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
          <div>
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg">
                <img src="/logo.png" alt="NaoFlix Logo" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-[15px] font-semibold tracking-tight text-white">
                NaoFlix
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-[1.4] text-white/50">
              Platform hiburan all-in-one Anda. Streaming film, tonton anime, dan baca komik — semuanya gratis, tanpa iklan, dalam kualitas HD.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://instagram.com/for_evershya10"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-all duration-200 hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://github.com/Naotica2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-all duration-200 hover:bg-white/10 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-white/40">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1 text-[14px] text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                      {link.external && (
                        <ArrowUpRight className="h-3 w-3 text-white/30" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-4 py-6">
          <p className="text-[12px] text-white/40">
            &copy; {new Date().getFullYear()} NaoFlix. Hak cipta dilindungi.
          </p>
          <p className="text-[12px] text-white/40">
            Dibuat oleh{' '}
            <a
              href="https://github.com/Naotica2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors duration-200 hover:text-white"
            >
              Naotica
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/releases" element={<Releases />} />
      <Route path="/donasi" element={<Donation />} />
    </Routes>
  )
}
