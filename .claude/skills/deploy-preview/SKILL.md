# Skill: Deploy Preview

Flujo para hacer deploy del sitio a Vercel y mantener el repositorio actualizado.

## Repositorio
- **GitHub:** https://github.com/david-arias/devius-vitae
- **Branch principal:** `main` → deploy automático a producción
- **Branches de feature:** `feat/nombre` → genera Preview URL en Vercel

---

## Flujo 1: Deploy a Producción (main)

### Pasos
```bash
# 1. Asegúrate de estar en main y actualizado
git checkout main
git pull origin main

# 2. Verificar que no hay errores
npm run build
npm run lint

# 3. Agregar cambios
git add .

# 4. Commit con mensaje descriptivo
git commit -m "feat: descripción corta del cambio"

# 5. Push → Vercel hace el deploy automático
git push origin main
```

### Verificar el deploy
- GitHub Actions: https://github.com/david-arias/devius-vitae/actions
- Vercel Dashboard: ver el estado del build

---

## Flujo 2: Preview Deploy (feature branch)

```bash
# 1. Crear branch de feature
git checkout -b feat/nombre-del-feature

# 2. Hacer cambios y commit
git add .
git commit -m "feat: descripción"

# 3. Push → Vercel genera una URL de preview
git push origin feat/nombre-del-feature

# 4. Vercel enviará una URL tipo:
# https://devius-vitae-git-feat-nombre-david-arias.vercel.app
```

---

## Prefijos de Commits
| Prefijo | Cuándo usar |
|---------|-------------|
| `feat:` | Nueva funcionalidad o sección |
| `fix:` | Corrección de bug |
| `style:` | Cambios visuales sin lógica |
| `chore:` | Dependencias, config, mantenimiento |
| `docs:` | Documentación |
| `refactor:` | Refactorización sin cambio funcional |
| `perf:` | Mejoras de rendimiento |

---

## Checklist Pre-Deploy
- [ ] `npm run build` pasa sin errores
- [ ] `npm run lint` sin warnings críticos
- [ ] Imágenes optimizadas (usar `next/image`)
- [ ] Variables de entorno configuradas en Vercel
- [ ] No hay `console.log()` de debug en producción
- [ ] Responsive probado en mobile y desktop
- [ ] No hay credenciales hardcodeadas en el código

---

## Variables de Entorno en Vercel
Configurar en Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Entorno |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production + Preview + Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production + Preview + Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Production solamente |

---

## Comandos Útiles
```bash
# Ver estado del repo
git status

# Ver historial reciente
git log --oneline -10

# Ver branches
git branch -a

# Deshacer último commit (sin perder cambios)
git reset --soft HEAD~1

# Ver qué cambió en un archivo
git diff src/app/page.tsx
```
