import { Megaphone } from 'lucide-react'
import DashboardSection from './DashboardSection'
import { announcementsData } from '../../data/dashboard'

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

export default function Announcements({ announcements = announcementsData, items }) {
  const announcementList = announcements ?? items ?? []

  return (
    <DashboardSection title="Announcements" subtitle="Latest updates" className="h-full">
      {Array.isArray(announcementList) && announcementList.length > 0 ? (
        <ul>
        {announcementList.map((announcement) => (
          <li key={announcement.id} className="flex gap-3 border-b border-stone-100 py-3 first:pt-0 last:border-0 last:pb-0 dark:border-white/10">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
              <Megaphone className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-sm font-semibold text-charcoal dark:text-cream">{announcement.title}</p>
                <time className="shrink-0 text-[11px] text-muted">{formatDate(announcement.date)}</time>
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{announcement.message}</p>
            </div>
          </li>
        ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No announcements yet</p>
      )}
    </DashboardSection>
  )
}
