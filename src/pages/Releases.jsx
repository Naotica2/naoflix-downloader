import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowLeft, Download, ChevronRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ──────────────────────── Animation Variants ──────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Releases() {
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/releases.json')
      .then((res) => res.json())
      .then((data) => {
        setReleases(data.reverse())
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching releases:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-surface px-4 sm:px-6">
      {/* Navbar/Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto flex w-full max-w-3xl items-center py-8"
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-[14px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/[0.08] transition-all duration-200 group-hover:bg-white/[0.08] group-hover:ring-white/[0.12]">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Home
        </Link>
      </motion.header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-3xl flex-1 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12"
        >
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary"
          >
            Release History
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-[15px] leading-relaxed text-text-secondary"
          >
            Download previous versions and see what has changed in each update.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-text-muted border-t-text-primary" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            {releases.map((release, index) => (
              <motion.div
                key={release.version}
                variants={fadeUp}
                custom={index}
                className="group relative overflow-hidden rounded-2xl border border-border-subtle/70 bg-white/[0.015] p-6 backdrop-blur-sm sm:p-8"
              >
                {/* Abstract gradient for slight visual flair */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/[0.02] blur-3xl transition-opacity duration-300 group-hover:bg-white/[0.04]" />

                <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-text-primary">
                        v{release.version}
                      </h2>
                      {index === 0 && (
                        <span className="rounded-full bg-text-primary/10 px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-wider text-text-primary">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[13px] font-medium text-text-muted">
                      Released on {new Date(release.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  <a
                    href={release.downloadUrl}
                    download={`naoflix-v${release.version}.apk`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] px-5 py-2.5 text-[14px] font-semibold text-text-primary ring-1 ring-white/[0.1] transition-all duration-200 ease-out hover:bg-white/[0.1] hover:ring-white/[0.15] active:scale-[0.98]"
                  >
                    <Download className="h-4 w-4" />
                    Download APK
                  </a>
                </div>

                {release.changelog && release.changelog.length > 0 && (
                  <div className="relative z-10 mt-6 border-t border-border-subtle/40 pt-6">
                    <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-text-secondary">
                      Changelog
                    </h3>
                    <ul className="space-y-3">
                      {release.changelog.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/[0.05] ring-1 ring-white/[0.1]">
                            <Check className="h-2.5 w-2.5 text-text-secondary" />
                          </span>
                          <span className="text-[14px] leading-relaxed text-text-muted">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
            {releases.length === 0 && (
              <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-white/[0.01]">
                <p className="text-[14px] text-text-muted">No releases found.</p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
