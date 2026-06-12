'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getExperienceItems() {
  const supabase = createClient()
  const { data, error } = await supabase.from('experience').select('*').order('order_index')
  if (error) return []
  return data
}

export async function getExperienceItem(id: string) {
  const supabase = createClient()
  const { data } = await supabase.from('experience').select('*').eq('id', id).single()
  return data
}

export async function createExperienceItem(formData: FormData) {
  const supabase = createClient()
  const tagsRaw = (formData.get('tags') as string) ?? ''

  const { error } = await supabase.from('experience').insert({
    company:     formData.get('company'),
    role:        formData.get('role'),
    period:      formData.get('period'),
    description: formData.get('description'),
    tags:        tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
    current:     formData.get('current') === 'true',
    order_index: Number(formData.get('order_index') ?? 0),
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/experience')
  revalidatePath('/')
  redirect('/admin/experience')
}

export async function updateExperienceItem(id: string, formData: FormData) {
  const supabase = createClient()
  const tagsRaw = (formData.get('tags') as string) ?? ''

  const { error } = await supabase.from('experience').update({
    company:     formData.get('company'),
    role:        formData.get('role'),
    period:      formData.get('period'),
    description: formData.get('description'),
    tags:        tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
    current:     formData.get('current') === 'true',
    order_index: Number(formData.get('order_index') ?? 0),
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/experience')
  revalidatePath('/')
  redirect('/admin/experience')
}

export async function deleteExperienceItem(id: string) {
  const supabase = createClient()
  await supabase.from('experience').delete().eq('id', id)
  revalidatePath('/admin/experience')
  revalidatePath('/')
}
