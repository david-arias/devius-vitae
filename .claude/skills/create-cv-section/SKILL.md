# Skill: Create CV Section

Flujo para agregar una nueva sección visual a la página principal del CV.

## Información que Necesitas Antes de Empezar
- **ID de la sección** (usado en el nav, ej: `#portafolio`)
- **Nombre visible** (ej: "Portafolio")
- **Tipo de layout**: cards grid / timeline / lista / hero / personalizado
- **¿Tiene datos dinámicos de Supabase?** → Si sí, involucra al agente `backend-developer`
- **¿Va en el nav?** → Si sí, actualizar la navegación

## Pasos

### 1. Crear el componente de la sección
```
src/components/[NombreSeccion]/
└── index.tsx
```

Estructura base:
```tsx
// src/components/NombreSeccion/index.tsx
import type { FC } from 'react'

interface NombreSeccionProps {
  // props si recibe datos externos
}

const NombreSeccion: FC<NombreSeccionProps> = () => {
  return (
    <section
      id="id-seccion"
      className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding"
    >
      {/* Header de sección */}
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
          Título de la Sección
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Subtítulo descriptivo
        </p>
      </div>

      {/* Contenido */}
    </section>
  )
}

export default NombreSeccion
```

### 2. Consultar el design system
Antes de estilizar, leer `.claude/skills/design-system/SKILL.md` para:
- Usar los tokens de color correctos
- Aplicar la tipografía adecuada
- Usar el componente correcto (GlassPanel, Timeline, SkillRing, etc.)

### 3. Agregar al layout principal
En `src/app/page.tsx`, importar y agregar la sección en el orden correcto:
```tsx
import NombreSeccion from '@/components/NombreSeccion'

// Dentro del <main>:
<NombreSeccion />
```

### 4. Actualizar la navegación (si aplica)
En el componente `Navbar`, agregar el link:
```tsx
<a
  className="nav-item text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors"
  href="#id-seccion"
>
  Nombre Sección
</a>
```

### 5. Si la sección necesita datos de Supabase
1. Coordinar con el agente `backend-developer` para crear la tabla/query necesaria
2. La sección puede ser un Server Component que hace el fetch directamente:
```tsx
// src/app/page.tsx o dentro del componente como Server Component
const data = await supabase.from('tabla').select('*')
```

### 6. Verificar responsividad
- Mobile: `px-margin-mobile` (16px laterales)
- Desktop: `md:px-margin-desktop` (80px laterales)
- Probar en breakpoints: 375px, 768px, 1280px, 1440px

## Orden actual de secciones
1. Hero (`#inicio`)
2. Servicios (`#servicios`)
3. Experiencia (`#experiencia`)
4. Habilidades (`#habilidades`)
5. Portafolio (`#portafolio`) ← por crear
6. Contacto (`#contacto`)
