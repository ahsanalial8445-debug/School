import LoadingSkeleton from './LoadingSkeleton'
import EmptyState from './EmptyState'

export default function DataTable({ columns, data, rows = [], loading, error, onRetry, emptyTitle = 'No records found', emptyMessage = 'Try adjusting your filters.', renderMobile }) {
  const safeData = Array.isArray(data) ? data : []
  if (loading) return <LoadingSkeleton />
  if (error) return <div className="rounded-2xl bg-charcoal p-5 text-sm text-white"><div className="flex flex-wrap items-center justify-between gap-3"><span>{error}</span><button type="button" onClick={onRetry} className="rounded-lg bg-primary px-3 py-1.5 font-semibold focus-visible:outline-2 focus-visible:outline-primary">Retry</button></div></div>
  if (!safeData.length) return <EmptyState title={emptyTitle} message={emptyMessage} />
  return <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white dark:border-white/10 dark:bg-neutral-900">
    <div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-sm"><thead><tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-muted dark:border-white/10">{columns.map((column) => <th key={column.key} scope="col" className="px-4 py-3 font-medium">{column.label}</th>)}</tr></thead><tbody>{safeData.map((row, index) => <tr key={row.id ?? index} className="border-b border-stone-100 last:border-0 dark:border-white/5">{columns.map((column) => <td key={column.key} className="px-4 py-3 text-charcoal dark:text-cream">{column.render ? column.render(row) : row[column.key] ?? '—'}</td>)}</tr>)}</tbody></table></div>
    {renderMobile ? <div className="space-y-3 p-3 md:hidden">{safeData.map((row, index) => <div key={row.id ?? index}>{renderMobile(row)}</div>)}</div> : null}
  </div>
}
