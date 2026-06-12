'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getEducationItems() {
  const supabase = createClient()
  const { data, error } = await supabase.from('education').select('*').order('order_index')
  if (error) return []
  return data
}

export async function getEducationItem(id: string) {
  const supabase = createClient()
  const { data } = await supabase.from('education').select('*').eq('id', id).single()
  return data
}

export async function createEducationItem(formData: FormData) {
  const supabase = createClient()
  const tagsRaw = (formData.get('tags') as string) ?? ''

  const { error } = await supabase.from('education').insert({
    institution: formData.get('institution'),
    degree:      formData.get('degree'),
    period:      formData.get('period'),
    description: formData.get('description'),
    tags:        tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
    order_index: Number(formData.get('order_index') ?? 0),
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/education')
  revalidatePath('/')
  redirect('/admin/education')
}

export async function updateEducationItem(id: string, formData: FormData) {
  const supabase = createClient()
  const tagsRaw = (formData.get('tags') as string) ?? ''

  const { error } = await supabase.from('education').update({
    institution: formData.get('institution'),
    degree:      formData.get('degree'),
    period:      formData.get('period'),
    description: formData.get('description'),
    tags:        tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
    order_index: Number(formData.get('order_index') ?? 0),
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/education')
  revalidatePath('/')
  redirect('/admin/education')
}

export async function deleteEducationItem(id: string) {
  const supabase = createClient()
  await supabase.from('education').delete().eq('id', id)
  revalidatePath('/admin/education')
  revalidatePath('/')
}
