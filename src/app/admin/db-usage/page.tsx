import { createClient } from '@/lib/supabase/server'

// Supabase free tier limits
const DB_LIMIT_MB    = 500
const STORAGE_LIMIT_MB = 1024

const TABLES = [
  { name: 'projects',      label: 'Proyectos',    icon: 'web' },
  { name: 'skills',        label: 'Habilidades',  icon: 'auto_awesome' },
  { name: 'experience',    label: 'Experiencia',  icon: 'work' },
  { name: 'education',     label: 'Educación',    icon: 'school' },
  { name: 'services',      label: 'Servicios',    icon: 'design_services' },
  { name: 'contact_messages', label: 'Mensajes',  icon: 'mail' },
  { name: 'site_settings', label: 'Configuración',icon: 'tune' },
]

async function getTableCounts(supabase: ReturnType<typeof createClient>) {
  const results = await Promise.all(
    TABLES.map(async (t) => {
      const { count } = await (supabase as any)
        .from(t.name)
        .select('*', { count: 'exact', head: true })
      return { ...t, count: count ?? 0 }
    })
  )
  return results
}

async function getStorageInfo(supabase: ReturnType<typeof createClient>) {
  try {
    // List top-level folders in portfolio bucket
    const folders = ['projects', 'skills', 'general']
    let totalBytes = 0
    let totalFiles = 0
    const folderStats: { folder: string; files: number; sizeMB: string }[] = []

    for (const folder of folders) {
      const { data } = await supabase.storage.from('portfolio').list(folder, { limit: 500 })
      if (!data) continue
      const files = data.filter((f) => f.metadata)
      const bytes = files.reduce((sum, f) => sum + (f.metadata?.size ?? 0), 0)
      totalFiles += files.length
      totalBytes += bytes
      folderStats.push({ folder, files: files.length, sizeMB: (bytes / 1024 / 1024).toFixed(2) })
    }

    return {
      totalFiles,
      totalMB: (totalBytes / 1024 / 1024).toFixed(2),
      folders: folderStats,
    }
  } catch {
    return { totalFiles: 0, totalMB: '0.00', folders: [] }
  }
}

function ProgressBar({ value, max, color = 'bg-primary' }: { value: number; max: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100)
  const isWarning = pct > 75
  const isDanger  = pct > 90
  const barColor = isDanger ? 'bg-error' : isWarning ? 'bg-yellow-400' : color
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default async function DBUsagePage() {
  const supabase = createClient()
  const [tableCounts, storageInfo] = await Promise.all([
    getTableCounts(supabase),
    getStorageInfo(supabase),
  ])

  const storagePctUsed = (parseFloat(storageInfo.totalMB) / STORAGE_LIMIT_MB) * 100

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">DB Usage</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Uso de base de datos y almacenamiento de Supabase (free tier).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Storage */}
        <div className="glass-panel rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-secondary">storage</span>
            </div>
            <div>
              <p className="font-body-md text-body-md text-on-surface font-semibold">Supabase Storage</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Bucket: portfolio</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-headline-sm text-headline-sm font-bold text-on-surface">{storageInfo.totalMB} <span className="font-body-sm text-body-sm text-on-surface-variant">MB</span></p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">de {STORAGE_LIMIT_MB} MB</p>
            </div>
          </div>

          <ProgressBar value={parseFloat(storageInfo.totalMB)} max={STORAGE_LIMIT_MB} color="bg-secondary" />

          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {storagePctUsed.toFixed(1)}% usado · {storageInfo.totalFiles} archivo{storageInfo.totalFiles !== 1 ? 's' : ''}
          </p>

          {storageInfo.folders.length > 0 && (
            <div className="border-t border-white/5 pt-4 space-y-2">
              {storageInfo.folders.map((f) => (
                <div key={f.folder} className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">/{f.folder}</span>
                  <span className="font-body-sm text-body-sm text-on-surface">{f.files} archivos · {f.sizeMB} MB</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Database rows */}
        <div className="glass-panel rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-primary">database</span>
            </div>
            <div>
              <p className="font-body-md text-body-md text-on-surface font-semibold">Base de datos</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Filas por tabla (PostgreSQL)</p>
            </div>
          </div>

          <div className="space-y-3">
            {tableCounts.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant w-5 flex-shrink-0">{t.icon}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex-1">{t.label}</span>
                <span className={`font-body-sm text-body-sm font-semibold ${t.count > 0 ? 'text-on-surface' : 'text-on-surface-variant/40'}`}>
                  {t.count} fila{t.count !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Limits info */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-4">Límites del plan gratuito (Supabase)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Base de datos',     value: '500 MB',      icon: 'database'   },
              { label: 'Almacenamiento',    value: '1 GB',        icon: 'storage'    },
              { label: 'Ancho de banda',    value: '5 GB / mes',  icon: 'network_check' },
              { label: 'Edge Functions',    value: '500K / mes',  icon: 'bolt'       },
            ].map((item) => (
              <div key={item.label} className="bg-surface-container rounded-xl p-4 border border-white/5">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant block mb-2">{item.icon}</span>
                <p className="font-headline-sm text-headline-sm font-bold text-on-surface">{item.value}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-4">
            Para ver el uso exacto del disco de PostgreSQL, visita{' '}
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              supabase.com/dashboard
            </a>
            {' '}→ Settings → Usage.
          </p>
        </div>

      </div>
    </div>
  )
}
