'use client'

import { useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

type Tab = 'hero' | 'icons' | 'contact' | 'footer' | 'brand'

interface FloatingIcon {
  id: string
  label: string
  svg: string
  color: string
  position: string
  delay: string
  size: string
}

interface FooterLink {
  label: string
  url: string
}

interface GeneralFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues: Record<string, any>
}

const inputClass = 'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/60 transition-colors'
const labelClass = 'block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'hero',    icon: 'person',       label: 'Hero'     },
  { id: 'icons',   icon: 'interests',    label: 'Iconos'   },
  { id: 'contact', icon: 'contact_page', label: 'Contacto' },
  { id: 'footer',  icon: 'link',         label: 'Footer'   },
  { id: 'brand',   icon: 'palette',      label: 'Marca'    },
]

export default function GeneralForm({ action, defaultValues }: GeneralFormProps) {
  const [tab, setTab] = useState<Tab>('hero')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  // Switch: mostrar letra vs foto
  const [showLetter, setShowLetter] = useState<boolean>(
    defaultValues.hero_show_letter !== false
  )

  // Floating icons state
  const [icons, setIcons] = useState<FloatingIcon[]>(
    Array.isArray(defaultValues.floating_icons) ? defaultValues.floating_icons : []
  )

  // Footer links state
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>(
    Array.isArray(defaultValues.footer_links) ? defaultValues.footer_links : []
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSaved(false)
    try {
      const formData = new FormData(e.currentTarget)
      formData.set('floating_icons', JSON.stringify(icons))
      formData.set('footer_links', JSON.stringify(footerLinks))
      formData.set('hero_show_letter', showLetter ? 'true' : 'false')
      await action(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message ?? 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  // Icon helpers
  const addIcon = () => setIcons((prev) => [...prev, { id: `icon-${Date.now()}`, label: '', svg: '', color: '#4edea3', position: 'top-[10%] left-[30%]', delay: '0s', size: 'w-10 h-10' }])
  const removeIcon = (i: number) => setIcons((prev) => prev.filter((_, j) => j !== i))
  const updateIcon = (i: number, key: keyof FloatingIcon, val: string) =>
    setIcons((prev) => prev.map((ic, j) => j === i ? { ...ic, [key]: val } : ic))

  // Footer link helpers
  const addLink = () => setFooterLinks((prev) => [...prev, { label: '', url: '' }])
  const removeLink = (i: number) => setFooterLinks((prev) => prev.filter((_, j) => j !== i))
  const updateLink = (i: number, key: keyof FooterLink, val: string) =>
    setFooterLinks((prev) => prev.map((lk, j) => j === i ? { ...lk, [key]: val } : lk))

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Tab bar */}
      <div className="flex gap-1 mb-8 bg-surface-container rounded-xl p-1.5 border border-white/5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-label-sm text-label-sm transition-colors ${
              tab === t.id
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB: HERO ── */}
      <div className={tab !== 'hero' ? 'hidden' : 'space-y-6'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Nombre *</label>
              <input name="hero_name" required defaultValue={defaultValues.hero_name ?? 'David Arias'} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Título *</label>
              <input name="hero_title" required defaultValue={defaultValues.hero_title ?? ''} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Biografía</label>
            <textarea name="hero_bio" rows={3} defaultValue={defaultValues.hero_bio ?? ''} className={inputClass} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Botón primario (CTA)</label>
              <input name="hero_cta_primary" defaultValue={defaultValues.hero_cta_primary ?? 'Contáctame'} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Botón secundario (CTA)</label>
              <input name="hero_cta_secondary" defaultValue={defaultValues.hero_cta_secondary ?? 'Descargar CV'} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>URL del CV (PDF)</label>
            <input name="hero_cv_url" type="url" defaultValue={defaultValues.hero_cv_url ?? ''} placeholder="https://..." className={inputClass} />
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-white/5 space-y-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Foto de perfil / Letra D</p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                role="switch"
                aria-checked={showLetter}
                onClick={() => setShowLetter((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  showLetter ? 'bg-primary' : 'bg-surface-container border border-white/20'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    showLetter ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span
                className="font-body-md text-body-md text-on-surface-variant cursor-pointer select-none"
                onClick={() => setShowLetter((v) => !v)}
              >
                Mostrar letra en lugar de foto
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Letra a mostrar</label>
                <input name="hero_letter" defaultValue={defaultValues.hero_letter ?? 'D'} maxLength={2} className={inputClass} placeholder="D" />
              </div>
            </div>

            <ImageUpload
              name="hero_profile_image_url"
              defaultValue={defaultValues.hero_profile_image_url ?? ''}
              folder="general"
              aspectClass="aspect-square"
              label="Foto de perfil (si no muestras la letra)"
            />
          </div>
      </div>

      {/* ── TAB: ICONOS FLOTANTES ── */}
      <div className={tab !== 'icons' ? 'hidden' : 'space-y-4'}>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Los iconos flotan alrededor del perfil en la sección Hero. Agrega SVG en formato HTML (no JSX).
          </p>

          {icons.length === 0 && (
            <div className="glass-panel rounded-xl p-8 text-center">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant/30 block mb-2">interests</span>
              <p className="font-body-md text-body-md text-on-surface-variant">No hay iconos configurados</p>
            </div>
          )}

          {icons.map((icon, i) => (
            <div key={icon.id} className="glass-panel rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Ícono #{i + 1} {icon.label && `— ${icon.label}`}</p>
                <button type="button" onClick={() => removeIcon(i)} className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Label / Nombre</label>
                  <input value={icon.label} onChange={(e) => updateIcon(i, 'label', e.target.value)} placeholder="Figma" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Color (hex)</label>
                  <div className="flex gap-2">
                    <input type="color" value={icon.color} onChange={(e) => updateIcon(i, 'color', e.target.value)}
                      className="w-12 h-12 rounded-lg border border-white/10 bg-surface-container cursor-pointer p-1" />
                    <input value={icon.color} onChange={(e) => updateIcon(i, 'color', e.target.value)} placeholder="#4edea3" className={`${inputClass} flex-1`} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Tamaño (Tailwind)</label>
                  <input value={icon.size} onChange={(e) => updateIcon(i, 'size', e.target.value)} placeholder="w-12 h-12" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Posición (Tailwind)</label>
                  <input value={icon.position} onChange={(e) => updateIcon(i, 'position', e.target.value)} placeholder="top-[5%] left-[30%]" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Delay animación</label>
                  <input value={icon.delay} onChange={(e) => updateIcon(i, 'delay', e.target.value)} placeholder="0s" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>SVG HTML</label>
                <textarea
                  value={icon.svg}
                  onChange={(e) => updateIcon(i, 'svg', e.target.value)}
                  rows={4}
                  placeholder={'<svg width="100%" height="100%" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>'}
                  className={`${inputClass} font-mono text-xs`}
                />
                {icon.svg && (
                  <div className="mt-2 flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center p-2"
                      style={{ color: icon.color }}
                      dangerouslySetInnerHTML={{ __html: icon.svg }}
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Vista previa</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button type="button" onClick={addIcon}
            className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container border border-white/10 rounded-xl font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Agregar ícono
          </button>
      </div>

      {/* ── TAB: CONTACTO ── */}
      <div className={tab !== 'contact' ? 'hidden' : 'space-y-6'}>
          <div>
            <label className={labelClass}>Email *</label>
            <input name="contact_email" type="email" required defaultValue={defaultValues.contact_email ?? 'devius123@gmail.com'} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Teléfono</label>
            <input name="contact_phone" type="tel" defaultValue={defaultValues.contact_phone ?? ''} placeholder="+57 300 000 0000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ubicación</label>
            <input name="contact_location" defaultValue={defaultValues.contact_location ?? 'Bogotá, Colombia'} className={inputClass} />
          </div>
      </div>

      {/* ── TAB: FOOTER ── */}
      <div className={tab !== 'footer' ? 'hidden' : 'space-y-6'}>
          <div>
            <label className={labelClass}>Texto de copyright</label>
            <input name="footer_copyright" defaultValue={defaultValues.footer_copyright ?? ''} placeholder="© 2025 David Arias. Todos los derechos reservados." className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Links del footer</label>
            <div className="space-y-3">
              {footerLinks.map((link, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={link.label}
                    onChange={(e) => updateLink(i, 'label', e.target.value)}
                    placeholder="LinkedIn"
                    className={`${inputClass} flex-1`}
                  />
                  <input
                    value={link.url}
                    onChange={(e) => updateLink(i, 'url', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className={`${inputClass} flex-1`}
                  />
                  <button type="button" onClick={() => removeLink(i)}
                    className="p-3 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}
              <button type="button" onClick={addLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container border border-white/10 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Agregar link
              </button>
            </div>
          </div>
      </div>

      {/* ── TAB: MARCA ── */}
      <div className={tab !== 'brand' ? 'hidden' : 'space-y-6'}>
          <div>
            <label className={labelClass}>Texto del logo (Navbar)</label>
            <input name="logo_text" defaultValue={defaultValues.logo_text ?? 'Devius'} className={inputClass} />
          </div>
          <ImageUpload
            name="logo_image_url"
            defaultValue={defaultValues.logo_image_url ?? ''}
            folder="general"
            aspectClass="aspect-[3/1]"
            label="Logo imagen (opcional — reemplaza el texto)"
          />
      </div>

      {/* Save bar */}
      <div className="flex items-center gap-4 pt-8 border-t border-white/5 mt-8">
        <button type="submit" disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary disabled:opacity-60">
          {loading
            ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Guardando...</>
            : <><span className="material-symbols-outlined text-[18px]">save</span>Guardar cambios</>
          }
        </button>
        {saved && (
          <p className="font-body-md text-body-md text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>Guardado correctamente
          </p>
        )}
        {error && (
          <p className="font-body-md text-body-md text-error flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>{error}
          </p>
        )}
      </div>
    </form>
  )
}
