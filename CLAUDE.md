# devius-vitae — Proyecto CV Online de David Arias (Devius)

## Descripción
Sitio web de curriculum vitae y portafolio personal de David Arias, conocido como **Devius**.
Head UX/UI Designer & Frontend Developer con sede en Bogotá, Colombia.

## Stack Tecnológico
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Estilos:** Tailwind CSS con design tokens personalizados (ver design-system skill)
- **Base de datos / Auth:** Supabase (PostgreSQL + Auth + Storage)
- **Deploy:** Vercel (conectado a GitHub via CI/CD automático)
- **Repo:** https://github.com/david-arias/devius-vitae
- **Fuente:** Inter (Google Fonts)
- **Iconos:** Material Symbols Outlined

## Documentación de Sesión
Antes de empezar cualquier tarea no trivial, lee **`HANDOFF.md`** en la raíz del proyecto.
Contiene el estado actual del proyecto, qué está roto, qué se intentó y falló, y los próximos pasos exactos.
Al terminar una sesión con cambios relevantes, usa el agente `handoff-documenter` para actualizarlo.

## Estructura del Proyecto
```
devius-vitae/
├── CLAUDE.md
├── HANDOFF.md            ← Estado actual del proyecto (leer al inicio de cada sesión)
├── .claude/
│   ├── agents/           ← Agentes especializados por dominio
│   └── skills/           ← Skills reutilizables para tareas frecuentes
├── src/
│   ├── app/              ← Next.js App Router (páginas, layouts, rutas API)
│   ├── components/       ← Componentes React reutilizables
│   ├── lib/              ← Supabase client, utils, tipos
│   └── styles/           ← Globales CSS / Tailwind config
├── supabase/
│   └── migrations/       ← Migraciones SQL de Supabase
└── public/               ← Assets estáticos (imágenes, icons, CV PDF)
```

## Secciones del Sitio
1. **Hero** — Presentación con nombre, título, foto, iconos flotantes en órbita
2. **Servicios** — Cards con Diseño UX/UI, Desarrollo Frontend, IA, Diseño Gráfico
3. **Experiencia** — Timeline (Lentesplus, Devius freelance)
4. **Educación** — Timeline (Platzi/Udemy, Tadeo Lozano)
5. **Habilidades** — Skill rings SVG con porcentajes
6. **Portafolio** — Proyectos dinámicos desde Supabase
7. **Contacto** — Footer con formulario y datos de contacto

## Admin Panel (Supabase)
- Autenticación con Supabase Auth (solo David)
- Gestión de proyectos del portafolio (CRUD)
- Edición de datos del CV (experiencia, habilidades, info personal)
- Ruta: `/admin`

## Variables de Entorno Necesarias
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Convenciones
- Componentes en PascalCase
- Archivos de página: `page.tsx`, layouts: `layout.tsx`
- Usar design tokens de Tailwind (ver `.claude/skills/design-system/SKILL.md`)
- Español para contenido visible, inglés para código y nombres de variables
- Commits en inglés con prefijos: `feat:`, `fix:`, `style:`, `chore:`

## Agentes Disponibles
| Agente | Rol |
|--------|-----|
| `ui-developer` | Componentes, páginas, animaciones, responsive |
| `backend-developer` | Supabase, migraciones, API routes, server actions |
| `content-editor` | Actualiza contenido CV y portafolio |
| `devops` | Deploys Vercel, GitHub, CI/CD |
| `handoff-documenter` | Crea y actualiza `HANDOFF.md` al final de cada sesión |

## Skills Disponibles
| Skill | Cuándo usarla |
|-------|---------------|
| `design-system` | Referencia de colores, tipografía y componentes |
| `add-portfolio-project` | Agregar nuevo proyecto al portafolio |
| `create-cv-section` | Crear nueva sección en la página |
| `db-migration` | Crear/aplicar migración de Supabase |
| `update-cv-data` | Actualizar info personal, experiencia o skills |
| `deploy-preview` | Hacer deploy a Vercel y commit a GitHub |
| `handoff-documenter` | Documentar avance de sesión en `HANDOFF.md` |
