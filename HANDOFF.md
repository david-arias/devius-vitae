# HANDOFF.md — devius-vitae

> Última actualización: 11 jun 2026 | Sesión: Animaciones Framer Motion + PDF CV + Loading screens + Admin skeletons

---

## 1. Visión General del Proyecto

Sitio web de CV y portafolio personal de **David Arias (Devius)** — Head UX/UI Designer & Frontend Developer con sede en Bogotá, Colombia.

- **Propósito:** Presentar perfil profesional, portafolio de proyectos y permitir contacto directo con potenciales clientes y recruiters.
- **Audiencia:** Recruiters, clientes freelance, comunidad de diseño/desarrollo.
- **Enfoque visual:** Dark mode, glassmorphism, tokens Material Design 3, animaciones Framer Motion, parallax, paleta esmeralda.
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
| Animaciones | Framer Motion | ^12.40.0 | Scroll-driven animations, parallax, stagger, whileInView |
| Base de datos | Supabase (PostgreSQL) | ^2.44.2 | Auth + Storage + DB en uno, gratis para proyectos personales |
| SSR Auth | @supabase/ssr | ^0.4.0 | Cookies-based auth compatible con App Router |
| Email | Resend | ^3.2.0 | API gratuita (3k/mes), integración nativa con Next.js |
| PDF generation | @react-pdf/renderer | ^4.3.0 | Generar CV PDF branded desde React con datos de Supabase |
| Deploy | Vercel | — | CI/CD automático desde GitHub, edge functions |
| Fuente | Inter (Google Fonts) | — | Legibilidad en pantalla |
| Iconos | Material Symbols Outlined | — | Consistencia con MD3 |

---

## 3. Arquitectura y Estructura de Archivos

