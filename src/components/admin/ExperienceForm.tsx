'use client'

import { useState } from 'react'

interface ExperienceFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Record<string, any>
  isEdit?: boolean
}

const inputClass = 'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors'
const labelClass = 'block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2'

export default function ExperienceForm({ action, defaultValues = {}, isEdit = false }: ExperienceFormProps) {
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
          <label className={labelClass}>Empresa *</label>
          <input name="company" required defaultValue={defaultValues.company ?? ''} placeholder="Empresa S.A." className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Rol *</label>
          <input name="role" required defaultValue={defaultValues.role ?? ''} placeholder="UX/UI Designer" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Período *</label>
          <input name="period" required defaultValue={defaultValues.period ?? ''} placeholder="2022 — Presente" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>¿Trabajo actual?</label>
          <select name="current" defaultValue={defaultValues.current ? 'true' : 'false'} className={inputClass}>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea name="description" rows={3} defaultValue={defaultValues.description ?? ''}
          placeholder="Descripción del cargo y responsabilidades..." className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Tags (separados por coma)</label>
        <input name="tags" defaultValue={(defaultValues.tags ?? []).join(', ')}
          placeholder="Figma, Design System, UX Research" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Orden</label>
        <input name="order_index" type="number" min={0} defaultValue={defaultValues.order_index ?? 0} className={inputClass} />
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
            : <><span className="material-symbols-outlined text-[18px]">save</span>{isEdit ? 'Guardar cambios' : 'Crear experiencia'}</>
          }
        </button>
        <a href="/admin/experience" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}
