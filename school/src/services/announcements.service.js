import { apiDelete, apiGet, apiPost, apiPut } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }
export async function getAnnouncements(params = '') { const res = await apiGet(`/announcements${params ? `?${params}` : ''}`); return { list: Array.isArray(res?.data?.announcements) ? res.data.announcements : [], pagination: res?.data?.pagination || emptyPagination } }
export async function getAnnouncementById(id) { const res = await apiGet(`/announcements/${id}`); return res?.data || null }
export async function createAnnouncement(data) { const res = await apiPost('/announcements', data); return res?.data }
export const updateAnnouncement = (id, body) => apiPut(`/announcements/${id}`, body)
export const deleteAnnouncement = (id) => apiDelete(`/announcements/${id}`)
