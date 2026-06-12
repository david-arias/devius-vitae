# HANDOFF.md — devius-vitae

> Última actualización: 12 jun 2026 | Sesión: Cierre de gaps principales + mensajes admin + README + slug dinámico

---

## 1. Visión General del Proyecto

Sitio web de CV y portafolio personal de **David Arias (Devius)** — Head UX/UI Designer & Frontend Developer con sede en Bogotá, Colombia.

- **Propósito:** Presentar perfil profesional, portafolio de proyectos y permitir contacto directo con potenciales clientes y recruiters.
- **Audiencia:** Recruiters, clientes freelance, comunidad de diseño/desarrollo.
- **Enfoque visual:** Dark mode, glassmorphism, tokens Material Design 3, animaciones sutiles, paleta esmeralda.
- **Repo:** https://github.com/david-arias/devius-vitae
- **Deploy:** Vercel (CI/CD automático desde `main`)
- **Admin:** `/admin` — solo David, protegido con Supabase Auth

---

## 2. Stack Tecnológico

| Categoría | Tecnología | Versión | Motivo |
|-----------|-----------|---------|--------|
| Framework | Next.js (App Router) | 14.2.5 | SSR + Server Actions + file-based routing |
| Lenguaje | TypeScript | ^5 | Tipado estricto en acciones y componentes |
| Estilos | Tailwind CSS | ^3.4.1 | Design tokens personalizados, sin CSS adicional |
| Base de datos | Supabase (PostgreSQL) | ^2.44.2 | Auth + Storage + DB en uno, gratis para proyectos personales |
| SSR Auth | @supabase/ssr | ^0.4.0 | Cookies-based auth compatible con App Router |
| Email | Resend | ^3.2.0 | API gratuita (3k/mes), integración nativa con Next.js |
| Deploy | Vercel | — | CI/CD automático desde GitHub, edge functions |
| Fuente | Inter (Google Fonts) | — | Legibilidad en pantalla |
| Iconos | Material Symbols Outlined | — | Consistencia con MD3 |

---

## 3. Arquitectura y Estructura de Archivos

```
devius-vitae/
├── src/
│   ├── app/
│   │   ├── page.tsx                    ← Home: ensambla Hero + Services + Experience + Skills + Portfolio + Contact
│   │   ├── layout.tsx                  ← Root layout: metadata SEO, fuentes
│   │   ├── not-found.tsx               ← 404 con diseño del sistema
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx            ← Detalle de proyecto (async, Supabase + fallback estático)
│   │   │       └── loading.tsx         ← Skeleton mientras carga
│   │   └── admin/                      ← Panel admin (protegido por middleware)
│   │       ├── layout.tsx              ← Layout admin: Sidebar + main
│   │       ├── page.tsx                ← Redirect a /admin/general
│   │       ├── login/page.tsx
│   │       ├── general/page.tsx        ← Config Hero desde Supabase site_settings
│   │       ├── projects/               ← CRUD proyectos
│   │       ├── skills/                 ← CRUD habilidades
│   │       ├── experience/             ← CRUD experiencia
│   │       ├── education/              ← CRUD educación
│   │       ├── services/               ← CRUD servicios
│   │       ├── messages/               ← Bandeja de mensajes de contacto ← NUEVO
│   │       │   └── page.tsx
│   │       └── db-usage/page.tsx
│   ├── components/
│   │   ├── sections/                   ← Todos async (server components), con fallback a datos estáticos
│   │   │   ├── Hero/index.tsx          ← Supabase site_settings
│   │   │   ├── Services/index.tsx      ← Supabase services
│   │   │   ├── Experience/index.tsx    ← Supabase experience + education (Promise.all)
│   │   │   ├── Skills/index.tsx        ← Supabase skills
│   │   │   ├── Portfolio/index.tsx     ← Supabase projects
│   │   │   └── Contact/index.tsx       ← Client component, llama submitContactForm()
│   │   ├── admin/
│   │   │   ├── Sidebar/index.tsx       ← h-screen sticky, overflow-y-auto, 7 entradas nav
│   │   │   ├── GeneralForm.tsx         ← Switch toggle funcional (showLetter state), tabs con CSS hidden
│   │   │   ├── MessageList.tsx         ← Client component: filtros, toggle read, expand, delete ← NUEVO
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── SkillForm.tsx
│   │   │   ├── ServiceForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── ImageUpload.tsx         ← Supabase Storage
│   │   │   ├── GalleryUpload.tsx       ← Supabase Storage (múltiples)
│   │   │   └── DeleteButton.tsx        ← Client: confirm + server action
│   │   ├── layout/
│   │   │   └── Navbar/index.tsx        ← Fija, IntersectionObserver, menú móvil
│   │   └── ui/
│   │       └── SkillRing/index.tsx     ← SVG animado con porcentaje
│   ├── lib/
│   │   ├── actions/                    ← Server actions ('use server')
│   │   │   ├── general.ts              ← getSettings, updateSettings
│   │   │   ├── projects.ts             ← CRUD + getProjectBySlug ← NUEVO
│   │   │   ├── skills.ts               ← CRUD (columna: name, no label)
│   │   │   ├── services.ts             ← CRUD (columna: tags, no features)
│   │   │   ├── experience.ts           ← CRUD
│   │   │   ├── education.ts            ← CRUD
│   │   │   └── contact.ts              ← submitContactForm + getContactMessages + toggleMessageRead + deleteMessage ← ACTUALIZADO
│   │   ├── supabase/
│   │   │   ├── server.ts               ← createClient con cookies (SSR)
│   │   │   └── client.ts               ← createClient browser
│   │   ├── data/index.ts               ← Datos estáticos de fallback (nunca borrar)
│   │   └── types/index.ts              ← Tipos globales TypeScript
│   └── styles/globals.css
├── supabase/
│   └── migrations/
│       ├── 20260519000000_initial_schema.sql   ← projects, skills, services, experience, education, contact_messages
│       └── 20260519000001_site_settings.sql    ← site_settings (config del hero)
├── public/
├── CLAUDE.md                           ← Instrucciones para agentes IA (no borrar)
├── HANDOFF.md                          ← Este archivo
└── README.md                           ← Setup público ← CREADO ESTA SESIÓN
```

