const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export class ApiError extends Error {
  constructor({ status, message, errors }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

async function request(path, options = {}) {
  const token = localStorage.getItem('educore_token')
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  } catch (error) {
    throw new ApiError({ status: 0, message: error.message || 'Unable to connect to the server.' })
  }

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '')

  if (!response.ok) {
    const message = payload?.message || payload?.error || `Request failed with status ${response.status}.`
    const error = new ApiError({ status: response.status, message, errors: payload?.errors || [] })
    error.body = payload
    throw error
  }

  return payload
}

export function apiGet(path) {
  return request(path, { method: 'GET' })
}

export function apiPost(path, body) {
  return request(path, { method: 'POST', body: JSON.stringify(body) })
}

export function apiPut(path, body) {
  return request(path, { method: 'PUT', body: JSON.stringify(body) })
}

export function apiDelete(path) {
  return request(path, { method: 'DELETE' })
}
