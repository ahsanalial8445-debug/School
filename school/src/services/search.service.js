import { apiGet } from './api'

const emptyResults = { students: [], teachers: [], classes: [], subjects: [] }

export const globalSearch = async (query) => {
  const trimmedQuery = query?.trim() || ''
  if (trimmedQuery.length < 2) return { ...emptyResults, error: false }

  const encodedQuery = encodeURIComponent(trimmedQuery)
  const [studentsRes, teachersRes, classesRes, subjectsRes] = await Promise.allSettled([
    apiGet(`/students?search=${encodedQuery}&limit=5`),
    apiGet(`/teachers?search=${encodedQuery}&limit=5`),
    apiGet(`/classes?search=${encodedQuery}&limit=3`),
    apiGet(`/subjects?search=${encodedQuery}&limit=3`),
  ])

  const pick = (result, key) => {
    if (result.status !== 'fulfilled') return []
    const data = result.value?.data || {}
    return Array.isArray(data[key]) ? data[key] : []
  }

  return {
    students: pick(studentsRes, 'students'),
    teachers: pick(teachersRes, 'teachers'),
    classes: pick(classesRes, 'classes'),
    subjects: pick(subjectsRes, 'subjects'),
    error: [studentsRes, teachersRes, classesRes, subjectsRes].every((result) => result.status === 'rejected'),
  }
}
