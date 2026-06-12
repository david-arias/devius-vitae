'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ImageUploadProps {
  name: string           // form field name (submitted with the form)
  defaultValue?: string  // current URL
  folder?: string        // subfolder in 'portfolio' bucket
  label?: string
  aspectClass?: string   // e.g. 'aspect-video', 'aspect-square'
}

export default function ImageUpload({
  name,
  defaultValue = '',
  folder = 'general',
  label,
  aspectClass = 'aspect-video',
}: ImageUploadProps) {
  const [url, setUrl] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop() ?? 'jpg'
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filename, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filename)
      setUrl(data.publicUrl)
    } catch (err: any) {
      setError(err.message ?? 'Error al subir la imagen')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      {label && (
        <p className="block font-label-sm text-label-sm text-on-surface-variant uppercase">{label}</p>
      )}

      {/* Preview */}
      {url && (
        <div className={`relative w-full ${aspectClass} max-w-xs rounded-xl overflow-hidden bg-surface-container border border-white/10`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => setUrl('')}
            className="absolute top-2 right-2 p-1 rounded-full bg-background/80 text-on-surface hover:bg-error/20 hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://... o usa el botón para subir →"
          className="flex-1 bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-surface-container border border-white/10 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {uploading ? (
            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[18px]">upload</span>
          )}
          {uploading ? 'Subiendo…' : 'Subir'}
        </button>
      </div>

      {error && (
        <p className="font-body-sm text-body-sm text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>{error}
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  )
}
