import DashboardSection from './DashboardSection'

export default function ChartCard({ title, subtitle, children, className = '' }) {
  if (!title) return null

  return (
    <DashboardSection title={title} subtitle={subtitle} className={`h-full ${className}`}>
      {children}
    </DashboardSection>
  )
}
