import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { CVDocument } from '@/lib/pdf/CVDocument'
import { createClient } from '@/lib/supabase/server'

// Force Node.js runtime — react-pdf needs canvas/Node APIs, incompatible with Edge
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createClient()

    // Fetch everything in parallel
    const [
      settingsRes,
      experienceRes,
      educationRes,
      skillsRes,
      servicesRes,
      projectsRes,
    ] = await Promise.all([
      supabase.from('site_settings').select('*').single(),
      supabase.from('experience').select('*').order('order_index'),
      supabase.from('education').select('*').order('order_index'),
      supabase.from('skills').select('*').order('order_index'),
      supabase.from('services').select('*').order('order_index'),
      supabase
        .from('projects')
        .select('id, title, description, tags, live_url, year, featured')
        .eq('featured', true)
        .order('order_index')
        .limit(3),
    ])

    const settings   = settingsRes.data
    const experience = experienceRes.data  ?? []
    const education  = educationRes.data   ?? []
    const skills     = skillsRes.data      ?? []
    const services   = servicesRes.data    ?? []
    const projects   = projectsRes.data    ?? []

    // renderToBuffer requires a React element (not JSX)
    const element = createElement(CVDocument, {
      settings,
      experience,
      education,
      skills,
      services,
      projects,
    })

    const buffer = await renderToBuffer(element)

    const filename = `David-Arias-CV-${new Date().getFullYear()}.pdf`

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[/api/cv] Error generating PDF:', error)
    return new Response('Error generando el CV', { status: 500 })
  }
}
