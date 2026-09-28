export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-cream shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M4 10.5 12 6l8 4.5v6.25a1.75 1.75 0 0 1-1.75 1.75H15.5V15h-7v3.5H5.75A1.75 1.75 0 0 1 4 16.75V10.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block font-display text-lg font-semibold leading-none tracking-tight text-charcoal">
            EDUCORE
          </span>
          <span className="mt-1 block text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
            School OS
          </span>
        </span>
      )}
    </div>
  )
}
