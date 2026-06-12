import { getSettings, updateSettings } from '@/lib/actions/general'
import GeneralForm from '@/components/admin/GeneralForm'

export default async function AdminGeneralPage() {
  const settings = await getSettings()

  return (
    <div className="flex-1 p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">General</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Configuración global del sitio: hero, iconos, contacto, footer y marca.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-8">
        <GeneralForm action={updateSettings} defaultValues={settings ?? {}} />
      </div>
    </div>
  )
}
