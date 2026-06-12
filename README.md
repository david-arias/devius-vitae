# devius-vitae

Sitio web personal de David Arias — **Head UX/UI Designer & Frontend Developer**. CV interactivo + portafolio + panel de administración, todo gestionado desde Supabase sin tocar código.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Vercel

---

## Secciones del sitio

| Sección | Ruta | Datos |
|---------|------|-------|
| Hero | `/#hero` | Supabase (`site_settings`) |
| Servicios | `/#servicios` | Supabase (`services`) |
| Experiencia & Educación | `/#experiencia` | Supabase (`experience`, `education`) |
| Habilidades | `/#habilidades` | Supabase (`skills`) |
| Portafolio | `/#portafolio` | Supabase (`projects`) |
| Detalle de proyecto | `/projects/[slug]` | Supabase |
| Contacto | `/#contacto` | Supabase (`contact_messages`) + Resend |
| Admin | `/admin` | Supabase Auth |

---

## Setup local

### 1. Requisitos

- Node.js 18+
- Una cuenta en [Supabase](https://supabase.com) (gratis)
- Una cuenta en [Resend](https://resend.com) (gratis, para el formulario de contacto)

### 2. Clonar e instalar

```bash
git clone https://github.com/david-arias/devius-vitae.git
cd devius-vitae
npm install
```

### 3. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase — encontrar en Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend — encontrar en resend.com/api-keys (solo para envío de emails)
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### 4. Base de datos

Aplica las migraciones en el orden indicado desde el dashboard de Supabase (SQL Editor):

```
supabase/migrations/20260519000000_initial_schema.sql
supabase/migrations/20260519000001_site_settings.sql
```

O con la CLI de Supabase si tienes proyecto local:

```bash
supabase db push
```

### 5. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Panel de administración

Ruta: `/admin` — protegido con Supabase Auth.

Para acceder la primera vez, crea un usuario desde **Supabase Dashboard → Authentication → Users → Invite user** usando tu email.

Desde el admin puedes gestionar:

- **General** — nombre, título, bio, foto/letra del hero, CTAs, iconos flotantes
- **Proyectos** — CRUD con imágenes, galería, tags, links, challenge/solution/results
- **Habilidades** — porcentaje e ícono por skill
- **Experiencia & Educación** — timeline con fechas, empresa, descripción
- **Servicios** — cards con ícono, descripción y tags
- **Mensajes** — bandeja de contactos con estado Pendiente / Contestado

---

## Deploy

El proyecto está conectado a Vercel con CI/CD automático desde GitHub. Cada push a `main` dispara un deploy.

Recuerda agregar las variables de entorno en **Vercel → Settings → Environment Variables** con los mismos valores de `.env.local`.

---

## Estructura del proyecto

```
devius-vitae/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Home — ensambla todas las secciones
│   │   ├── projects/[slug]/    # Detalle de proyecto
│   │   └── admin/              # Panel admin (protegido)
│   ├── components/
│   │   ├── sections/           # Hero, Services, Experience, Skills, Portfolio, Contact
│   │   ├── admin/              # Formularios y componentes del panel admin
│   │   ├── layout/             # Navbar
│   │   └── ui/                 # SkillRing, ImageUpload, DeleteButton...
│   ├── lib/
│   │   ├── actions/            # Server actions (Supabase CRUD + email)
│   │   ├── supabase/           # Clientes server/browser
│   │   ├── data/               # Datos estáticos de fallback
│   │   └── types/              # Tipos TypeScript globales
│   └── styles/                 # globals.css
├── supabase/
│   └── migrations/             # Schema SQL
├── public/                     # Assets estáticos
├── CLAUDE.md                   # Instrucciones para agentes IA
└── HANDOFF.md                  # Estado actual del proyecto (sesión a sesión)
```

---

## Convenciones

- Componentes en **PascalCase**, archivos de página: `page.tsx`
- **Español** para contenido visible, **inglés** para código y variables
- Commits con prefijos: `feat:` `fix:` `style:` `chore:`
- Todas las secciones públicas tienen fallback a datos estáticos — el sitio nunca rompe con DB vacía
