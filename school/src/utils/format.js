export function formatDate(value, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-US', options)
}

export function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
  return value.toLocaleString('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 })
}

export function formatNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('en-US') : '0'
}
