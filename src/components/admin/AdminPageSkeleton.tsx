'use client'

/**
 * Reutilizable: skeleton para páginas de formulario (new / edit)
 * Úsalo en los loading.tsx de rutas anidadas (/projects/new, /experience/[id], etc.)
 */
export default function AdminPageSkeleton() {
  return (
    <div className="flex-1 p-8 animate-pulse">
      {/* Back link + header */}
      <div className="mb-8 space-y-3">
        <div className="h-4 w-28 rounded bg-surface-container/60" />
        <div className="h-7 w-52 rounded-lg bg-surface-container" />
        <div className="h-4 w-36 rounded bg-surface-container/50" />
      </div>

      {/* Form card */}
      <div className="glass-panel rounded-2xl p-8 space-y-6 max-w-2xl">
        {/* Field rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 rounded bg-surface-container/70" />
            <div className="h-10 w-full rounded-xl bg-surface-container/60" />
          </div>
        ))}

        {/* Textarea */}
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-surface-container/70" />
          <div className="h-32 w-full rounded-xl bg-surface-container/60" />
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-2">
          <div className="h-10 w-36 rounded-full bg-surface-container" />
        </div>
      </div>
    </div>
  )
}
