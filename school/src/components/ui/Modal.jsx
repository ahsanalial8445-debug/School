import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, title, onClose, children, footer, size = 'md' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) ref.current?.focus()
  }, [open])

  return <div className={open ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4' : 'hidden'} role="dialog" aria-modal="true" aria-hidden={!open} aria-labelledby="modal-title" onClick={open ? onClose : undefined}>
    <div ref={ref} tabIndex={-1} className={`m-4 max-h-[90vh] w-full overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-neutral-900 dark:shadow-none ${size === 'lg' ? 'max-w-4xl' : size === 'sm' ? 'max-w-md' : 'max-w-lg'}`} onClick={(event) => event.stopPropagation()}>
      {title ? <header className="flex items-center justify-between border-b border-stone-200 p-4 dark:border-white/10"><h2 id="modal-title" className="font-semibold text-charcoal dark:text-cream">{title}</h2><button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-muted hover:bg-cream focus-visible:outline-2 focus-visible:outline-primary dark:hover:bg-neutral-800"><X className="h-5 w-5" aria-hidden="true" /></button></header> : null}
      <div className="p-4">{children}</div>
      {footer ? <footer className="border-t border-stone-200 p-4 dark:border-white/10">{footer}</footer> : null}
    </div>
  </div>
}
