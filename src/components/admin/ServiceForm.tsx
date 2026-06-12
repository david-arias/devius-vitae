'use client'

import { useState } from 'react'

interface ServiceFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Record<string, any>
  isEdit?: boolean
}

const inputClass = 'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors'
const labelClass = 'block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2'

export default function ServiceForm({ action, defaultValues = {}, isEdit = false }: ServiceFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await action(new FormData(e.currentTarget))
    } catch (err: any) {
      setError(err.message ?? 'Error al guardar')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Título *</label>
          <input name="title" required defaultValue={defaultValues.title ?? ''} placeholder="Diseño UX/UI" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Ícono (Material Symbol)</label>
          <input name="icon" defaultValue={defaultValues.icon ?? ''} placeholder="design_services" className={inputClass} />
          <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant/60">
            Nombre del icono de <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Material Symbols</a>
          </p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción *</label>
        <textarea name="description" required rows={3} defaultValue={defaultValues.description ?? ''}
          placeholder="Descripción del servicio..." className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Características / Features (una por línea)</label>
        <textarea name="features" rows={5} defaultValue={(defaultValues.features ?? []).join('\n')}
          placeholder={"Investigación de usuarios\nArquitectura de información\nPrototipos interactivos"} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Orden</label>
          <input name="order_index" type="number" min={0} defaultValue={defaultValues.order_index ?? 0} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>¿Destacado?</label>
          <select name="featured" defaultValue={defaultValues.featured ? 'true' : 'false'} className={inputClass}>
            <option value="false">No</option>
            <option value="true">Sí — card más grande</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="font-body-md text-body-md text-error flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>{error}
        </p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary disabled:opacity-60">
          {loading
            ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Guardando...</>
            : <><span className="material-symbols-outlined text-[18px]">save</span>{isEdit ? 'Guardar cambios' : 'Crear servicio'}</>
          }
        </button>
        <a href="/admin/services" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}
