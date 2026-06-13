import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, ChevronDown, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

function ReleaseRow({ release, index, total }) {
  const [expanded, setExpanded] = useState(false)
  const isLatest = index === 0

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="border-b border-hairline last:border-b-0"
    >
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-[20px] font-normal text-ink">
            v{release.version}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-[30px] border px-3 py-1 text-[14px] font-medium ${
              isLatest
                ? 'border-deep-green bg-pale-green text-deep-green'
                : 'border-hairline bg-canvas text-muted'
            }`}
          >
            {isLatest ? 'Terbaru' : 'Stabil'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[14px] text-muted">
            {new Date(release.date).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <a
            href={release.downloadUrl}
            download={`naoflix-v${release.version}.apk`}
            className="inline-flex items-center justify-center gap-2 rounded-[32px] bg-primary px-5 py-2.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-cohere-black active:scale-[0.98]"
          >
            <Download className="h-3.5 w-3.5" />
            Unduh
          </a>
        </div>
      </div>

      {release.changelog && release.changelog.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center gap-2 pb-4 text-[14px] font-medium text-action-blue transition-colors hover:text-ink"
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
            {expanded ? 'Sembunyikan changelog' : 'Lihat changelog'}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <ul className="space-y-3 pb-6">
                  {release.changelog.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-hairline">
                        <Check className="h-3 w-3 text-deep-green" />
                      </span>
                      <span className="text-[16px] leading-[1.5] text-body-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
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
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="border-b border-hairline">
        <div className="mx-auto flex w-full max-w-3xl items-center px-4 py-6 sm:px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-body-muted transition-colors duration-200 hover:text-ink"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline transition-all duration-200 group-hover:border-ink/20 group-hover:bg-soft-stone">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="py-12"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.2] tracking-[-0.48px] text-ink"
          >
            Riwayat Rilis
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-[18px] leading-[1.4] text-body-muted"
          >
            Unduh versi sebelumnya dan lihat perubahan di setiap pembaruan.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-hairline border-t-primary" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="border-t border-hairline"
          >
            {releases.map((release, index) => (
              <ReleaseRow
                key={release.version}
                release={release}
                index={index}
                total={releases.length}
              />
            ))}
            {releases.length === 0 && (
              <div className="flex h-32 items-center justify-center rounded-[8px] border border-dashed border-hairline bg-soft-stone">
                <p className="text-[14px] text-muted">Tidak ada rilis ditemukan.</p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