```
devius-vitae/
├── src/
│   ├── app/
│   │   ├── page.tsx                    ← Home: secciones envueltas en <SectionReveal>
│   │   ├── layout.tsx                  ← Root layout: metadata SEO, fuentes
│   │   ├── not-found.tsx               ← 404 con diseño del sistema
│   │   ├── api/
│   │   │   └── cv/route.ts             ← GET: genera PDF desde Supabase + @react-pdf ← NUEVO
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx            ← Detalle proyecto (Supabase + fallback), usa ParallaxHero
│   │   │       └── loading.tsx         ← Full-screen branded loader (3 puntos + progress bar) ← NUEVO
│   │   └── admin/
│   │       ├── layout.tsx              ← Layout admin: Sidebar + main
│   │       ├── loading.tsx             ← Skeleton tabla — cubre TODOS los listados admin ← NUEVO
│   │       ├── page.tsx                ← Redirect a /admin/general
│   │       ├── login/page.tsx
│   │       ├── general/page.tsx
│   │       ├── messages/
│   │       │   ├── page.tsx            ← Bandeja de contactos
│   │       │   └── loading.tsx         ← Skeleton de cards ← NUEVO
│   │       ├── projects/
│   │       │   ├── page.tsx
│   │       │   ├── new/loading.tsx     ← AdminPageSkeleton ← NUEVO
│   │       │   └── [id]/loading.tsx    ← AdminPageSkeleton ← NUEVO
│   │       ├── experience/new/loading.tsx + [id]/loading.tsx  ← NUEVO
│   │       ├── education/new/loading.tsx + [id]/loading.tsx   ← NUEVO
│   │       ├── skills/new/loading.tsx + [id]/loading.tsx      ← NUEVO
│   │       ├── services/new/loading.tsx + [id]/loading.tsx    ← NUEVO
│   │       └── db-usage/page.tsx
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero/index.tsx          ← Server, sin wrapper (visible inmediatamente)
│   │   │   ├── Services/
│   │   │   │   ├── index.tsx           ← Server + ScrollReveal header + <ServicesGrid>
│   │   │   │   └── ServicesGrid.tsx    ← Client, stagger 0.1s, ServiceCard extraído aquí ← NUEVO
│   │   │   ├── Experience/index.tsx    ← Server + SectionReveal
│   │   │   ├── Skills/
│   │   │   │   ├── index.tsx           ← Server + ScrollReveal header + <SkillsGrid>
│   │   │   │   └── SkillsGrid.tsx      ← Client, stagger 0.07s, whileInView ← NUEVO
│   │   │   ├── Portfolio/
│   │   │   │   ├── index.tsx           ← Server + ScrollReveal + <PortfolioGrid>
│   │   │   │   └── PortfolioGrid.tsx   ← Client, stagger featured/resto separados ← NUEVO
│   │   │   └── Contact/index.tsx       ← Client component
│   │   ├── admin/
│   │   │   ├── Sidebar/index.tsx       ← 8 entradas (incluye Mensajes)
│   │   │   ├── GeneralForm.tsx         ← Switch toggle funcional
│   │   │   ├── MessageList.tsx         ← Filtros, toggle read optimista, expand, delete
│   │   │   ├── AdminPageSkeleton.tsx   ← Skeleton para páginas de formulario ← NUEVO
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── SkillForm.tsx
│   │   │   ├── ServiceForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── GalleryUpload.tsx
│   │   │   └── DeleteButton.tsx
│   │   ├── layout/
│   │   │   └── Navbar/index.tsx        ← Fija, IntersectionObserver, botón DownloadCVButton ← ACTUALIZADO
│   │   └── ui/
│   │       ├── SkillRing/index.tsx     ← SVG animado
│   │       ├── SectionReveal.tsx       ← Wrapper fade+slide 48px, whileInView, once ← NUEVO
│   │       ├── ScrollReveal.tsx        ← Reveal configurable: direction/distance/delay ← NUEVO
│   │       ├── ParallaxHero.tsx        ← Parallax para hero de proyectos: img 30%, content 15% ← NUEVO
│   │       └── DownloadCVButton.tsx    ← Client: fetch /api/cv → blob → descarga ← NUEVO
│   ├── lib/
│   │   ├── actions/
│   │   │   ├── general.ts
│   │   │   ├── projects.ts             ← + getProjectBySlug
│   │   │   ├── skills.ts
│   │   │   ├── services.ts
│   │   │   ├── experience.ts
│   │   │   ├── education.ts
│   │   │   └── contact.ts              ← submitContactForm + getContactMessages + toggleMessageRead + deleteMessage
│   │   ├── pdf/
│   │   │   └── CVDocument.tsx          ← PDF: sidebar oscuro + main blanco, datos desde Supabase ← NUEVO
│   │   ├── supabase/
│   │   │   ├── server.ts
│   │   │   └── client.ts
│   │   ├── data/index.ts               ← Fallback estático — NO BORRAR
│   │   └── types/index.ts
│   └── styles/globals.css
├── supabase/migrations/
├── next.config.mjs                     ← serverComponentsExternalPackages para @react-pdf ← ACTUALIZADO
├── package.json                        ← + framer-motion, resend, @react-pdf/renderer
├── CLAUDE.md
├── HANDOFF.md
└── README.md
```

**Patrón de datos en secciones públicas:**
```tsx
const dbData = await getXxx()
const data = dbData.length > 0 ? dbData : staticFallback
```

**Patrón server component + cliente para animaciones:**
```tsx
// Server component: fetcha datos, pasa como props
// Client sub-component: recibe datos, aplica Framer Motion
// Funciona porque React permite pasar server output como children a client components
```

---

## 4. Estado Actual del Desarrollo

### ✅ Funcional

