import { apiDelete, apiGet, apiPost, apiPut } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }
const listResult = (res) => ({ list: Array.isArray(res?.data?.subjects) ? res.data.subjects : [], pagination: res?.data?.pagination || emptyPagination })
export async function getSubjects(params = '') { return listResult(await apiGet(`/subjects${params ? `?${params}` : ''}`)) }
export async function getSubjectById(id) { const res = await apiGet(`/subjects/${id}`); return res?.data || null }
export async function getSubjectStats() { const res = await apiGet('/subjects/stats'); return res?.data || { total: 0 } }
export async function createSubject(data) { const res = await apiPost('/subjects', data); return res?.data }
export const updateSubject = (id, body) => apiPut(`/subjects/${id}`, body)
export const deleteSubject = (id) => apiDelete(`/subjects/${id}`)
