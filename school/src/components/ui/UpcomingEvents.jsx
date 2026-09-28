import { CalendarDays } from 'lucide-react'
import DashboardSection from './DashboardSection'
import { eventsData } from '../../data/dashboard'

const categoryStyles = {
  exam: 'bg-primary/10 text-primary-dark',
  meeting: 'bg-charcoal/10 text-charcoal',
  event: 'bg-amber-100 text-amber-900',
}

const normalizeCategory = (category) => String(category || 'event').toLowerCase().trim()

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

export default function UpcomingEvents({ events = eventsData, items }) {
  const eventList = events ?? items ?? []

  return (
    <DashboardSection title="Upcoming Events" subtitle="Next 30 days" className="h-full">
      {Array.isArray(eventList) && eventList.length > 0 ? (
        <ul className="divide-y divide-stone-100">
        {eventList.map((event) => (
          <li key={event.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary-dark" aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-charcoal dark:text-cream">{event.title || 'Untitled event'}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted">{formatDate(event.date)}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${categoryStyles[normalizeCategory(event.category)] || categoryStyles.event}`}>
                  {normalizeCategory(event.category).charAt(0).toUpperCase() + normalizeCategory(event.category).slice(1)}
                </span>
              </div>
            </div>
          </li>
        ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No upcoming events</p>
      )}
    </DashboardSection>
  )
}
