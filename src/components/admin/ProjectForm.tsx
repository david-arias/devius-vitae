'use client'

import { useRef, useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'
import GalleryUpload from '@/components/admin/GalleryUpload'

interface ProjectFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Record<string, any>
  isEdit?: boolean
}

const inputClass = 'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors'
const labelClass = 'block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2'

export default function ProjectForm({ action, defaultValues = {}, isEdit = false }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Row: title + slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Título *</label>
          <input name="title" required defaultValue={defaultValues.title ?? ''} placeholder="Mi Proyecto" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input name="slug" required defaultValue={defaultValues.slug ?? ''} placeholder="mi-proyecto" className={inputClass} />
          <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant/60">URL: /projects/mi-proyecto</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Descripción corta *</label>
        <textarea name="description" required rows={2} defaultValue={defaultValues.description ?? ''}
          placeholder="Breve descripción del proyecto..." className={inputClass} />
      </div>

      {/* Full description */}
      <div>
        <label className={labelClass}>Descripción completa</label>
        <textarea name="full_description" rows={4} defaultValue={defaultValues.full_description ?? ''}
          placeholder="Descripción detallada del proyecto..." className={inputClass} />
      </div>

      {/* Row: year + role + duration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>Año</label>
          <input name="year" defaultValue={defaultValues.year ?? ''} placeholder="2025" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Rol</label>
          <input name="role" defaultValue={defaultValues.role ?? ''} placeholder="UX/UI Designer" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Duración</label>
          <input name="duration" defaultValue={defaultValues.duration ?? ''} placeholder="3 meses" className={inputClass} />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass}>Tags (separados por coma)</label>
        <input name="tags" defaultValue={(defaultValues.tags ?? []).join(', ')}
          placeholder="Figma, Next.js, Tailwind CSS" className={inputClass} />
      </div>

      {/* Image URL */}
      <div>
        <label className={labelClass}>Imagen principal</label>
        <ImageUpload
          name="image_url"
          defaultValue={defaultValues.image_url ?? ''}
          folder="projects"
          aspectClass="aspect-video"
        />
      </div>

      {/* Gallery */}
      <div>
        <label className={labelClass}>Galería de imágenes</label>
        <GalleryUpload
          name="gallery_images"
          defaultValue={defaultValues.gallery_images ?? []}
          folder="projects"
        />
      </div>

      {/* Row: live_url + github_url */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>URL Live</label>
          <input name="live_url" type="url" defaultValue={defaultValues.live_url ?? ''} placeholder="https://mi-proyecto.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>URL GitHub</label>
          <input name="github_url" type="url" defaultValue={defaultValues.github_url ?? ''} placeholder="https://github.com/usuario/repo" className={inputClass} />
        </div>
      </div>

      {/* Challenge / Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Desafío</label>
          <textarea name="challenge" rows={3} defaultValue={defaultValues.challenge ?? ''}
            placeholder="El principal reto fue..." className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Solución</label>
          <textarea name="solution" rows={3} defaultValue={defaultValues.solution ?? ''}
            placeholder="La solución implementada..." className={inputClass} />
        </div>
      </div>

      {/* Results */}
      <div>
        <label className={labelClass}>Resultados</label>
        <textarea name="results" rows={2} defaultValue={defaultValues.results ?? ''}
          placeholder="Aumento del 30% en conversiones..." className={inputClass} />
      </div>

      {/* Row: order_index + featured */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Orden</label>
          <input name="order_index" type="number" min={0} defaultValue={defaultValues.order_index ?? 0} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>¿Destacado?</label>
          <select name="featured" defaultValue={defaultValues.featured ? 'true' : 'false'} className={inputClass}>
            <option value="false">No</option>
            <option value="true">Sí — aparece en la sección principal</option>
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
            : <><span className="material-symbols-outlined text-[18px]">save</span>{isEdit ? 'Guardar cambios' : 'Crear proyecto'}</>
          }
        </button>
        <a href="/admin/projects" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}
