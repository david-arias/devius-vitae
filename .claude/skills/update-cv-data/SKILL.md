# Skill: Update CV Data

Flujo para actualizar la información del CV de David Arias en el sitio.

## Tipos de Actualización

### A) Datos en Supabase (dinámicos)
Portafolio, skills con porcentajes, servicios — se editan desde el admin panel o directo en BD.

### B) Datos en código (hardcodeados en componentes)
Info personal, experiencia, educación — actualmente en componentes React. Se migrarán a Supabase progresivamente.

---

## Datos Actuales de David Arias

### Información Personal
```json
{
  "section": "personal",
  "data": {
    "name": "David Arias",
    "alias": "Devius",
    "title": "Head UX/UI & Frontend Developer",
    "bio": "Combino conocimiento técnico en React, sentido estético y herramientas de Inteligencia Artificial para crear experiencias de usuario excepcionales y optimizar el desarrollo.",
    "location": "Bogotá, Colombia",
    "email": "devius123@gmail.com",
    "phone": "+57 300 707 4726",
    "github": "github.com/david-arias"
  }
}
```

### Experiencia Laboral
```json
{
  "section": "experience",
  "data": [
    {
      "title": "Brand Manager - Head UX/UI",
      "company": "Lentesplus.com",
      "period": "2020 - Presente",
      "current": true,
      "description": "Liderazgo estratégico en diseño de producto, experiencia de usuario e interfaz corporativa para múltiples mercados en LATAM."
    },
    {
      "title": "Senior UX/UI Designer",
      "company": "Lentesplus.com",
      "period": "2019 - 2020",
      "current": false,
      "description": "Diseño e implementación de interfaces de usuario optimizadas para conversión en plataformas e-commerce B2C."
    },
    {
      "title": "Consultor UX/UI & Dev",
      "company": "Devius",
      "period": "2011 - Presente",
      "current": true,
      "description": "Consultoría independiente para startups y empresas, integrando diseño, desarrollo frontend y soluciones tecnológicas."
    }
  ]
}
```

### Educación
```json
{
  "section": "education",
  "data": [
    {
      "title": "Front End HTML5-CSS3-UX/UI",
      "institution": "Platzi, Udemy",
      "type": "Certificaciones",
      "description": "Especialización continua en tecnologías frontend modernas, metodologías de diseño centrado en el usuario y frameworks actuales."
    },
    {
      "title": "Estudios Superiores",
      "institution": "Universidad de Bogotá Jorge Tadeo Lozano",
      "type": "Universidad",
      "description": "Bases académicas sólidas en diseño y comunicación visual, complementadas con formación técnica en desarrollo de software."
    }
  ]
}
```

### Habilidades
```json
{
  "section": "skills",
  "data": [
    { "name": "Photoshop", "percentage": 90 },
    { "name": "Illustrator", "percentage": 90 },
    { "name": "After Effects", "percentage": 70 },
    { "name": "Figma", "percentage": 95 },
    { "name": "HTML 5", "percentage": 95 },
    { "name": "CSS", "percentage": 95 },
    { "name": "JS Vanilla", "percentage": 90 },
    { "name": "Angular & Frontend", "percentage": 90 },
    { "name": "React & Frontend", "percentage": 65 },
    { "name": "UX Research", "percentage": 80 },
    { "name": "Prompt Engineering & IA", "percentage": 50 }
  ]
}
```

### Servicios
```json
{
  "section": "services",
  "data": [
    {
      "title": "Diseño UX/UI",
      "description": "Creación de interfaces intuitivas y estéticas centradas en la experiencia del usuario.",
      "icon": "design_services",
      "tags": ["Figma", "Prototipado", "Research"],
      "featured": false
    },
    {
      "title": "Desarrollo Frontend",
      "description": "Implementación técnica robusta, escalable y pixel-perfect de diseños interactivos.",
      "icon": "code",
      "tags": ["React", "Angular", "HTML/CSS"],
      "featured": true
    },
    {
      "title": "Integración con IA",
      "description": "Optimización de flujos de trabajo y desarrollo mediante herramientas de inteligencia artificial.",
      "icon": "smart_toy",
      "tags": ["Prompt Engineering", "Claude", "Optimización"],
      "featured": false
    },
    {
      "title": "Diseño Gráfico",
      "description": "Enfoque en piezas publicitarias y creatividad visual utilizando herramientas líderes de la industria.",
      "icon": "brush",
      "tags": ["Adobe", "Affinity", "Publicidad"],
      "featured": false
    }
  ]
}
```

---

## Cómo Actualizar

### Vía Admin Panel (cuando esté listo)
1. Ir a `[dominio]/admin`
2. Login con email `devius123@gmail.com`
3. Navegar a la sección correspondiente
4. Editar y guardar

### Vía Supabase Dashboard
1. Ir a https://app.supabase.com → Table Editor → `cv_data`
2. Encontrar la fila con el `section` correcto
3. Editar el campo `data` (JSON)
4. Guardar

### Vía SQL (para cambios masivos)
```sql
UPDATE cv_data
SET data = '[nuevo JSON]'::jsonb,
    updated_at = now()
WHERE section = 'skills';
```

---

## Seed Inicial de Datos
Cuando la BD esté lista, insertar todos los datos base con:
```sql
INSERT INTO cv_data (section, data) VALUES
('personal', '{ ...json personal... }'::jsonb),
('experience', '[ ...json experience... ]'::jsonb),
('education', '[ ...json education... ]'::jsonb),
('skills', '[ ...json skills... ]'::jsonb),
('services', '[ ...json services... ]'::jsonb);
```
