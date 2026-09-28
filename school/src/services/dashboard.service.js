import { apiGet } from './api'

export async function getOverview() {
  const response = await apiGet('/dashboard/overview')
  return response?.data || response
}
