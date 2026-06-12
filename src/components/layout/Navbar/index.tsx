'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#inicio',      label: 'Inicio' },
  { href: '#servicios',   label: 'Servicios' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#portafolio',  label: 'Portafolio' },
  { href: '#contacto',    label: 'Contacto' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para sombra
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver para sección activa
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 shadow-[0_1px_20px_rgba(0,0,0,0.4)]' : 'bg-background/80'
      } backdrop-blur-xl border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop h-20 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => handleNavClick('#inicio')}
          className="font-headline-md text-headline-md font-bold text-on-surface hover:text-primary transition-colors"
        >
          Devius
        </button>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
              className={`nav-item font-body-md text-body-md transition-colors ${
                activeSection === href.replace('#', '')
                  ? 'active text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('#contacto')}
            className="hidden md:flex px-6 py-2 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors duration-200"
          >
            Contáctame
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-on-surface hover:text-primary transition-colors"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {mobileOpen ? 'close' : 'apps'}
            </span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-container-high border-t border-white/10 px-margin-mobile py-6 flex flex-col gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
              className={`text-left font-body-md text-body-md transition-colors py-2 ${
                activeSection === href.replace('#', '')
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contacto')}
            className="mt-2 px-6 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors duration-200 text-center"
          >
            Contáctame
          </button>
        </div>
      )}
    </nav>
  )
}
