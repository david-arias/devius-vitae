'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001'

export async function getSettings() {
  const supabase = createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', SETTINGS_ID)
    .single()
  return data
}

export async function updateSettings(formData: FormData) {
  const supabase = createClient()

  const floatingIconsRaw = formData.get('floating_icons') as string
  const footerLinksRaw   = formData.get('footer_links')   as string

  let floating_icons = []
  let footer_links   = []

  try { floating_icons = JSON.parse(floatingIconsRaw || '[]') } catch {}
  try { footer_links   = JSON.parse(footerLinksRaw   || '[]') } catch {}

  const { error } = await supabase
    .from('site_settings')
    .update({
      hero_name:              formData.get('hero_name'),
      hero_title:             formData.get('hero_title'),
      hero_bio:               formData.get('hero_bio'),
      hero_cta_primary:       formData.get('hero_cta_primary'),
      hero_cta_secondary:     formData.get('hero_cta_secondary'),
      hero_cv_url:            formData.get('hero_cv_url')            || null,
      hero_profile_image_url: formData.get('hero_profile_image_url') || null,
      hero_show_letter:       formData.get('hero_show_letter') === 'true',
      hero_letter:            formData.get('hero_letter')            || 'D',
      floating_icons,
      contact_email:          formData.get('contact_email'),
      contact_phone:          formData.get('contact_phone')          || null,
      contact_location:       formData.get('contact_location'),
      footer_copyright:       formData.get('footer_copyright'),
      footer_links,
      logo_text:              formData.get('logo_text'),
      logo_image_url:         formData.get('logo_image_url')         || null,
    })
    .eq('id', SETTINGS_ID)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/admin/general')
}
