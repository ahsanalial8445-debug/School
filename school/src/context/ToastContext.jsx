/* oxlint-disable react(only-export-components) */
import { createContext, useContext, useEffect, useState } from 'react'
import Toast from '../components/ui/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(timer)
  }, [toast])
  const showToast = (message, type = 'info') => setToast({ message, type })
  return <ToastContext.Provider value={{ showToast, hideToast: () => setToast(null) }}>{children}{toast ? <Toast {...toast} onClose={() => setToast(null)} /> : null}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
