import { ArrowRight } from 'lucide-react'
import DashboardSection from './DashboardSection'
import { studentsData } from '../../data/dashboard'

const statusStyles = {
  active: {
    badge: 'bg-primary/10 text-primary-dark',
    dot: 'bg-primary',
  },
  pending: {
    badge: 'bg-amber-100 text-amber-900',
    dot: 'bg-amber-600',
  },
  inactive: {
    badge: 'bg-stone-100 text-muted',
    dot: 'bg-muted',
  },
}

const normalizeStatus = (status) => {
  if (!status) return 'inactive'
  return String(status).toLowerCase().trim()
}

function getInitials(name = '') {
  return String(name)
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatDate(date) {
  if (!date) return '—'
  try {
    const parsedDate = new Date(date)
    if (Number.isNaN(parsedDate.getTime())) return '—'
    return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return '—'
  }
}

export default function RecentStudents({ onViewAll, students = studentsData }) {
  return (
    <DashboardSection
      title="Recent Students"
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary-dark focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:underline"
        >
          View all students
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      }
    >
      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-muted dark:border-white/10">
              <th scope="col" className="w-[42%] px-1 pb-3 font-medium sm:w-[35%] sm:px-0">
                Student
              </th>
              <th scope="col" className="hidden pb-3 font-medium sm:table-cell sm:w-[20%]">
                Class
              </th>
              <th scope="col" className="w-[30%] px-1 pb-3 font-medium sm:w-[25%] sm:px-0">
                Enrollment Date
              </th>
              <th scope="col" className="w-[28%] px-1 pb-3 font-medium sm:w-[20%] sm:px-0">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const key = normalizeStatus(student.status)
              const config = statusStyles[key] || statusStyles.inactive
              const name = student.fullName || student.name || 'Unknown student'
              const className = student.className || student.class || 'Unassigned'
              const label = key.charAt(0).toUpperCase() + key.slice(1)

              return (
                <tr key={student.id} className="border-b border-stone-100 last:border-0 dark:border-white/5">
                  <td className="px-1 py-3 sm:px-0 sm:py-4">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary-dark">
                        {getInitials(name)}
                      </span>
                      <span className="truncate font-semibold text-charcoal dark:text-cream">{name}</span>
                    </div>
                  </td>
                  <td className="hidden py-3 text-muted sm:table-cell sm:py-4">{className}</td>
                  <td className="px-1 py-3 text-xs text-muted sm:px-0 sm:py-4 sm:text-sm">
                    {formatDate(student.enrollmentDate)}
                  </td>
                  <td className="px-1 py-3 sm:px-0 sm:py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold ${config.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
                      {config.label || label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </DashboardSection>
  )
}
