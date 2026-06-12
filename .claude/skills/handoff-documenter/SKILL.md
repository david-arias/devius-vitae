# Skill: Handoff Documenter

Protocolo para crear o actualizar `HANDOFF.md` en el proyecto devius-vitae.

## Cuándo usar esta skill
- Al terminar una sesión con cambios relevantes
- Cuando el usuario diga: "documenta el avance", "actualiza el handoff", "registra lo que hicimos hoy", "sincroniza la documentación", "¿cómo está el proyecto?"
- Cuando se complete un feature importante o se tome una decisión de arquitectura

## Pasos

### 1. Recopilar contexto de la sesión
Pregunta al usuario (si no tienes la info):
- ¿Qué se completó en esta sesión?
- ¿Qué quedó a medias?
- ¿Hubo algo que se intentó y no funcionó?
- ¿Cuáles son los próximos pasos más urgentes?

### 2. Leer el estado actual
```
Read HANDOFF.md        ← versión actual
Read CLAUDE.md         ← contexto permanente
```

### 3. Actualizar HANDOFF.md

Actualiza **solo las secciones que cambiaron**. La estructura fija es:

```markdown
# HANDOFF — devius-vitae

> Última actualización: [DD mmm YYYY] | Sesión: [resumen en una línea de lo que se hizo]

---

## 🎯 Objetivo del Proyecto
[Descripción estable — cambia poco]

---

## ✅ Estado Actual

### Completado
- [feature o sección terminada al 100%]

### En progreso
- [nombre del feature] — falta: [detalle específico de qué queda]

### Pendiente
1. [lo más urgente primero]
2. ...

### Roto / Bloqueado
- **[nombre del problema]** — [descripción exacta del bug o bloqueo]

---

## 🗂️ Contexto Técnico

### Archivos clave modificados recientemente
| Archivo | Qué cambió |
|---------|-----------|
| `src/components/sections/Hero/index.tsx` | Conectado a Supabase via getSettings() |

### Decisiones de arquitectura
- [decisión no obvia] — [razón por la que se tomó]

### Variables de entorno necesarias
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

---

## ❌ Rutas Fallidas

| Qué se intentó | Por qué falló | Alternativa usada |
|----------------|---------------|-------------------|
| [descripción] | [error o razón] | [qué se hizo en cambio] |

---

## 🚀 Próximos Pasos

1. **[Acción imperativa]** — `archivo/exacto.tsx` — [detalle técnico: qué función llamar, qué importar, qué patrón seguir]
2. ...
```

### 4. Reglas de escritura

**Fechas:** absolutas siempre — "11 jun 2026", nunca "ayer" o "esta semana"

**Próximos pasos — ejemplos de bueno vs malo:**
```
❌ Malo:  "Mejorar la sección de portafolio"
✅ Bueno: "Convertir `Portfolio/index.tsx` a async server component y reemplazar
           `import { projectsData }` por `import { getProjects } from '@/lib/actions/projects'`"

❌ Malo:  "Arreglar el formulario de contacto"
✅ Bueno: "En `Contact/index.tsx` línea 29, descomentar el bloque Supabase y eliminar
           el setTimeout. Verificar que existe tabla `contact_messages` en Supabase."
```

**Rutas fallidas — registrar siempre:**
- El error exacto si existe (copia del mensaje de error)
- La razón técnica del fallo
- La alternativa que se usó (o "ninguna, sigue pendiente")
- NUNCA borrar entradas anteriores

**Estado actual — ser honesto:**
- Si algo está roto, va en "Roto / Bloqueado" aunque sea vergonzoso
- "En progreso" solo si alguien lo está trabajando activamente esta sesión
- "Pendiente" = backlog, nadie lo está tocando ahora

## Resultado esperado
Un `HANDOFF.md` que permita a un agente nuevo (o a David en 3 semanas) entender en 2 minutos exactamente dónde está el proyecto y qué hacer a continuación, sin necesidad de preguntar nada.
