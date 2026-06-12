'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getSkills() {
  const supabase = createClient()
  const { data, error } = await supabase.from('skills').select('*').order('order_index')
  if (error) return []
  return data
}

export async function getSkill(id: string) {
  const supabase = createClient()
  const { data } = await supabase.from('skills').select('*').eq('id', id).single()
  return data
}

export async function createSkill(formData: FormData) {
  const supabase = createClient()

  const { error } = await supabase.from('skills').insert({
    name:        formData.get('label'),
    percentage:  Number(formData.get('percentage') ?? 0),
    icon_url:    formData.get('icon_url')   || null,
    order_index: Number(formData.get('order_index') ?? 0),
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/skills')
  revalidatePath('/')
  redirect('/admin/skills')
}

export async function updateSkill(id: string, formData: FormData) {
  const supabase = createClient()

  const { error } = await supabase.from('skills').update({
    name:        formData.get('label'),
    percentage:  Number(formData.get('percentage') ?? 0),
    icon_url:    formData.get('icon_url')   || null,
    order_index: Number(formData.get('order_index') ?? 0),
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/skills')
  revalidatePath('/')
  redirect('/admin/skills')
}

export async function deleteSkill(id: string) {
  const supabase = createClient()
  await supabase.from('skills').delete().eq('id', id)
  revalidatePath('/admin/skills')
  revalidatePath('/')
}
