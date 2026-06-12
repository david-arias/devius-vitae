'use client'

import { useState } from 'react'

interface Props {
  variant?: 'navbar' | 'hero'
  label?: string
}

export default function DownloadCVButton({ variant = 'hero', label = 'Descargar CV' }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (loading) return
    setLoading(true)

    try {
      const res = await fetch('/api/cv')
      if (!res.ok) throw new Error('Error generando el PDF')

      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `David-Arias-CV-${new Date().getFullYear()}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'navbar') {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 text-primary font-label-sm text-label-sm hover:bg-primary/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
        ) : (
          <span className="material-symbols-outlined text-[14px]">download</span>
        )}
        {loading ? 'Generando...' : label}
      </button>
    )
  }

  // Hero variant — botón secundario
  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary font-label-sm text-label-sm rounded-full hover:bg-primary/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
          Generando PDF...
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          {label}
        </>
      )}
    </button>
  )
}
