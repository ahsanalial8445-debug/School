export default function LoadingSkeleton({ variant = 'table', rows = 5 }) {
  if (variant === 'card') return <div className="h-40 animate-pulse rounded-2xl border border-stone-200/80 bg-white dark:border-white/10 dark:bg-neutral-900" aria-label="Loading" />
  return <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-5 dark:border-white/10 dark:bg-neutral-900" aria-label="Loading">
    <div className="h-5 w-40 animate-pulse rounded bg-stone-100 dark:bg-neutral-800" />
    <div className="mt-5 space-y-3">{Array.from({ length: rows }, (_, index) => <div key={index} className="h-10 animate-pulse rounded bg-stone-100 dark:bg-neutral-800" />)}</div>
  </div>
}
