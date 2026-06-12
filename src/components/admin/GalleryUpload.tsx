'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface GalleryUploadProps {
  name: string           // form field name — value is newline-separated URLs
  defaultValue?: string[] // current gallery URLs
  folder?: string
}

export default function GalleryUpload({
  name,
  defaultValue = [],
  folder = 'projects',
}: GalleryUploadProps) {
  const [urls, setUrls] = useState<string[]>(defaultValue.filter(Boolean))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    setUploading(true)
    setError('')

    try {
      const supabase = createClient()
      const uploaded: string[] = []

      for (const file of files) {
        const ext = file.name.split('.').pop() ?? 'jpg'
        const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(filename, file, { upsert: true })

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('portfolio').getPublicUrl(filename)
        uploaded.push(data.publicUrl)
      }

      setUrls((prev) => [...prev, ...uploaded])
    } catch (err: any) {
      setError(err.message ?? 'Error al subir imágenes')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const updateUrl = (index: number, value: string) => {
    setUrls((prev) => prev.map((u, i) => (i === index ? value : u)))
  }

  const removeUrl = (index: number) => {
    setUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const addEmpty = () => setUrls((prev) => [...prev, ''])

  return (
    <div className="space-y-3">
      {/* Hidden field with all URLs serialized */}
      <input type="hidden" name={name} value={urls.filter(Boolean).join('\n')} />

      {/* Preview grid */}
      {urls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {urls.map((url, i) => (
            <div key={i} className="relative group">
              {url && (
                <div className="aspect-video rounded-lg overflow-hidden bg-surface-container border border-white/10 mb-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex gap-1">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => updateUrl(i, e.target.value)}
                  placeholder="https://..."
                  className="flex-1 min-w-0 bg-surface-container border border-white/10 rounded-lg px-3 py-2 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeUrl(i)}
                  className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addEmpty}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container border border-white/10 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add_link</span>
          Agregar URL
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container border border-white/10 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
          )}
          {uploading ? 'Subiendo…' : 'Subir imágenes'}
        </button>
      </div>

      {error && (
        <p className="font-body-sm text-body-sm text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>{error}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  )
}
