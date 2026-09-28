import { Plus } from 'lucide-react'

export default function PageHeader({ title, subtitle, actionLabel, onAction, actionIcon: ActionIcon = Plus }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-charcoal dark:text-cream sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted sm:text-base">{subtitle}</p> : null}
      </div>
      {actionLabel ? (
        <button type="button" onClick={onAction} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <ActionIcon className="h-4 w-4" aria-hidden="true" />
          {actionLabel}
        </button>
      ) : null}
    </header>
  )
}
