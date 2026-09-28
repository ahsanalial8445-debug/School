import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')

    try {
      await login(email, password)
    } catch (loginError) {
      setFormError(loginError.message)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-8 dark:bg-[#171717]">
      <section className="w-full max-w-md rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-none sm:p-8">
        <div className="mb-8">
          <p className="font-display text-2xl font-semibold tracking-tight text-charcoal dark:text-cream">EDUCORE</p>
          <p className="mt-2 text-sm text-muted">Sign in to your school workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-charcoal dark:text-cream">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-cream/50 px-3 text-sm text-charcoal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-800 dark:text-cream"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-charcoal dark:text-cream">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-cream/50 px-3 text-sm text-charcoal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-800 dark:text-cream"
            />
          </div>

          {(formError || error) && (
            <p role="alert" className="rounded-xl bg-charcoal px-3 py-2 text-sm text-white">
              {formError || error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

     
      </section>
    </main>
  )
}