**Patrón de datos en secciones públicas:**
```tsx
// Todas las secciones usan este patrón — DB primero, fallback estático
const dbData = await getXxx()
const data = dbData.length > 0 ? dbData : staticFallback
```

---

## 4. Estado Actual del Desarrollo

### ✅ Funcional

**Sitio público:**
- Hero — nombre, título, bio, foto/letra, iconos flotantes desde Supabase `site_settings`
- Servicios — cards con ícono, descripción, tags desde Supabase `services`
- Experiencia & Educación — timelines desde Supabase `experience` + `education`
- Habilidades — SkillRings SVG desde Supabase `skills`
- Portafolio — grid featured/resto desde Supabase `projects`
- Detalle de proyecto `/projects/[slug]` — hero imagen, stats, descripción, galería, resultados, relacionados — **conectado a Supabase con fallback estático**
- Formulario de contacto — guarda en `contact_messages` + envía email vía Resend a `devius123@gmail.com`
- 404 page

**Panel admin `/admin`:**
- Login con Supabase Auth
- CRUD completo: Proyectos, Habilidades, Experiencia, Educación, Servicios
- Configuración General del Hero (con switch toggle funcional para mostrar letra vs foto)
- ImageUpload + GalleryUpload con Supabase Storage
- **Bandeja de Mensajes** — lista de contactos con filtros Todos/Pendientes/Contestados, toggle read, expandir mensaje completo, responder por email, eliminar
- DB Usage
- Sidebar fijo a 100vh independiente del contenido (h-screen + overflow-y-auto)
- Middleware de protección en `src/middleware.ts`

**Infraestructura:**
- Migraciones SQL en `supabase/migrations/`
- Design system completo en `tailwind.config.ts` + `.claude/skills/design-system/SKILL.md`
- README con instrucciones de setup local y deploy

### 🚧 En progreso / Pendiente próxima sesión

- **Imágenes reales** — todos los proyectos en `src/lib/data/index.ts` usan URLs de `placehold.co`. Hay que subir capturas reales desde `/admin/projects`.
- **Dominio de email Resend** — actualmente el `from` es `onboarding@resend.dev`. Una vez que David conecte su dominio en resend.com, cambiar por `hola@[dominio].com` en `src/lib/actions/contact.ts`.
- **Paso 4 del roadmap** (saltado intencionalmente): pendiente revisar en próxima sesión.

### ❌ Pendiente (no iniciado)

- Contenido real en DB — experiencia, educación, habilidades, servicios aún no se han cargado en Supabase (el sitio usa los datos estáticos de fallback)
- SEO avanzado (sitemap, robots.txt, og:image dinámica)
- Analytics

