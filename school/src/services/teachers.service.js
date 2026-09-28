import { apiDelete, apiGet, apiPost, apiPut } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }
const listResult = (res) => ({ list: Array.isArray(res?.data?.teachers) ? res.data.teachers : [], pagination: res?.data?.pagination || emptyPagination })
export async function getTeachers(params = '') { return listResult(await apiGet(`/teachers${params ? `?${params}` : ''}`)) }
export async function getTeacherById(id) { const res = await apiGet(`/teachers/${id}`); return res?.data || null }
export async function getTeacherStats() { const res = await apiGet('/teachers/stats'); return res?.data || { total: 0 } }
export async function createTeacher(data) { const res = await apiPost('/teachers', data); return res?.data }
export const updateTeacher = (id, body) => apiPut(`/teachers/${id}`, body)
export const deleteTeacher = (id) => apiDelete(`/teachers/${id}`)
