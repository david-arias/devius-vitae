'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getProjects() {
  const supabase = createClient()
  const { data, error } = await supabase.from('projects').select('*').order('order_index')
  if (error) return []
  return data
}

export async function getProject(id: string) {
  const supabase = createClient()
  const { data } = await supabase.from('projects').select('*').eq('id', id).single()
  return data
}

export async function getProjectBySlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase.from('projects').select('*').eq('slug', slug).single()
  return data ?? null
}

export async function createProject(formData: FormData) {
  const supabase = createClient()
  const tagsRaw  = (formData.get('tags') as string) ?? ''
  const galleryRaw = (formData.get('gallery_images') as string) ?? ''

  const { error } = await supabase.from('projects').insert({
    slug:             (formData.get('slug')             as string).trim().toLowerCase().replace(/\s+/g, '-'),
    title:            formData.get('title'),
    description:      formData.get('description'),
    full_description: formData.get('full_description'),
    tags:             tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
    image_url:        formData.get('image_url') || null,
    gallery_images:   galleryRaw.split('\n').map((u) => u.trim()).filter(Boolean),
    live_url:         formData.get('live_url')   || null,
    github_url:       formData.get('github_url') || null,
    featured:         formData.get('featured') === 'true',
    order_index:      Number(formData.get('order_index') ?? 0),
    year:             formData.get('year')     || null,
    role:             formData.get('role')     || null,
    duration:         formData.get('duration') || null,
    challenge:        formData.get('challenge')|| null,
    solution:         formData.get('solution') || null,
    results:          formData.get('results')  || null,
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = createClient()
  const tagsRaw    = (formData.get('tags')          as string) ?? ''
  const galleryRaw = (formData.get('gallery_images')as string) ?? ''

  const { error } = await supabase.from('projects').update({
    slug:             (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-'),
    title:            formData.get('title'),
    description:      formData.get('description'),
    full_description: formData.get('full_description'),
    tags:             tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
    image_url:        formData.get('image_url')  || null,
    gallery_images:   galleryRaw.split('\n').map((u) => u.trim()).filter(Boolean),
    live_url:         formData.get('live_url')   || null,
    github_url:       formData.get('github_url') || null,
    featured:         formData.get('featured') === 'true',
    order_index:      Number(formData.get('order_index') ?? 0),
    year:             formData.get('year')     || null,
    role:             formData.get('role')     || null,
    duration:         formData.get('duration') || null,
    challenge:        formData.get('challenge')|| null,
    solution:         formData.get('solution') || null,
    results:          formData.get('results')  || null,
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}

export async function deleteProject(id: string) {
  const supabase = createClient()
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/')
}
