import { apiGet, apiPost } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }
export async function getAttendance(params = '') { const res = await apiGet(`/attendance${params ? `?${params}` : ''}`); const list = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.records) ? res.data.records : []; return { list, pagination: res?.data?.pagination || emptyPagination } }
export const getRecords = getAttendance
export async function getClassAttendance(classId, params = '') { const res = await apiGet(`/attendance/class/${classId}${params ? `?${params}` : ''}`); const list = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.records) ? res.data.records : []; return { list, pagination: res?.data?.pagination || emptyPagination } }
export async function getAttendanceStats() { const res = await apiGet('/attendance/stats'); return res?.data || { total: 0 } }
export async function getAttendanceReport(classId, params = '') { const res = await apiGet(`/attendance/class/${classId}/report${params ? `?${params}` : ''}`); const list = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.reports) ? res.data.reports : Array.isArray(res?.data?.results) ? res.data.results : []; return { list, pagination: res?.data?.pagination || emptyPagination } }
export async function markAttendance(data) { const res = await apiPost('/attendance/mark', data); return res?.data }
