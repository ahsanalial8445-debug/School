export default function DashboardSection({
  title,
  subtitle,
  action,
  children,
  className = '',
  as: Tag = 'section',
}) {
  return (
    <Tag
      className={`rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-neutral-900 ${className}`}
    >
      {(title || action) && (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            {title ? (
              <h2 className="font-display text-lg font-semibold tracking-tight text-charcoal dark:text-cream">
                {title}
              </h2>
            ) : null}
            {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
          </div>
          {action}
        </header>
      )}
      {children}
    </Tag>
  )
}
