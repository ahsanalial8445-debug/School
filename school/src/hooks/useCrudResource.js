import { useCallback, useEffect, useState } from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../services/api'

function extractArray(response, ...keys) {
  if (Array.isArray(response)) return response
  const data = response?.data || response
  if (Array.isArray(data)) return data
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key]
  }
  if (Array.isArray(data?.list)) return data.list
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.rows)) return data.rows
  return []
}

const resourceKeys = {
  '/students': ['students'],
  '/teachers': ['teachers'],
  '/classes': ['classes'],
  '/subjects': ['subjects'],
  '/attendance': ['records', 'attendance'],
  '/fee-structures': ['structures'],
  '/fee-payments': ['payments'],
  '/exams': ['exams'],
  '/exam-schedules': ['schedules'],
  '/results': ['results'],
  '/announcements': ['announcements'],
}

export default function useCrudResource(path, params = '') {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const payload = await apiGet(`${path}${params ? `?${params}` : ''}`)
      const safeRows = extractArray(payload, ...(resourceKeys[path] || []))
      setData(safeRows)
      setPagination(payload?.data?.pagination || payload?.pagination || {})
      return payload
    } catch (requestError) {
      setError(requestError.message || 'Unable to load records.')
      setData([])
      setPagination({})
      return null
    } finally {
      setLoading(false)
    }
  }, [path, params])

  useEffect(() => {
    let active = true
    load().then(() => { if (!active) return })
    return () => { active = false }
  }, [load])

  const create = async (body) => { const payload = await apiPost(path, body); await load(); return payload }
  const update = async (id, body) => { const payload = await apiPut(`${path}/${id}`, body); await load(); return payload }
  const remove = async (id) => { const payload = await apiDelete(`${path}/${id}`); await load(); return payload }

  return { rows: Array.isArray(data) ? data : [], data: Array.isArray(data) ? data : [], setData, setRows: setData, pagination: pagination || {}, loading, error, refresh: load, reload: load, create, update, remove }
}
