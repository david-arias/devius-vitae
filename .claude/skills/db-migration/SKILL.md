# Skill: DB Migration (Supabase)

Flujo para crear y aplicar migraciones de base de datos en Supabase.

## Cuándo Usar Esta Skill
- Crear una nueva tabla
- Agregar/eliminar/modificar columnas
- Crear índices o políticas RLS
- Cambios en funciones o triggers SQL

## Convención de Nombres
```
YYYYMMDDHHMMSS_descripcion_corta.sql
Ejemplo: 20260519120000_create_projects_table.sql
```

## Pasos

### 1. Crear el archivo de migración
```
supabase/migrations/YYYYMMDDHHMMSS_descripcion.sql
```

### 2. Estructura del archivo SQL
```sql
-- Migración: descripción del cambio
-- Fecha: YYYY-MM-DD
-- Autor: Devius

-- === UP (aplicar cambio) ===

CREATE TABLE IF NOT EXISTS nombre_tabla (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columnas...
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS siempre
ALTER TABLE nombre_tabla ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public can read" ON nombre_tabla
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can write" ON nombre_tabla
  FOR ALL USING (auth.role() = 'authenticated');

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_nombre_tabla_campo ON nombre_tabla(campo);
```

### 3. Tablas del Proyecto (ya definidas)

#### `projects` — Portafolio
```sql
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  tags text[],
  image_url text,
  live_url text,
  github_url text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### `cv_data` — Datos del CV
```sql
CREATE TABLE cv_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL, -- 'personal', 'experience', 'education', 'skills', 'services'
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);
```

#### `contact_messages` — Mensajes de Contacto
```sql
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

### 4. Aplicar la migración

**Opción A — Supabase Dashboard (recomendado para producción)**
1. Ir a https://app.supabase.com → tu proyecto → SQL Editor
2. Pegar el contenido del archivo `.sql`
3. Ejecutar

**Opción B — Supabase CLI (desarrollo local)**
```bash
supabase db push
# o para migración específica:
supabase migration up
```

### 5. Generar tipos TypeScript después de migrar
```bash
supabase gen types typescript --project-id TU_PROJECT_ID > src/lib/supabase/types.ts
```

### 6. Verificar
- La tabla aparece en Supabase Dashboard → Table Editor
- Las políticas RLS están activas
- Los tipos TypeScript están actualizados

## Checklist de Seguridad
- [ ] RLS habilitado en la tabla
- [ ] Política de lectura pública (si aplica) explícitamente definida
- [ ] Escritura restringida a usuarios autenticados
- [ ] No hay datos sensibles en columnas sin RLS
- [ ] Índices creados para campos de búsqueda frecuente
