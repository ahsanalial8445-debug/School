import { TrendingUp } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, change, trend }) {
  if (!label || value === undefined) return null

  const isPositive = trend === 'up'

  return (
    <article className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_0_rgba(23,23,23,0.02)] transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-neutral-900 dark:shadow-none">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-dark">
          {Icon ? <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" /> : null}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-charcoal dark:text-cream">{value}</p>
      <p
        className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${isPositive ? 'text-primary-dark' : 'text-muted'}`}
        aria-label={`${isPositive ? 'Increasing' : 'No change'}: ${change}`}
      >
        {isPositive ? (
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
        ) : null}
        <span>{change}</span>
      </p>
    </article>
  )
}
