export default function AdminLoading() {
  return (
    <div className="flex-1 p-8 animate-pulse">
      {/* Page header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-7 w-40 rounded-lg bg-surface-container" />
          <div className="h-4 w-24 rounded-lg bg-surface-container/60" />
        </div>
        <div className="h-10 w-36 rounded-full bg-surface-container" />
      </div>

      {/* Main content skeleton */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-6 px-6 py-4 border-b border-white/5">
          <div className="h-3 w-28 rounded bg-surface-container" />
          <div className="h-3 w-20 rounded bg-surface-container hidden md:block" />
          <div className="h-3 w-16 rounded bg-surface-container hidden lg:block" />
          <div className="ml-auto h-3 w-20 rounded bg-surface-container" />
        </div>

        {/* Rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonRow key={i} opacity={1 - i * 0.1} />
        ))}
      </div>
    </div>
  )
}

function SkeletonRow({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="flex items-center gap-6 px-6 py-5 border-b border-white/5 last:border-0"
      style={{ opacity }}
    >
      {/* Primary cell: title + subtitle */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-48 rounded bg-surface-container" />
        <div className="h-3 w-32 rounded bg-surface-container/60" />
      </div>

      {/* Tags / secondary cell */}
      <div className="hidden md:flex items-center gap-2">
        <div className="h-5 w-14 rounded-full bg-surface-container/70" />
        <div className="h-5 w-18 rounded-full bg-surface-container/50" />
      </div>

      {/* Tertiary cell */}
      <div className="hidden lg:block h-4 w-10 rounded bg-surface-container/50" />

      {/* Status dot */}
      <div className="h-5 w-5 rounded-full bg-surface-container/70" />

      {/* Action icons */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="h-8 w-8 rounded-lg bg-surface-container/60" />
        <div className="h-8 w-8 rounded-lg bg-surface-container/60" />
      </div>
    </div>
  )
}
