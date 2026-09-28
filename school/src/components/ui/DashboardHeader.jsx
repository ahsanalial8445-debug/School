import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, Megaphone, Plus, TrendingUp, Users, Wallet } from 'lucide-react'
import { getTodayQuote } from '../../data/quotes'

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return ['☀️', 'Good morning']
  if (hour >= 12 && hour < 17) return ['🌤️', 'Good afternoon']
  if (hour >= 17 && hour < 21) return ['🌆', 'Good evening']
  return ['🌙', 'Good night']
}

function getInitials(name) {
  return String(name || 'Amina')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getNumber(source, ...keys) {
  for (const key of keys) {
    const value = source?.[key]
    if (typeof value === 'number') return value
  }
  return null
}

function formatClock(date) {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${dateFormatter.format(date)} · ${timeFormatter.format(date)} PKT`
}

function getPakistanHour(date) {
  const hour = Number(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    hour: 'numeric',
    hour12: false,
  }).format(date))
  return hour === 24 ? 0 : hour
}

export default function DashboardHeader({ user, stats, onQuickAction }) {
  const [now, setNow] = useState(() => new Date())
  const quote = useMemo(() => getTodayQuote(), [])
  const [emoji, greeting] = getGreeting(getPakistanHour(now))
  const firstName = user?.name?.split(' ')[0] || 'Amina'
  const pendingFees = getNumber(stats, 'pendingFees', 'pendingFeeCount')
  const examsThisWeek = getNumber(stats, 'examsThisWeek', 'weeklyExams')
  const newStudents = getNumber(stats, 'newStudents', 'newStudentsCount')
  const quickActions = [
    { id: 'students', label: 'Add Student', icon: Plus },
    { id: 'announcements', label: 'Post Announcement', icon: Megaphone },
    { id: 'attendance', label: 'Mark Attendance', icon: CheckCircle },
    { id: 'fees', label: 'Record Payment', icon: Wallet },
  ]

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0.9 }}
      animate={{ opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-cream to-white p-6 shadow-sm dark:border-white/10 dark:from-emerald-950/40 dark:via-neutral-900 dark:to-neutral-900 dark:shadow-none sm:p-8"
    >
      <div className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="relative shrink-0">
              {user?.avatar ? <img src={user.avatar} alt={`${user?.name || 'User'} avatar`} className="h-12 w-12 rounded-full object-cover" /> : <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{getInitials(user?.name)}</span>}
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-primary dark:border-neutral-900" aria-label="Online" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-charcoal dark:text-cream sm:text-4xl">{emoji} {greeting}, {firstName}</h1>
              <p className="mt-2 text-sm text-muted" aria-live="polite">{formatClock(now)}</p>
              <div className="mt-5 flex max-w-full gap-2 overflow-x-auto pb-1">
                {quickActions.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => onQuickAction?.(id)} aria-label={label} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary px-3 py-1.5 text-xs font-semibold text-primary-dark transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><Icon className="h-3.5 w-3.5" aria-hidden="true" />{label}</button>)}
              </div>
            </div>
          </div>
          <blockquote className="hidden max-w-sm text-right text-sm italic leading-relaxed text-muted lg:block">“{quote.text}”<footer className="mt-2 not-italic font-semibold text-charcoal dark:text-cream">— {quote.author}</footer></blockquote>
        </div>

        {(pendingFees !== null || examsThisWeek !== null || newStudents !== null) ? <div className="mt-6 flex flex-wrap gap-2 border-t border-emerald-100 pt-4">{pendingFees !== null ? <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900"><span className="h-1.5 w-1.5 rounded-full bg-amber-600" aria-hidden="true" />{pendingFees} pending fees</span> : null}{examsThisWeek !== null ? <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark"><Calendar className="h-3.5 w-3.5" aria-hidden="true" />{examsThisWeek} exams this week</span> : null}{newStudents !== null ? <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark"><Users className="h-3.5 w-3.5" aria-hidden="true" />{newStudents} new students</span> : null}</div> : null}
      </div>
      <TrendingUp className="pointer-events-none absolute -right-6 -bottom-8 h-40 w-40 rotate-12 text-primary/5" aria-hidden="true" />
    </motion.section>
  )
}
