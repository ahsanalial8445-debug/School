export default function FilterBar({ search, onSearch, filters = [], children }) {
  return <div className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 dark:border-white/10 dark:bg-neutral-900 sm:flex-row sm:flex-wrap sm:items-center">
    {onSearch ? <input type="search" value={search || ''} onChange={(event) => onSearch(event.target.value)} placeholder="Search..." className="h-10 min-w-0 flex-1 rounded-xl border border-stone-200 bg-cream/50 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-800 dark:text-cream sm:min-w-56" /> : null}
    {filters.map((filter) => <select key={filter.key} value={filter.value ?? ''} onChange={(event) => filter.onChange(event.target.value)} aria-label={filter.label} className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm text-charcoal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-800 dark:text-cream"><option value="">{filter.label}</option>{(filter.options || []).map((option) => <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? option}</option>)}</select>)}
    {children}
  </div>
}
