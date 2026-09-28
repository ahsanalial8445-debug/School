import { apiDelete, apiGet, apiPost, apiPut } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }
const listResult = (res) => ({ list: Array.isArray(res?.data?.classes) ? res.data.classes : [], pagination: res?.data?.pagination || emptyPagination })
export async function getClasses(params = '') { return listResult(await apiGet(`/classes${params ? `?${params}` : ''}`)) }
export async function getClassById(id) { const res = await apiGet(`/classes/${id}`); return res?.data || null }
export async function getClassStats() { const res = await apiGet('/classes/stats'); return res?.data || { total: 0 } }
export async function createClass(data) { const res = await apiPost('/classes', data); return res?.data }
export const updateClass = (id, body) => apiPut(`/classes/${id}`, body)
export const deleteClass = (id) => apiDelete(`/classes/${id}`)
