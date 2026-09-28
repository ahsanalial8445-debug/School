import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { navigationItems } from '../../data/navigation'
import Logo from '../ui/Logo'

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const nav = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-6">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted hover:bg-cream hover:text-charcoal dark:hover:bg-neutral-800 dark:hover:text-cream lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary-dark'
                  : 'text-muted hover:bg-cream hover:text-charcoal dark:hover:bg-neutral-800 dark:hover:text-cream'
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.9} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mx-4 mb-5 rounded-2xl border border-stone-200/80 bg-cream px-4 py-4 dark:border-white/10 dark:bg-neutral-800">
        <p className="font-display text-sm font-semibold text-charcoal dark:text-cream">Academic year</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">2025 – 2026 · Foundation build</p>
      </div>
    </div>
  )

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-stone-200/80 bg-white dark:border-white/10 dark:bg-neutral-900 lg:block">
        {nav}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-charcoal/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-xl dark:bg-neutral-900 dark:shadow-none lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {nav}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
