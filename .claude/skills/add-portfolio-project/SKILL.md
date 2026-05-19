# Skill: Add Portfolio Project

Flujo completo para agregar un nuevo proyecto al portafolio de devius-vitae.

## Información que Necesitas Antes de Empezar
Pregunta al usuario si no tiene estos datos:
- **Título** del proyecto
- **Descripción** corta (2-3 oraciones)
- **Tags** (tecnologías usadas, ej: React, Figma, Supabase)
- **URL en vivo** (si existe)
- **URL de GitHub** (si es público)
- **Imagen** del proyecto (URL o archivo)
- **¿Es destacado?** (`featured: true` para aparecer primero)

## Pasos

### 1. Verificar que la tabla `projects` existe en Supabase
Si no existe, usa la skill `db-migration` para crearla con este schema:
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
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth write" ON projects FOR ALL USING (auth.role() = 'authenticated');
```

### 2. Subir imagen (si es archivo local)
Si el usuario proporciona un archivo de imagen:
1. Súbela a Supabase Storage bucket `project-images`
2. Obtén la URL pública
3. Usa esa URL como `image_url`

### 3. Insertar en Supabase
Via el panel admin en `/admin/projects/new` O directamente:
```typescript
const { data, error } = await supabase
  .from('projects')
  .insert({
    title: 'Nombre del Proyecto',
    description: 'Descripción del proyecto...',
    tags: ['React', 'TypeScript', 'Tailwind'],
    image_url: 'https://...',
    live_url: 'https://...',
    github_url: 'https://github.com/...',
    featured: false,
    order_index: 0
  })
```

### 4. Verificar en el sitio
- En desarrollo: `http://localhost:3000/#portafolio`
- Confirmar que la card aparece con la info correcta

### 5. Si el proyecto es destacado
Asegúrate de que `featured: true` y que `order_index` esté configurado para que aparezca en la posición deseada.

## Notas
- `order_index` menor = aparece primero
- Los `tags` son un array de strings — aparecen como badges en la card
- Si no hay `image_url`, el componente debe mostrar un placeholder visual
