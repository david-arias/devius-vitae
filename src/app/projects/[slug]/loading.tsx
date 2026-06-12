export default function ProjectLoading() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-5xl text-primary animate-spin">
          progress_activity
        </span>
        <p className="font-body-md text-body-md text-on-surface-variant">Cargando proyecto...</p>
      </div>
    </div>
  )
}
