import React, { useEffect, useState } from 'react'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Classes from './pages/Classes'
import Subjects from './pages/Subjects'
import Attendance from './pages/Attendance'
import Fees from './pages/Fees'
import Exams from './pages/Exams'
import Announcements from './pages/Announcements'
import Settings from './pages/Settings'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'

const pages = {
  dashboard: Dashboard,
  students: Students,
  teachers: Teachers,
  classes: Classes,
  attendance: Attendance,
  fees: Fees,
  exams: Exams,
  subjects: Subjects,
  announcements: Announcements,
  settings: Settings,
}

class PageErrorBoundary extends React.Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('EDUCORE page render error:', error)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <section className="mx-auto max-w-3xl rounded-3xl border border-red-200 bg-white px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-charcoal">This page could not load</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          {this.state.error.message || 'An unexpected page error occurred.'}
        </p>
      </section>
    )
  }
}

function AppContent() {
  const { loading, token } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')

  useEffect(() => {
    const handleSearchNavigation = (event) => setActivePage(event.detail)
    window.addEventListener('educore:navigate', handleSearchNavigation)
    return () => window.removeEventListener('educore:navigate', handleSearchNavigation)
  }, [])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-cream text-sm text-muted">Loading EDUCORE...</div>
  }

  if (!token) return <Login />

  const Page = pages[activePage] || Dashboard

  if (!pages[activePage] && import.meta.env.DEV) {
    console.warn(`Unknown EDUCORE page ID: ${activePage}. Falling back to dashboard.`)
  }

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      <PageErrorBoundary>
        {Page === Dashboard ? <Dashboard onNavigate={setActivePage} /> : <Page />}
      </PageErrorBoundary>
    </AppLayout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider><AppContent /></ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
