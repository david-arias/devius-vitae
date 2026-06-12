'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/admin/general',    icon: 'tune',           label: 'General'     },
  { href: '/admin/projects',   icon: 'web',            label: 'Proyectos'   },
  { href: '/admin/skills',     icon: 'auto_awesome',   label: 'Habilidades' },
  { href: '/admin/experience', icon: 'work',           label: 'Experiencia' },
  { href: '/admin/education',  icon: 'school',         label: 'Educación'   },
  { href: '/admin/services',   icon: 'design_services',label: 'Servicios'   },
  { href: '/admin/messages',   icon: 'inbox',          label: 'Mensajes'    },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-64 shrink-0 bg-surface-container-lowest border-r border-white/5 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <Link href="/" target="_blank" className="flex items-center gap-2 group">
          <span className="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors">
            Devius
          </span>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
            Admin
          </span>
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-colors ${
                active
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <Link
          href="/admin/db-usage"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-colors ${
            pathname.startsWith('/admin/db-usage')
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">database</span>
          DB Usage
        </Link>
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          Ver sitio
        </Link>
        <button onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
