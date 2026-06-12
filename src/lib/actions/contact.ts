'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = 'devius123@gmail.com'

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  description: string
}

export type ContactResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContactForm(
  payload: ContactPayload
): Promise<ContactResult> {
  const { name, email, phone, subject, description } = payload

  // Basic validation
  if (!name.trim() || !email.trim() || !subject.trim() || !description.trim()) {
    return { success: false, error: 'Campos requeridos vacíos.' }
  }

  // 1. Save to Supabase
  try {
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({ name, email, phone: phone || null, subject, description })

    if (dbError) {
      console.error('[contact] DB insert error:', dbError.message)
      // Don't block the flow — still try to send email
    }
  } catch (err) {
    console.error('[contact] Supabase error:', err)
  }

  // 2. Send email via Resend
  if (!process.env.RESEND_API_KEY) {
    console.warn('[contact] RESEND_API_KEY not set — skipping email send')
    return { success: true }
  }

  try {
    const { error: emailError } = await resend.emails.send({
      from: 'Devius Portfolio <onboarding@resend.dev>',
      to: [TO_EMAIL],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
            Nuevo mensaje de contacto
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 100px;"><strong>Nombre</strong></td>
              <td style="padding: 8px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td>
              <td style="padding: 8px 0; color: #111827;">
                <a href="mailto:${email}" style="color: #10b981;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Teléfono</strong></td>
              <td style="padding: 8px 0; color: #111827;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Asunto</strong></td>
              <td style="padding: 8px 0; color: #111827;">${subject}</td>
            </tr>
          </table>
          <div style="background: #f9fafb; border-left: 3px solid #10b981; padding: 16px; border-radius: 4px; margin: 16px 0;">
            <p style="margin: 0; color: #374151; white-space: pre-wrap;">${description}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            Este mensaje fue enviado desde tu portafolio devius-vitae.
          </p>
        </div>
      `,
    })

    if (emailError) {
      console.error('[contact] Resend error:', emailError)
      // Message was saved to DB, so still return success
    }
  } catch (err) {
    console.error('[contact] Email send error:', err)
  }

  return { success: true }
}

// ─── Admin actions ───────────────────────────────────────────────────────────

export async function getContactMessages() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data
}

export async function toggleMessageRead(id: string, currentRead: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: !currentRead })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/messages')
}

export async function deleteMessage(id: string) {
  const supabase = createClient()
  await supabase.from('contact_messages').delete().eq('id', id)
  revalidatePath('/admin/messages')
}
