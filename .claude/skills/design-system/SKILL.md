# Skill: Design System — devius-vitae

Sistema de diseño completo del CV online de David Arias (Devius).
Referencia obligatoria antes de crear o modificar cualquier componente visual.

---

## Paleta de Colores (Tailwind Tokens)

### Fondos y Superficies
| Token | Hex | Uso |
|-------|-----|-----|
| `background` | `#0b1120` | Fondo principal de toda la página |
| `surface` | `#0d1322` | Superficie base de componentes |
| `surface-dim` | `#0d1322` | Superficie atenuada |
| `surface-bright` | `#33394a` | Superficie brillante |
| `surface-container-lowest` | `#080e1d` | Footer, fondos muy oscuros |
| `surface-container-low` | `#151b2b` | Contenedores sutiles |
| `surface-container` | `#191f2f` | Contenedores estándar (iconos, badges) |
| `surface-container-high` | `#242a3a` | Cards, paneles elevados |
| `surface-container-highest` | `#2f3445` | Superficies más elevadas |
| `surface-variant` | `#2f3445` | Variante de superficie |

### Color Primario (Emerald Teal)
| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#4edea3` | Textos destacados, links activos, acentos |
| `primary-fixed` | `#6ffbbe` | Variante fija |
| `primary-fixed-dim` | `#4edea3` | Variante fija atenuada |
| `primary-container` | `#10b981` | Botones primarios, CTAs |
| `on-primary` | `#003824` | Texto sobre primary |
| `on-primary-container` | `#00422b` | Texto sobre primary-container |
| `on-primary-fixed` | `#002113` | Texto sobre primary-fixed |
| `inverse-primary` | `#006c49` | Primario inverso |
| `surface-tint` | `#4edea3` | Tinte de superficie |

### Colores de Texto
| Token | Hex | Uso |
|-------|-----|-----|
| `on-surface` | `#dde2f8` | Texto principal |
| `on-surface-variant` | `#bbcabf` | Texto secundario, subtítulos |
| `on-background` | `#dde2f8` | Texto sobre background |
| `inverse-surface` | `#dde2f8` | Superficie inversa |
| `inverse-on-surface` | `#2a3040` | Texto sobre superficie inversa |

### Colores Secundarios y de Acento
| Token | Hex | Uso |
|-------|-----|-----|
| `secondary` | `#adc6ff` | Azul secundario |
| `secondary-container` | `#0566d9` | Contenedor secundario |
| `secondary-fixed` | `#d8e2ff` | Azul fijo |
| `secondary-fixed-dim` | `#adc6ff` | Azul fijo atenuado |
| `on-secondary` | `#002e6a` | Texto sobre secondary |
| `on-secondary-container` | `#e6ecff` | Texto sobre secondary-container |
| `tertiary` | `#ffb95f` | Naranja/amber terciario |
| `tertiary-container` | `#e29100` | Contenedor terciario |
| `tertiary-fixed` | `#ffddb8` | Terciario fijo |
| `tertiary-fixed-dim` | `#ffb95f` | Terciario fijo atenuado |

### Bordes y Outlines
| Token | Hex | Uso |
|-------|-----|-----|
| `outline` | `#86948a` | Bordes visibles |
| `outline-variant` | `#3c4a42` | Bordes sutiles |

---

## Tipografía

