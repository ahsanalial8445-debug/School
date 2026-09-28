const variants = {
  emerald: 'bg-primary/10 text-primary-dark',
  amber: 'bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200',
  muted: 'bg-stone-100 text-muted dark:bg-neutral-800 dark:text-neutral-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-200',
}

export default function Badge({ children, variant = 'muted', dot = false }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant] || variants.muted}`}>
    {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" /> : null}
    {children}
  </span>
}