**Sitio público:**
- Hero — nombre, título, bio, foto/letra, iconos flotantes desde `site_settings`
- Servicios — cards con stagger animation desde Supabase `services`
- Experiencia & Educación — timelines desde Supabase
- Habilidades — SkillRings SVG con stagger desde Supabase `skills`
- Portafolio — grid con stagger featured/resto desde Supabase `projects`
- Detalle de proyecto `/projects/[slug]` — Supabase + fallback estático, con **parallax hero**
- Formulario de contacto — guarda en `contact_messages` + envía email vía Resend
- 404 page
- **Animaciones scroll-driven** en todas las secciones (SectionReveal / ScrollReveal / stagger grids)
- **Loading screen full-screen** al navegar a proyectos (wordmark + 3 puntos + progress bar)
- **Botón "Descargar CV"** en Navbar — genera PDF branded on-demand desde datos de Supabase

**Panel admin `/admin`:**
- Login con Supabase Auth
- CRUD completo: Proyectos, Habilidades, Experiencia, Educación, Servicios
- Configuración General del Hero
- ImageUpload + GalleryUpload con Supabase Storage
- Bandeja de Mensajes con filtros, toggle read optimista, responder, eliminar
- **Skeleton loaders** en todas las rutas admin (listados, formularios new/edit, mensajes)
- DB Usage

**Infraestructura:**
- Migraciones SQL en `supabase/migrations/`
- Design system completo en `tailwind.config.ts`
- `next.config.mjs` con `serverComponentsExternalPackages: ['@react-pdf/renderer']`
- README con instrucciones de setup

### 🚧 Pendiente próxima sesión

- **Imágenes reales** — proyectos usan `placehold.co`. Subir desde `/admin/projects`.
- **Dominio de email Resend** — `from` usa `onboarding@resend.dev`. Actualizar en `src/lib/actions/contact.ts` tras verificar dominio en resend.com.
- **`npm install` local** — el usuario debe correr esto para instalar `framer-motion` y `@react-pdf/renderer`.

### ❌ Pendiente (no iniciado)

- Contenido real en DB — experiencia, educación, habilidades, servicios usan fallback estático
- Paso 4 del roadmap original (saltado intencionalmente por el usuario)
- SEO avanzado (sitemap, robots.txt, og:image dinámica)
- Analytics

---

## 5. Decisiones de Diseño y Técnicas Clave

| Decisión | Qué se hizo | Por qué | Alternativa descartada |
|----------|-------------|---------|------------------------|
| **Tabs con CSS `hidden`** | En `GeneralForm.tsx`, los 5 tabs renderizan siempre | Si se renderizaba condicionalmente, los inputs de tabs inactivos no existían en el DOM → FormData los ignoraba → columnas NOT NULL recibían `null` → crash en Supabase | Renderizado condicional |
| **Fallback a datos estáticos** | `dbData.length > 0 ? dbData : staticData` en todas las secciones | El sitio nunca rompe si Supabase está caído o la tabla está vacía | Romper con error si DB falla |
| **Resend para emails** | SDK en server action | Gratis 3k/mes, zero-config con Next.js | Nodemailer + Gmail (requiere OAuth2) |
| **Estado optimista en toggle de mensajes** | `MessageList.tsx` actualiza estado React antes de que responda la server action | UX inmediata sin flash/delay | Esperar revalidación |
| **Server component + client grid** | Server components fetchan datos y pasan props a sub-componentes client con Framer Motion | No se puede usar `'use client'` en componentes async de servidor. React permite pasar output de server component como `children` a client components | Convertir toda la sección a client (pierde SSR) |
| **SectionReveal como wrapper** | Componente client que acepta `children` | Permite animar cualquier bloque sin convertirlo a client component | Añadir animaciones directamente en cada sección |
| **ParallaxHero con escala 1.15** | Imagen del hero de proyecto se escala al 115% | Evita barras negras al desplazarse el parallax: la imagen tiene margen suficiente en los bordes | Sin escala (aparecen bordes vacíos al scroll) |
| **@react-pdf en Node.js runtime** | `export const runtime = 'nodejs'` en `/api/cv/route.ts` + `serverComponentsExternalPackages` en `next.config.mjs` | `@react-pdf/renderer` usa APIs de Node exclusivas, incompatible con Edge runtime | Edge runtime (crashea) |
| **Fuente Helvetica en PDF** | CVDocument usa Helvetica (built-in en react-pdf) | Evita fetch de fuentes externas en serverless → evita timeout. Inter requeriría un archivo TTF estático | Registrar Inter como fuente custom |
| **DownloadCVButton: fetch + blob** | El botón llama a `/api/cv`, convierte a blob y dispara descarga programática | La API devuelve `Content-Disposition: attachment` pero el browser no la intercepta en `fetch` — hay que crear el `<a>` manualmente | Enlace `<a href="/api/cv">` directo (funciona pero sin estado de loading) |
| **`loading.tsx` en admin layout** | Un solo `src/app/admin/loading.tsx` cubre todas las rutas listado | Next.js propaga el loading del segmento padre a todos los hijos que no tengan el suyo propio. El sidebar del layout permanece visible | Un loading.tsx por cada página (duplicación) |
| **AdminPageSkeleton reutilizable** | Componente extraído, usado por todos los `new/loading.tsx` y `[id]/loading.tsx` | Formularios tienen estructura homogénea (header + campos + botón). Un solo componente evita duplicar el skeleton | Inline en cada loading.tsx |
| **Sidebar `h-screen` + `overflow-y-auto`** | Reemplazó `min-h-screen` | `min-h-screen` crecía con el contenido principal. `h-screen sticky top-0` lo fija al viewport | `position: fixed` (rompe el flex container) |
| **`dynamic = 'force-dynamic'`** en admin | Páginas de admin no se cachean | Siempre datos frescos desde Supabase | Cache estático (datos desactualizados) |

