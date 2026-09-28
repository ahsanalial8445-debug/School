import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import DashboardSection from './DashboardSection'

function AttendanceTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs shadow-sm dark:border-white/10 dark:bg-neutral-800 dark:shadow-none">
      <p className="font-medium text-charcoal dark:text-cream">
        {item.name}: {item.value.toLocaleString()}
      </p>
      <p className="mt-0.5 text-muted">Demo attendance count</p>
    </div>
  )
}

export default function AttendanceOverview({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <DashboardSection title="Today's Attendance" subtitle="Present, late, and absent (demo)">
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-48 w-48 shrink-0" role="img" aria-label="Today's attendance breakdown as a donut chart, demo data">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={78}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<AttendanceTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">Total</p>
            <p className="font-display text-2xl font-semibold text-charcoal dark:text-cream">{total.toLocaleString()}</p>
          </div>
        </div>

        <ul className="w-full space-y-3">
          {data.map((item) => {
            const percent = total ? Math.round((item.value / total) * 1000) / 10 : 0
            return (
              <li key={item.name} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-charcoal dark:text-cream">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.name}
                </span>
                <span className="font-medium text-charcoal dark:text-cream">
                  {item.value.toLocaleString()}
                  <span className="ml-2 text-xs font-normal text-muted">{percent}%</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </DashboardSection>
  )
}
