import { getContactMessages } from '@/lib/actions/contact'
import MessageList from '@/components/admin/MessageList'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  const messages = await getContactMessages()
  const pending  = messages.filter((m: any) => !m.read).length

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-3">
            Mensajes de contacto
            {pending > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
                {pending} pendiente{pending !== 1 ? 's' : ''}
              </span>
            )}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {messages.length} mensaje{messages.length !== 1 ? 's' : ''} en total
          </p>
        </div>
      </div>

      <MessageList messages={messages} />
    </div>
  )
}
