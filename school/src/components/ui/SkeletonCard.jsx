export default function SkeletonCard({ className = '' }) {
  return <div className={`h-48 animate-pulse rounded-2xl bg-white/70 ${className}`} aria-hidden="true" />
}