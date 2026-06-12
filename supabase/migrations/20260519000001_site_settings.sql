-- ============================================================
-- Site Settings: configuración general del sitio
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Hero
  hero_name        text NOT NULL DEFAULT 'David Arias',
  hero_title       text NOT NULL DEFAULT 'Head UX/UI Designer & Frontend Developer',
  hero_bio         text NOT NULL DEFAULT 'Combino conocimiento técnico en React, sentido estético y herramientas de Inteligencia Artificial para crear experiencias de usuario excepcionales y optimizar el desarrollo.',
  hero_cta_primary text NOT NULL DEFAULT 'Contáctame',
  hero_cta_secondary text NOT NULL DEFAULT 'Descargar CV',
  hero_cv_url      text,
  hero_profile_image_url text,
  hero_show_letter boolean NOT NULL DEFAULT true,
  hero_letter      text NOT NULL DEFAULT 'D',
  -- Floating icons (array of {id, label, svg, color, position, delay, size})
  floating_icons   jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Contact info
  contact_email    text NOT NULL DEFAULT 'devius123@gmail.com',
  contact_phone    text,
  contact_location text NOT NULL DEFAULT 'Bogotá, Colombia',
  -- Footer
  footer_copyright text NOT NULL DEFAULT '© 2025 David Arias (Devius). Todos los derechos reservados.',
  footer_links     jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Logo / Navbar
  logo_text        text NOT NULL DEFAULT 'Devius',
  logo_image_url   text,
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Only one row allowed — insert default if not exists
INSERT INTO site_settings (id)
VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS site_settings_updated_at ON site_settings;
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_site_settings_updated_at();

-- RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings_public_read"  ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_auth_write"   ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================
-- Supabase Storage: bucket 'portfolio'
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT DO NOTHING;

-- RLS on storage objects
CREATE POLICY "portfolio_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "portfolio_auth_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND (SELECT auth.role()) = 'authenticated');

CREATE POLICY "portfolio_auth_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'portfolio' AND (SELECT auth.role()) = 'authenticated');

CREATE POLICY "portfolio_auth_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio' AND (SELECT auth.role()) = 'authenticated');
