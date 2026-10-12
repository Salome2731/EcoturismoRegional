\# Ecoturismo Antioquia: Taller SDD



Landing page interactiva de ecoturismo en el Occidente y Norte de Antioquia, desarrollada con Spec-Driven Development (SDD) asistido por IA.



\*\*Página desplegada:\*\* \[PEGA AQUÍ LA URL PÚBLICA DE VERCEL]



\## Stack

Astro + Tailwind CSS v4, JavaScript nativo, datos en JSON local. Desplegado en Vercel.



\## Proceso SDD



| Fase | Documento |

|---|---|

| 1. Principios | \[`docs/00-constitution.md`](docs/00-constitution.md) |

| 2. Especificación | \[`docs/01-spec.md`](docs/01-spec.md) |

| 3. Plan técnico | \[`docs/02-plan.md`](docs/02-plan.md) |

| 4. Tareas | \[`docs/03-tasks.md`](docs/03-tasks.md) |

| 5. Implementación | `src/` y historial de commits |

| 6. Verificación | \[`docs/04-verification.md`](docs/04-verification.md) |

| Créditos de imágenes | \[`docs/CREDITS.md`](docs/CREDITS.md) |



\## Herramientas de IA

Antigravity (constitución, spec, plan, tareas y primeras tareas de código) y Cursor, más apoyo de Claude para revisión y código. El flujo se mantuvo entre herramientas gracias a los documentos de `docs/`.



\## Decisiones y ajustes durante el proceso

\- Tailwind v4: se corrigió la tarea T02 antes de ejecutarla (sintaxis `@import "tailwindcss"`).

\- Los datos de la spec se separaron del plan técnico (el esquema JSON va en el plan, no en la spec).

\- Se retiraron fotos de licencia no verificable; las imágenes son placeholders (ver CREDITS.md).

\- Verificación real de 18 criterios de aceptación en la página desplegada.



\## Ejecutar en local

npm install

npm run dev

