import { apiGet, apiPost } from './api'

const TOKEN_KEY = 'educore_token'
const USER_KEY = 'educore_user'

export async function login(email, password) {
  const response = await apiPost('/auth/login', { email, password })
  const token = response?.token || response?.data?.token
  const user = response?.user || response?.data?.user

  if (!token) {
    throw new Error('Login response did not include an authentication token.')
  }

  localStorage.setItem(TOKEN_KEY, token)
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))

  return { token, user }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export async function getCurrentUser() {
  const response = await apiGet('/auth/me')
  const user = response?.user || response?.data?.user || response?.data || response
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser() {
  const storedUser = localStorage.getItem(USER_KEY)
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function isAuthenticated() {
  return Boolean(getToken())
}
