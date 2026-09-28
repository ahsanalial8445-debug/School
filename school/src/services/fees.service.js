import { apiDelete, apiGet, apiPost, apiPut } from './api'

const emptyPagination = { total: 0, page: 1, limit: 10, pages: 0 }
export async function getFeeStructures(params = '') { const res = await apiGet(`/fee-structures${params ? `?${params}` : ''}`); return { list: Array.isArray(res?.data?.structures) ? res.data.structures : [], pagination: res?.data?.pagination || emptyPagination } }
export async function getFeePayments(params = '') { const res = await apiGet(`/fee-payments${params ? `?${params}` : ''}`); return { list: Array.isArray(res?.data?.payments) ? res.data.payments : [], pagination: res?.data?.pagination || emptyPagination } }
export const getStructures = getFeeStructures
export const getPayments = getFeePayments
export async function getFeeStructureById(id) { const res = await apiGet(`/fee-structures/${id}`); return res?.data || null }
export async function getFeePaymentById(id) { const res = await apiGet(`/fee-payments/${id}`); return res?.data || null }
export async function createFeeStructure(data) { const res = await apiPost('/fee-structures', data); return res?.data }
export async function createFeePayment(data) { const res = await apiPost('/fee-payments', data); return res?.data }
export const updateFeeStructure = (id, body) => apiPut(`/fee-structures/${id}`, body)
export const deleteFeeStructure = (id) => apiDelete(`/fee-structures/${id}`)
export const payFee = (id, body) => apiPut(`/fee-payments/${id}/pay`, body)
