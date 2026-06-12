'use client'

import { useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

interface SkillFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Record<string, any>
  isEdit?: boolean
}

const inputClass = 'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors'
const labelClass = 'block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2'

export default function SkillForm({ action, defaultValues = {}, isEdit = false }: SkillFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const formData = new FormData(e.currentTarget)
      await action(formData)
    } catch (err: any) {
      setError(err.message ?? 'Error al guardar')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Nombre *</label>
          <input name="label" required defaultValue={defaultValues.label ?? ''} placeholder="Figma" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Categoría</label>
          <input name="category" defaultValue={defaultValues.category ?? ''} placeholder="Design" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Porcentaje (0–100)</label>
          <input name="percentage" type="number" min={0} max={100} required
            defaultValue={defaultValues.percentage ?? 80} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Color (hex)</label>
          <input name="color" defaultValue={defaultValues.color ?? ''} placeholder="#4edea3" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Ícono</label>
        <ImageUpload
          name="icon_url"
          defaultValue={defaultValues.icon_url ?? ''}
          folder="skills"
          aspectClass="aspect-square"
        />
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant/60">
          Imagen cuadrada ~48×48px.
        </p>
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
            : <><span className="material-symbols-outlined text-[18px]">save</span>{isEdit ? 'Guardar cambios' : 'Crear habilidad'}</>
          }
        </button>
        <a href="/admin/skills" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}
