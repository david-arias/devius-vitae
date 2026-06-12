'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      setLoading(false)
    } else {
      router.push('/admin/projects')
      router.refresh()
    }
  }

  const inputClass = 'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors'

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      {/* Glow */}
      <div className="absolute w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', top: '30%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface mb-1">Devius <span className="text-primary">Admin</span></h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Ingresa con tu cuenta de Supabase</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-5">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="devius123@gmail.com" required className={inputClass} />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required className={inputClass} />
          </div>

          {error && (
            <p className="font-body-md text-body-md text-error flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>{error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary disabled:opacity-60">
            {loading
              ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Ingresando...</>
              : <><span className="material-symbols-outlined text-[18px]">login</span>Ingresar</>
            }
          </button>
        </form>
      </div>
    </div>
  )
}