---

## 5. Decisiones de Diseño y Técnicas Clave

| Decisión | Qué se hizo | Por qué | Alternativa descartada |
|----------|-------------|---------|------------------------|
| **Tabs con CSS `hidden`** | En `GeneralForm.tsx`, los 5 tabs renderizan siempre; se ocultan con `hidden` | Si se usaba renderizado condicional (`{tab === 'x' && ...}`), los inputs de los tabs inactivos no existían en el DOM → FormData los ignoraba → columnas NOT NULL recibían `null` → crash en Supabase | Renderizado condicional (causaba el bug de `contact_email` NULL) |
| **Fallback a datos estáticos** | Todas las secciones públicas tienen `dbData.length > 0 ? dbData : staticData` | El sitio nunca rompe si Supabase está caído o la tabla está vacía | Romper con error si DB falla |
| **Resend para emails** | `src/lib/actions/contact.ts` usa el SDK de Resend | Gratis (3k/mes), zero-config en Next.js server actions, no requiere servidor SMTP | Nodemailer + Gmail (requiere configurar OAuth2 o app password) |
| **Estado optimista en toggle de mensajes** | `MessageList.tsx` actualiza el estado React localmente antes de que la server action responda | UX inmediata sin esperar round-trip a Supabase | Esperar revalidación (causaría flash/delay perceptible) |
| **`getProjectBySlug` separado de `getProject`** | Se añadió función nueva en `projects.ts` en lugar de modificar la existente | `getProject` recibe `id` (usado en admin), `getProjectBySlug` recibe `slug` (usado en el sitio público) — responsabilidades separadas | Modificar `getProject` para aceptar ambos (ambiguo) |
| **Sidebar `h-screen` + `overflow-y-auto`** | Reemplazó `min-h-screen` | `min-h-screen` hacía que el sidebar creciera con el contenido principal. `h-screen sticky top-0` lo fija exactamente al viewport | `position: fixed` (rompe el layout del flex container) |
| **`dynamic = 'force-dynamic'`** en admin | Páginas de admin no se cachean | El contenido del admin siempre debe ser fresco desde Supabase | Cache estático (mostraría datos desactualizados) |

---

## 6. Instrucciones de Setup

```bash
# 1. Clonar
git clone https://github.com/david-arias/devius-vitae.git
cd devius-vitae

# 2. Instalar dependencias
npm install

# 3. Variables de entorno
# Crear .env.local con:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_xxxxxxxxxxxx   # obtener en resend.com (gratis)

# 4. Base de datos — aplicar migraciones en Supabase SQL Editor en este orden:
#    supabase/migrations/20260519000000_initial_schema.sql
#    supabase/migrations/20260519000001_site_settings.sql

# 5. Correr en desarrollo
npm run dev
# → http://localhost:3000

# 6. Admin: crear usuario en Supabase Dashboard → Authentication → Users → Invite user
```

**Para Vercel:** Agregar las mismas variables en Settings → Environment Variables.

---

## 7. Próximos Pasos

### P1 — Contenido real (desbloquea el sitio en producción)

1. **Subir imágenes reales** desde `/admin/projects` — reemplaza los `placehold.co`
2. **Cargar datos en Supabase** — entrar al admin y llenar experiencia, educación, habilidades y servicios con la información real de David
3. **Verificar dominio en Resend** (resend.com → Domains) y actualizar `from:` en `src/lib/actions/contact.ts`

### P2 — Paso 4 del roadmap original (saltado)

4. *(revisar qué era el paso 4 — quedó pendiente por decisión del usuario)*

### P3 — Mejoras opcionales

5. **SEO:** agregar `sitemap.xml` dinámico y `robots.txt`
6. **og:image dinámica** para proyectos individuales con Next.js `ImageResponse`
7. **Analytics:** conectar Vercel Analytics o Plausible

---

## Contexto para la próxima sesión

- Todo el código fue escrito en TypeScript estricto sin `any` excepto donde Supabase devuelve `unknown`
- El design system está completamente documentado en `.claude/skills/design-system/SKILL.md` — leerlo antes de tocar estilos
- Los datos estáticos en `src/lib/data/index.ts` son el fallback de toda la app — **no borrarlos**
- El switch toggle de GeneralForm usa estado React (`showLetter`) + `formData.set()` en handleSubmit — el input hidden fue eliminado intencionalmente
- `contact_messages` tiene columna `description` (no `message`) — diferente al nombre del campo en el formulario
