export default function MessagesLoading() {
  return (
    <div className="flex-1 p-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-7 w-36 rounded-lg bg-surface-container" />
          <div className="h-4 w-28 rounded bg-surface-container/60" />
        </div>
        {/* Badge skeleton */}
        <div className="h-7 w-16 rounded-full bg-surface-container" />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[72, 96, 108].map((w) => (
          <div key={w} className="h-9 rounded-full bg-surface-container/70" style={{ width: w }} />
        ))}
      </div>

      {/* Message cards */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl p-5 space-y-3"
            style={{ opacity: 1 - i * 0.12 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-surface-container" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 rounded bg-surface-container" />
                  <div className="h-3 w-44 rounded bg-surface-container/60" />
                </div>
              </div>
              <div className="h-5 w-20 rounded-full bg-surface-container/70" />
            </div>
            {/* Subject line */}
            <div className="h-4 w-64 rounded bg-surface-container/70" />
            {/* Body preview */}
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded bg-surface-container/50" />
              <div className="h-3 w-4/5 rounded bg-surface-container/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
