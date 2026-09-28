import { BookOpen, CalendarCheck, GraduationCap, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartCard from '../components/ui/ChartCard'
import DashboardHeader from '../components/ui/DashboardHeader'
import Announcements from '../components/ui/Announcements'
import FeeCollection from '../components/ui/FeeCollection'
import RecentStudents from '../components/ui/RecentStudents'
import StatCard from '../components/ui/StatCard'
import UpcomingEvents from '../components/ui/UpcomingEvents'
import SkeletonCard from '../components/ui/SkeletonCard'
import { useAuth } from '../context/AuthContext'
import { getOverview } from '../services/dashboard.service'
import {
  announcementsData as fallbackAnnouncements,
  attendanceData as fallbackAttendance,
  enrollmentData as fallbackEnrollment,
  eventsData as fallbackEvents,
  feeData as fallbackFees,
  studentsData as fallbackStudents,
} from '../data/dashboard'

function EnrollmentTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs shadow-sm dark:border-white/10 dark:bg-neutral-800 dark:shadow-none">
      <p className="font-semibold text-charcoal dark:text-cream">{label}</p>
      <p className="mt-1 text-muted">{payload[0].value.toLocaleString()} students</p>
    </div>
  )
}

function AttendanceLegend({ data = [] }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {data.map((item) => (
        <div key={item.name} className="text-center text-xs text-muted">
          <div className="flex items-center justify-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
          </div>
          <p className="mt-1 font-semibold text-charcoal dark:text-cream">{item.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

function buildFallbackStats() {
  return {
    totalStudents: 1248,
    totalTeachers: 86,
    totalClasses: 42,
    attendanceRate: 94.6,
    totalStudentsChange: '+8.2% this month',
    totalTeachersChange: '+4.1% this month',
    totalClassesChange: '+3 new this term',
    attendanceRateChange: '+2.4% this week',
  }
}

function formatStatValue(value, suffix = '') {
  if (value === null || value === undefined || value === '') return `0${suffix}`
  if (typeof value === 'number') return `${value.toLocaleString('en-US')}${suffix}`
  return String(value)
}

function formatStatChange(value) {
  if (value === null || value === undefined || value === '') return '0'
  if (typeof value === 'number') return `${value > 0 ? '+' : ''}${value}%`
  return String(value)
}

function normalizeOverview(overview) {
  const stats = overview?.stats || {}
  const statsSource = Object.keys(stats).length ? stats : buildFallbackStats()
  const attendance = overview?.attendance?.today || {}
  const attendanceSource = Object.keys(attendance).length
    ? attendance
    : Object.fromEntries(fallbackAttendance.map((item) => [item.name.toLowerCase(), item.value]))

  return {
    stats: statsSource,
    enrollment: Array.isArray(overview?.enrollment) && overview.enrollment.length
      ? overview.enrollment
      : fallbackEnrollment,
    attendance: [
      { name: 'Present', value: Number(attendanceSource.present ?? 0), color: '#10B981' },
      { name: 'Absent', value: Number(attendanceSource.absent ?? 0), color: '#171717' },
      { name: 'Late', value: Number(attendanceSource.late ?? 0), color: '#737373' },
    ],
    recentStudents: overview?.recentStudents?.length ? overview.recentStudents : fallbackStudents,
    fees: overview?.fees || fallbackFees,
    events: Array.isArray(overview?.events) ? overview.events : fallbackEvents,
    announcements: Array.isArray(overview?.announcements) ? overview.announcements : fallbackAnnouncements,
  }
}

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth()
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadOverview(showLoading = true) {
    if (showLoading) {
      setLoading(true)
      setError('')
    }
    try {
      const data = await getOverview()
      setOverview(data)
    } catch (requestError) {
      setError(requestError.message || 'Unable to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true
    getOverview()
      .then((data) => {
        if (!active) return
        setOverview(data)
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Unable to load dashboard data.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const data = normalizeOverview(overview)
  const stats = [
    {
      id: 'students', label: 'Total Students', value: formatStatValue(data.stats.totalStudents),
      change: formatStatChange(data.stats.totalStudentsChange), trend: 'up', icon: Users,
    },
    {
      id: 'teachers', label: 'Teachers', value: formatStatValue(data.stats.totalTeachers),
      change: formatStatChange(data.stats.totalTeachersChange), trend: 'up', icon: GraduationCap,
    },
    {
      id: 'classes', label: 'Classes', value: formatStatValue(data.stats.totalClasses),
      change: formatStatChange(data.stats.totalClassesChange), trend: 'up', icon: BookOpen,
    },
    {
      id: 'attendance', label: 'Attendance', value: formatStatValue(data.stats.attendanceRate, '%'),
      change: formatStatChange(data.stats.attendanceRateChange), trend: 'up', icon: CalendarCheck,
    },
  ]
  const attendanceTotal = data.attendance.reduce((total, item) => total + Number(item.value || 0), 0)

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <SkeletonCard className="h-28" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => <SkeletonCard key={index} className="h-36" />)}
        </div>
        <SkeletonCard className="h-[340px]" />
        <SkeletonCard className="h-64" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-charcoal px-4 py-3 text-sm text-white">
          <span>{error}</span>
          <button
            type="button"
            onClick={loadOverview}
            className="rounded-lg bg-primary px-3 py-1.5 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Retry
          </button>
        </div>
      )}
      <DashboardHeader user={user} stats={data.stats} onQuickAction={onNavigate} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.05 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
        className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <ChartCard
          title="Student Statistics"
          subtitle="Student enrollment overview"
          className="min-w-0 lg:col-span-2"
        >
          <div className="h-[280px] w-full min-w-0 overflow-hidden" role="img" aria-label="Student enrollment by month">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.enrollment} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="enrollmentFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                <Tooltip content={<EnrollmentTooltip />} cursor={{ stroke: '#10B981', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#enrollmentFill)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Today&apos;s Attendance" subtitle="Present • Absent • Late">
          <div className="h-[280px] w-full min-w-0 overflow-hidden" role="img" aria-label={`Today's attendance total: ${attendanceTotal.toLocaleString()} students`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.attendance}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={72}
                  outerRadius={100}
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {data.attendance.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="fill-charcoal text-2xl font-semibold dark:fill-cream">
                  {attendanceTotal.toLocaleString()}
                </text>
                <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" className="fill-muted text-xs dark:fill-neutral-400">
                  students
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <AttendanceLegend data={data.attendance} />
        </ChartCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 }}
      >
        <RecentStudents students={data.recentStudents} onViewAll={() => onNavigate?.('students')} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.4 }}
        className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <FeeCollection data={data.fees} />
        <UpcomingEvents events={data.events} />
        <Announcements announcements={data.announcements} />
      </motion.div>
    </div>
  )
}