**Fuente única:** Inter (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
```

### Escala Tipográfica (Tokens Tailwind)
| Token | Tamaño | Line Height | Letter Spacing | Weight | Uso |
|-------|--------|-------------|----------------|--------|-----|
| `display-lg` | 64px | 72px | -0.02em | 800 | Nombre principal en Hero |
| `headline-lg` | 40px | 48px | -0.01em | 700 | Títulos de sección desktop |
| `headline-lg-mobile` | 32px | 40px | — | 700 | Títulos de sección mobile |
| `headline-md` | 24px | 32px | — | 600 | Subtítulos, nombres de cards |
| `body-lg` | 18px | 28px | — | 400 | Párrafos principales |
| `body-md` | 16px | 24px | — | 400 | Texto general, labels |
| `label-sm` | 12px | 16px | 0.05em | 600 | Tags, badges, botones pequeños |

### Uso correcto
```tsx
// ✅ Correcto
<h1 className="font-display-lg text-display-lg text-on-surface">David Arias</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Bio text</p>

// ❌ Incorrecto — nunca valores arbitrarios
<h1 className="text-[64px] font-extrabold">David Arias</h1>
```

---

## Spacing

| Token | Valor | Uso |
|-------|-------|-----|
| `margin-mobile` | 16px | Padding lateral en mobile |
| `gutter` | 24px | Espaciado entre columnas |
| `margin-desktop` | 80px | Padding lateral en desktop |
| `base` | 4px | Unidad base de espaciado |
| `section-padding` | 120px | Padding vertical de secciones |

---

## Border Radius

| Clase | Valor | Uso |
|-------|-------|-----|
| `rounded` | 0.25rem (4px) | Default, elementos pequeños |
| `rounded-lg` | 0.5rem (8px) | Cards medianas |
| `rounded-xl` | 0.75rem (12px) | Cards grandes, panels |
| `rounded-full` | 9999px | Botones pill, avatares, badges |

---

## Componentes Reutilizables

### Glass Panel
```tsx
<div className="glass-panel rounded-xl p-8">
  {/* contenido */}
</div>
```
```css
.glass-panel {
  background: #1f2937;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Glow Effect
```tsx
<div
  className="absolute rounded-full pointer-events-none -z-10"
  style={{
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(11, 17, 32, 0) 70%)'
  }}
/>
```

### Floating Icon (Hero)
```tsx
<div
  className="absolute bg-surface-container-high rounded-full p-3 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
  style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '0s' }}
>
  {/* SVG del logo */}
</div>
```
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### Orbit Ring
```tsx
<div className="absolute border border-dashed border-white/10 rounded-full" style={{ width: '130%', height: '130%' }} />
```

### Skill Ring (SVG)
```tsx
// percentage: 0-100
const circumference = 2 * Math.PI * 45 // = 283
const offset = circumference - (percentage / 100) * circumference

<div className="relative w-32 h-32">
  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
    <circle
      cx="50" cy="50" r="45" fill="none"
      stroke="#10b981" strokeWidth="8"
      strokeDasharray={283}
      strokeDashoffset={offset}
      strokeLinecap="round"
    />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="font-headline-md text-headline-md text-on-surface font-bold text-lg">{percentage}%</span>
  </div>
</div>
```

### Timeline Item
```tsx
<div className="relative border-l border-white/10 ml-4">
  <div className="relative pl-8">
    {/* Punto en la línea */}
    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
    {/* Badge de fecha (activo) */}
    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
      2020 - Presente
    </span>
    {/* Badge de fecha (pasado) */}
    <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm border border-white/10">
      2019 - 2020
    </span>
  </div>
</div>
```

### Nav Item con Underline Animado
```css
.nav-item {
  position: relative;
}
.nav-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #10b981;
  transition: width 0.3s ease;
}
.nav-item:hover::after,
.nav-item.active::after {
  width: 100%;
}
```

### Botón Primario (CTA)
```tsx
<button className="px-8 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
  Contáctame
</button>
```

### Botón Outline
```tsx
<button className="px-8 py-3 bg-transparent border border-primary text-primary font-label-sm text-label-sm rounded-full hover:bg-primary/10 transition-colors duration-200 flex items-center gap-2">
  <span className="material-symbols-outlined text-[18px]">download</span>
  Descargar CV
</button>
```

### Tag / Badge
```tsx
{/* Sobre fondo oscuro */}
<span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm border border-white/5">
  React
</span>

{/* Sobre card destacada */}
<span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
  React
</span>
```

### Card Destacada (con glow border)
```tsx
<div className="p-8 rounded-xl bg-primary/5 border border-primary/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
  {/* contenido con relative z-10 */}
</div>
```

### Nav (Navbar fija)
```tsx
<nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-20 bg-background/80 backdrop-blur-xl border-b border-white/10 transition-all duration-200 ease-in-out">
```

---

## Iconos (Material Symbols Outlined)

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

```tsx
// Uso básico
<span className="material-symbols-outlined text-primary">design_services</span>

// Con variación de peso
<span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'wght' 300" }}>
  code
</span>

// Iconos usados en el proyecto
// design_services, code, smart_toy, brush (servicios)
// work, school (experiencia/educación)
// location_on, mail, call (contacto)
// download, apps (botones)
```

---

## Patrones de Layout

### Sección estándar
```tsx
<section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">
```

### Hero (min-height con flex)
```tsx
<section className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop min-h-[819px] flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-12 md:pt-24">
```

### Grid 2 columnas
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
```

### Cards horizontales (scroll)
```tsx
<div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar">
  <div className="min-w-[350px] snap-center ...">
```

---

## Secciones del Sitio

| ID | Nombre | Descripción |
|----|--------|-------------|
| `#inicio` | Hero | Nombre, título, bio, CTA, orbit con iconos |
| `#servicios` | Servicios | Cards horizontales con scroll |
| `#experiencia` | Experiencia | Timeline dual (trabajo + educación) |
| `#habilidades` | Habilidades | Grid de skill rings SVG |
| `#portafolio` | Portafolio | Cards desde Supabase |
| `#contacto` | Contacto | Footer con formulario y datos |

---

## Reglas Absolutas
1. **SIEMPRE dark mode** — el sitio solo tiene modo oscuro
2. **NUNCA valores hex arbitrarios** en className — usa los tokens
3. **NUNCA fuente diferente a Inter**
4. **SIEMPRE** `font-display-lg text-display-lg` juntos (font-family + font-size token)
5. El color primario visual es `#10b981` (en `primary-container`) para fondos y `#4edea3` (en `primary`) para textos
