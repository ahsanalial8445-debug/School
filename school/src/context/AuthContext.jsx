/* oxlint-disable react(only-export-components) */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  getCurrentUser,
  getStoredUser,
  getToken,
  isAuthenticated,
  login as loginRequest,
  logout as logoutRequest,
} from '../services/auth.service'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: getStoredUser(),
    token: getToken(),
    loading: Boolean(getToken()),
    error: null,
  })

  useEffect(() => {
    if (!isAuthenticated()) return

    getCurrentUser()
      .then((user) => setState({ user, token: getToken(), loading: false, error: null }))
      .catch((error) => {
        logoutRequest()
        setState({ user: null, token: null, loading: false, error: error.message })
      })
  }, [])

  async function login(email, password) {
    setState((current) => ({ ...current, loading: true, error: null }))
    try {
      const result = await loginRequest(email, password)
      setState({ user: result.user, token: result.token, loading: false, error: null })
      return result
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error.message }))
      throw error
    }
  }

  function logout() {
    logoutRequest()
    setState({ user: null, token: null, loading: false, error: null })
  }

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
