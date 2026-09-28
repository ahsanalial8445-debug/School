import { CheckCircle2, Info, X, XCircle } from 'lucide-react'

export default function Toast({ message, type = 'info', onClose }) {
  const Icon = type === 'success' ? CheckCircle2 : type === 'error' ? XCircle : Info
  return <div role="status" className="fixed top-5 right-5 z-[60] flex max-w-sm items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-charcoal shadow-lg dark:border-white/10 dark:bg-neutral-900 dark:text-cream dark:shadow-none">
    <Icon className={`h-5 w-5 ${type === 'error' ? 'text-red-600' : type === 'success' ? 'text-primary-dark' : 'text-muted'}`} aria-hidden="true" />
    <span className="flex-1">{message}</span>
    <button type="button" onClick={onClose} aria-label="Dismiss notification" className="rounded p-1 text-muted hover:bg-cream focus-visible:outline-2 focus-visible:outline-primary dark:hover:bg-neutral-800"><X className="h-4 w-4" aria-hidden="true" /></button>
  </div>
}
