import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function RankBadge({ rank }) {
  const colors = {
    1: 'bg-coral text-white',
    2: 'bg-action-blue text-white',
    3: 'bg-deep-green text-white',
    4: 'bg-soft-stone text-ink',
    5: 'bg-soft-stone text-ink',
  }

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[16px] font-semibold ${colors[rank] || colors[5]}`}
    >
      {rank}
    </div>
  )
}

export default function Donation() {
  const [goal, setGoal] = useState({ current_amount: 0, target_amount: 1000000, title: 'Target Server Bulanan' })
  const [donators, setDonators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: goalData } = await supabase
          .from('donation_goals')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (goalData) {
          setGoal({
            current_amount: goalData.current_amount ?? 0,
            target_amount: goalData.target_amount ?? 1000000,
            title: goalData.title ?? 'Target Server Bulanan',
          })
        }

        const { data: donatorData } = await supabase
          .from('donators')
          .select('*')
          .order('amount', { ascending: false })
          .limit(5)

        if (donatorData) {
          setDonators(donatorData)
        }
      } catch (err) {
        console.warn('Supabase fetch error (check credentials):', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('donation-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'donators' },
        (payload) => {
          setDonators((prev) => {
            const updated = [payload.new, ...prev]
              .sort((a, b) => b.amount - a.amount)
              .slice(0, 5)
            return updated
          })

          if (payload.new?.amount) {
            setGoal((prev) => ({
              ...prev,
              current_amount: prev.current_amount + payload.new.amount,
            }))
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'donation_goals' },
        (payload) => {
          if (payload.new) {
            setGoal({
              current_amount: payload.new.current_amount ?? 0,
              target_amount: payload.new.target_amount ?? 1000000,
              title: payload.new.title ?? 'Target Server Bulanan',
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const progressPercent = goal.target_amount > 0
    ? Math.min((goal.current_amount / goal.target_amount) * 100, 100)
    : 0

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="border-b border-hairline">
        <div className="mx-auto flex w-full max-w-5xl items-center px-4 py-6 sm:px-6">
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

      <section className="bg-deep-green">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="font-mono mb-3 inline-block text-[14px] uppercase tracking-[0.28px] text-white/60"
            >
              Dukungan
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.2] tracking-[-0.48px] text-white"
            >
              {goal.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-3 max-w-lg text-[18px] leading-[1.4] text-white/70"
            >
              Bantu kami menjaga server tetap berjalan dan memberikan pengalaman terbaik untuk semua pengguna.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[14px] text-white/60">Terkumpul</p>
                  <p className="font-display text-[32px] font-normal leading-[1.2] tracking-[-0.32px] text-white">
                    {formatRupiah(goal.current_amount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] text-white/60">Target</p>
                  <p className="text-[20px] font-medium text-white/80">
                    {formatRupiah(goal.target_amount)}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                />
              </div>

              <p className="mt-3 text-[14px] text-white/60">
                {progressPercent.toFixed(1)}% dari target tercapai
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-8">
              <a
                href="https://saweria.co/naotica"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-[32px] bg-white px-6 py-3 text-[14px] font-medium text-deep-green transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
              >
                <Heart className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                Donasi via Saweria
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="font-mono mb-3 inline-block text-[14px] uppercase tracking-[0.28px] text-muted"
            >
              Apresiasi
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal leading-[1.2] tracking-[-0.48px] text-ink"
            >
              Donatur Teratas
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-3 max-w-md text-[16px] leading-[1.5] text-body-muted"
            >
              Terima kasih kepada para donatur yang telah mendukung NaoFlix.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="mt-10 flex h-32 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-hairline border-t-primary" />
            </div>
          ) : donators.length > 0 ? (
            <motion.div
              className="mt-10 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {donators.map((donator, index) => (
                <motion.div
                  key={donator.id || index}
                  variants={fadeUp}
                  custom={index}
                  className="flex items-center gap-4 rounded-[8px] bg-soft-stone p-5 sm:p-6"
                >
                  <RankBadge rank={index + 1} />

                  <div className="flex-1">
                    <p className="text-[16px] font-medium text-ink">
                      {donator.name || 'Anonim'}
                    </p>
                    {donator.message && (
                      <p className="mt-0.5 text-[14px] text-body-muted">
                        &ldquo;{donator.message}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-[16px] font-semibold text-ink">
                      {formatRupiah(donator.amount || 0)}
                    </p>
                    {donator.created_at && (
                      <p className="mt-0.5 text-[12px] text-muted">
                        {formatDate(donator.created_at)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="mt-10 rounded-[8px] border border-dashed border-hairline bg-soft-stone p-8 text-center">
              <p className="text-[14px] text-muted">
                Belum ada donatur. Jadilah yang pertama!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
