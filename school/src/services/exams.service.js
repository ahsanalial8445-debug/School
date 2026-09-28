import { apiGet, apiPost } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }

const listResult = (response, key) => {
  const data = response?.data || {}
  return {
    list: Array.isArray(data?.[key]) ? data[key] : [],
    pagination: data?.pagination || emptyPagination,
  }
}

export async function getExams(params = '') {
  return listResult(await apiGet(`/exams${params ? `?${params}` : ''}`), 'exams')
}

export async function getSchedules(params = '') {
  return listResult(await apiGet(`/exam-schedules${params ? `?${params}` : ''}`), 'schedules')
}

export async function createExam(data) { const res = await apiPost('/exams', data); return res?.data }