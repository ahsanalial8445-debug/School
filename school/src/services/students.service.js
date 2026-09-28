import { apiDelete, apiGet, apiPost, apiPut } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }
const listResult = (res) => ({ list: Array.isArray(res?.data?.students) ? res.data.students : [], pagination: res?.data?.pagination || emptyPagination })
export async function getStudents(params = '') { return listResult(await apiGet(`/students${params ? `?${params}` : ''}`)) }
export async function getStudentById(id) { const res = await apiGet(`/students/${id}`); return res?.data || null }
export async function getStudentStats() { const res = await apiGet('/students/stats'); return res?.data || { total: 0 } }
export async function createStudent(data) { const res = await apiPost('/students', data); return res?.data }
export const updateStudent = (id, body) => apiPut(`/students/${id}`, body)
export const deleteStudent = (id) => apiDelete(`/students/${id}`)
