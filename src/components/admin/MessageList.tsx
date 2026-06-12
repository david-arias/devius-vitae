'use client'

import { useState, useTransition } from 'react'
import { toggleMessageRead, deleteMessage } from '@/lib/actions/contact'

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  description: string
  read: boolean
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function MessageRow({ msg }: { msg: Message }) {
  const [read, setRead]       = useState(msg.read)
  const [open, setOpen]       = useState(false)
  const [pending, startTransition] = useTransition()

  const handleToggle = () => {
    const next = !read
    setRead(next)
    startTransition(() => toggleMessageRead(msg.id, !next))
  }

  const handleDelete = () => {
    if (!confirm(`¿Eliminar el mensaje de ${msg.name}?`)) return
    startTransition(() => deleteMessage(msg.id))
  }

  return (
    <div className={`border-b border-white/5 last:border-0 transition-colors ${read ? 'opacity-60' : ''}`}>
      {/* Row principal */}
      <div
        className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Indicador unread */}
        <div className="mt-1 shrink-0">
          {!read
            ? <span className="w-2 h-2 rounded-full bg-primary block mt-1" />
            : <span className="w-2 h-2 rounded-full bg-transparent block mt-1" />
          }
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-body-md text-body-md text-on-surface font-semibold truncate">{msg.name}</span>
            <a
              href={`mailto:${msg.email}`}
              onClick={(e) => e.stopPropagation()}
              className="font-body-sm text-body-sm text-primary hover:underline"
            >
              {msg.email}
            </a>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 truncate">{msg.subject}</p>
        </div>

        {/* Fecha + badge + acciones */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <span className="font-label-sm text-label-sm text-on-surface-variant hidden md:block">
            {formatDate(msg.created_at)}
          </span>

          <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm border ${
            read
              ? 'bg-surface-container text-on-surface-variant border-white/10'
              : 'bg-primary/10 text-primary border-primary/20'
          }`}>
            {read ? 'Contestado' : 'Pendiente'}
          </span>

          {/* Toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); handleToggle() }}
            disabled={pending}
            title={read ? 'Marcar como pendiente' : 'Marcar como contestado'}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">
              {read ? 'mark_email_unread' : 'mark_email_read'}
            </span>
          </button>

          {/* Delete */}
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete() }}
            disabled={pending}
            title="Eliminar mensaje"
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>

          {/* Chevron */}
          <span className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform ${open ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </div>
      </div>

      {/* Expandido */}
      {open && (
        <div className="px-6 pb-6 ml-6">
          <div className="glass-panel rounded-xl p-6 space-y-4">
            {msg.phone && (
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">call</span>
                <a href={`tel:${msg.phone}`} className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
                  {msg.phone}
                </a>
              </div>
            )}
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Mensaje</p>
              <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap leading-relaxed">
                {msg.description}
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 flex gap-3">
              <a
                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                onClick={() => { if (!read) { setRead(true); startTransition(() => toggleMessageRead(msg.id, false)) } }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary"
              >
                <span className="material-symbols-outlined text-[16px]">reply</span>
                Responder por email
              </a>
              {!read && (
                <button
                  onClick={handleToggle}
                  disabled={pending}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-on-surface-variant font-label-sm text-label-sm rounded-full hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Marcar como contestado
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface Props {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'read'>('all')

  const filtered = messages.filter((m) => {
    if (filter === 'pending') return !m.read
    if (filter === 'read')    return m.read
    return true
  })

  const pendingCount = messages.filter((m) => !m.read).length

  return (
    <div>
      {/* Filtros */}
      <div className="flex items-center gap-2 mb-6">
        {([
          { key: 'all',     label: 'Todos',      count: messages.length },
          { key: 'pending', label: 'Pendientes', count: pendingCount },
          { key: 'read',    label: 'Contestados', count: messages.length - pendingCount },
        ] as const).map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-label-sm text-label-sm transition-colors ${
              filter === key
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'border border-white/10 text-on-surface-variant hover:bg-white/5'
            }`}
          >
            {label}
            <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${
              filter === key ? 'bg-primary/20' : 'bg-surface-container'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-16 text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4 block">inbox</span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {filter === 'pending' ? 'No hay mensajes pendientes' : 'No hay mensajes aún'}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden">
          {filtered.map((msg) => (
            <MessageRow key={msg.id} msg={msg} />
          ))}
        </div>
      )}
    </div>
  )
}
