import { Bell, ChevronDown, Menu } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Logo from '../ui/Logo'
import GlobalSearch from './GlobalSearch'

export default function Navbar({ title, onMenuClick }) {
  const { user, logout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const userName = user?.name || 'Amina Okoye'
  const userRole = user?.role || user?.roleName || 'School Administrator'

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/90">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-charcoal hover:bg-cream dark:text-cream dark:hover:bg-neutral-800 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="lg:hidden">
            <Logo compact />
          </div>
          <div className="hidden min-w-0 lg:block">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">Overview</p>
            <h1 className="truncate font-display text-lg font-semibold text-charcoal">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <GlobalSearch />

          <button
            type="button"
            className="relative rounded-xl p-2 text-muted hover:bg-cream hover:text-charcoal dark:hover:bg-neutral-800 dark:hover:text-cream"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
              className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white py-1 pr-3 pl-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-white/10 dark:bg-neutral-800"
            >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-charcoal text-xs font-semibold text-cream">
              {userName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
            </span>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-semibold text-charcoal">{userName}</p>
              <span className="mt-0.5 inline-flex rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary-dark">{userRole}</span>
            </div>
              <ChevronDown className="hidden h-4 w-4 text-muted sm:block" aria-hidden="true" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 rounded-xl border border-stone-200 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-neutral-800 dark:shadow-none">
                <p className="px-3 py-2 text-xs text-muted">Signed in as {userName}</p>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-charcoal hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-cream dark:hover:bg-neutral-700"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