---

## 6. Instrucciones de Setup

```bash
# 1. Clonar
git clone https://github.com/david-arias/devius-vitae.git
cd devius-vitae

# 2. Instalar dependencias (incluye framer-motion y @react-pdf/renderer)
npm install

# 3. Variables de entorno
# Crear .env.local con:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_xxxxxxxxxxxx   # obtener en resend.com (gratis)

# 4. Base de datos — aplicar migraciones en Supabase SQL Editor en orden:
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

1. **`npm install`** — correr localmente para instalar framer-motion + @react-pdf/renderer
2. **Subir imágenes reales** desde `/admin/projects` — reemplaza los `placehold.co`
3. **Cargar datos en Supabase** — llenar experiencia, educación, habilidades y servicios desde el admin con la información real de David
4. **Verificar dominio en Resend** (resend.com → Domains) y actualizar `from:` en `src/lib/actions/contact.ts`

### P2 — Paso 4 del roadmap original (pendiente)

5. *(El usuario saltó este paso intencionalmente — revisar en próxima sesión)*

### P3 — Mejoras opcionales

6. **SEO:** `sitemap.xml` dinámico y `robots.txt`
7. **og:image dinámica** para proyectos con Next.js `ImageResponse`
8. **Analytics:** Vercel Analytics o Plausible
9. **PDF mejorado:** Registrar fuente Inter como TTF para igualar tipografía del sitio

---

## Contexto para la próxima sesión

- **Nunca tocar `src/lib/data/index.ts`** — es el fallback de toda la app pública
- El design system está en `.claude/skills/design-system/SKILL.md` — leerlo antes de tocar estilos
- `contact_messages` tiene columna `description` (no `message`) — nombre diferente al campo del formulario
- El switch toggle de GeneralForm usa estado React + `formData.set()` en handleSubmit — no hay input hidden
- Framer Motion: `SectionReveal` (fade+slide general) vs `ScrollReveal` (configurable) vs `ParallaxHero` (scroll-driven para heroes de proyecto). Los grids (`SkillsGrid`, `ServicesGrid`, `PortfolioGrid`) tienen stagger propio
- `/api/cv` requiere `runtime = 'nodejs'` — no mover a Edge ni a middleware
- Git: David hace los commits y pushes él mismo — nunca correr comandos git en bash
