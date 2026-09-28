export default function EmptyState({ icon: Icon, title, message, actionLabel, onAction }) {
  return <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-white px-6 py-12 text-center dark:border-white/10 dark:bg-neutral-900">
    {Icon ? <Icon className="h-9 w-9 text-primary" aria-hidden="true" /> : null}
    <h2 className="mt-3 font-display text-lg font-semibold text-charcoal dark:text-cream">{title}</h2>
    {message ? <p className="mt-1 max-w-md text-sm text-muted">{message}</p> : null}
    {actionLabel ? <button type="button" onClick={onAction} className="mt-5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{actionLabel}</button> : null}
  </div>
}
