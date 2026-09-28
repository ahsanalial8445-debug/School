import StatCard from './StatCard'

export default function StatSummary({ items = [] }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <StatCard key={item.id || index} {...item} />)}</div>
}
