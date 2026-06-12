'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getServices() {
  const supabase = createClient()
  const { data, error } = await supabase.from('services').select('*').order('order_index')
  if (error) return []
  return data
}

export async function getService(id: string) {
  const supabase = createClient()
  const { data } = await supabase.from('services').select('*').eq('id', id).single()
  return data
}

export async function createService(formData: FormData) {
  const supabase = createClient()
  const featuresRaw = (formData.get('features') as string) ?? ''

  const { error } = await supabase.from('services').insert({
    title:       formData.get('title'),
    description: formData.get('description'),
    icon:        formData.get('icon')     || null,
    tags:        featuresRaw.split('\n').map((f) => f.trim()).filter(Boolean),
    featured:    formData.get('featured') === 'true',
    order_index: Number(formData.get('order_index') ?? 0),
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/')
  redirect('/admin/services')
}

export async function updateService(id: string, formData: FormData) {
  const supabase = createClient()
  const featuresRaw = (formData.get('features') as string) ?? ''

  const { error } = await supabase.from('services').update({
    title:       formData.get('title'),
    description: formData.get('description'),
    icon:        formData.get('icon')     || null,
    tags:        featuresRaw.split('\n').map((f) => f.trim()).filter(Boolean),
    featured:    formData.get('featured') === 'true',
    order_index: Number(formData.get('order_index') ?? 0),
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/')
  redirect('/admin/services')
}

export async function deleteService(id: string) {
  const supabase = createClient()
  await supabase.from('services').delete().eq('id', id)
  revalidatePath('/admin/services')
  revalidatePath('/')
}
