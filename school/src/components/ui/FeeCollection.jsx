import DashboardSection from './DashboardSection'
import { feeData } from '../../data/dashboard'

function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
  return value.toLocaleString('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 })
}

export default function FeeCollection({ data = feeData }) {
  const { collected = 0, pending = 0, expected = 0 } = data || {}
  const percentage = expected ? (collected / expected) * 100 : 0

  return (
    <DashboardSection title="Fee Collection" subtitle="This term" className="h-full">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-muted">Collected</p>
          <p className="mt-1 text-lg font-bold text-primary-dark sm:text-xl">
            {formatCurrency(collected)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Pending</p>
          <p className="mt-1 text-lg font-bold text-charcoal dark:text-cream sm:text-xl">
            {formatCurrency(pending)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Total Expected</p>
          <p className="mt-1 text-sm font-semibold text-muted sm:text-base">
            {formatCurrency(expected)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-stone-100 dark:bg-neutral-800" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" aria-label="Fees collected">
          <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted">{percentage.toFixed(1)}% collected</p>
      </div>

      <p className="mt-6 text-xs text-muted">Demo figures - not a real school</p>
    </DashboardSection>
  )
}
