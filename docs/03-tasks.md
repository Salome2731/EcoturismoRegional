# Lista de Tareas de Implementación: Landing Page de Ecoturismo en Antioquia

Documento operativo que desglosa el plan técnico de arquitectura (`docs/02-plan.md`) en tareas granulares, secuenciales y atómicas de desarrollo (~30 minutos máximo por tarea), alineadas con los Criterios de Aceptación (`docs/01-spec.md`) y los principios inmutables de la Constitución (`docs/00-constitution.md`).

---

## Convenciones de Cada Tarea

Cada tarea incluye:
- **ID**: Identificador secuencial (`T01`, `T02`, etc.) con casilla de verificación `[ ]`.
- **Descripción**: Alcance técnico puntual y objetivo de la tarea.
- **Archivos involucrados**: Lista explícita de archivos creados, modificados o consultados.
- **Criterios de terminado (DoD)**: Condiciones medibles e inequívocas para marcar la tarea como completada.
- **Criterios de Aceptación cubiertos**: Identificador del criterio según `docs/01-spec.md` (o `N/A` para tareas de infraestructura/soporte).

---

## Bloque 1: Inicialización y Configuración del Entorno

### - [x] T01: Verificar compatibilidad del entorno con Node v25 e inicializar proyecto Astro
- **Descripción**: Validar el entorno de ejecución bajo Node v25 (`node -v`, `npm -v`) e inicializar la base del proyecto Astro en modo estático (SSG), asegurando que las dependencias base se resuelvan limpiamente sin conflictos de motor. Si Astro falla o arroja incompatibilidades críticas con Node v25, se documenta el error, se propone usar Node 22 o 24 LTS y no se avanza a la siguiente tarea hasta resolverlo.
- **Archivos involucrados**:
  - `package.json`
  - `astro.config.mjs`
  - `tsconfig.json`
- **Criterios de terminado**:
  - Comando `node -v` confirma versión en ejecución.
  - En caso de fallo con Node v25, el error queda documentado formalmente, se propone la alternativa Node 22 o 24 LTS y se detiene el flujo hasta su resolución.
  - Proyecto Astro inicializado con estructura limpia de archivos.
  - `package.json` contiene scripts estándar (`dev`, `build`, `preview`).
  - `npm run build` compila con éxito un proyecto vacío sin advertencias bloqueantes ni errores.
- **Criterios de Aceptación cubiertos**: N/A (Infraestructura base).

---

### - [x] T02: Integrar Tailwind CSS y configurar estilos base globales
- **Descripción**: Ejecutar la integración oficial de Tailwind CSS para Astro (`npx astro add tailwind`), adoptar la sintaxis que genere el instalador oficial para la versión instalada de Tailwind, documentar la configuración resultante en `docs/02-plan.md` y establecer el archivo de estilos globales.
- **Archivos involucrados**:
  - `astro.config.mjs`
  - Archivo de configuración generado por la integración de Tailwind
  - `src/styles/global.css`
  - `docs/02-plan.md`
- **Criterios de terminado**:
  - Integración de Tailwind registrada según la herramienta oficial de Astro.
  - `src/styles/global.css` adopta la sintaxis exacta que genere el instalador oficial para la versión instalada de Tailwind.
  - La versión, estructura de archivos y sintaxis de Tailwind generada quedan documentadas en `docs/02-plan.md`.
  - Estilos de prueba con clases de Tailwind se compilan correctamente en build.
- **Criterios de Aceptación cubiertos**: N/A (Infraestructura de diseño).

---

### - [x] T03: Configurar estructura de directorios y tipos TypeScript
- **Descripción**: Crear la estructura de carpetas definida en el plan técnico dentro de `src/` (`assets/images/destinations/`, `assets/images/gallery/`, `components/layout/`, `components/sections/`, `components/ui/`, `data/`, `layouts/`, `pages/`, `styles/`, `types/`) y definir las interfaces TypeScript del modelo de datos (`Destination`, `GalleryItem`, `SuggestedRoute`).
- **Archivos involucrados**:
  - `src/types/index.ts`
  - Estructura de directorios en `src/`
- **Criterios de terminado**:
  - Directorios creados según el árbol del plan técnico (`docs/02-plan.md`, Sección 1).
  - `src/types/index.ts` exporta `Destination`, `GalleryItem` y `SuggestedRoute` con tipado estricto.
  - `npx astro check` o chequeo de tipos no arroja errores.
- **Criterios de Aceptación cubiertos**: N/A (Arquitectura y tipos).

---

### - [x] T04: Git Checkpoint 1 - Configuración inicial del entorno
- **Descripción**: Crear commit de git con la inicialización de Astro, integración de Tailwind, árbol de directorios y tipos de datos.
- **Archivos involucrados**:
  - Todo el árbol inicial del proyecto
- **Criterios de terminado**:
  - Repositorio limpio con commit convencional: `chore: initialize astro, tailwind and project structure`.
  - Sin archivos temporales o node_modules rastreados en git (`.gitignore` verificado).
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 2: Layout Base y Navegación Global

### - [x] T05: Crear layout base `BaseLayout.astro`
- **Descripción**: Implementar el layout principal HTML5 con atributo `lang="es"`, metadatos SEO, Open Graph para ecoturismo de Antioquia, carga de estilos globales, contenedor responsivo mobile-first sin scroll horizontal y regla `scroll-smooth` en el elemento `html`.
- **Archivos involucrados**:
  - `src/layouts/BaseLayout.astro`
  - `src/styles/global.css`
- **Criterios de terminado**:
  - Estructura semántica `<!DOCTYPE html>`, `<html lang="es" class="scroll-smooth">`, `<head>`, `<body>`.
  - Metadatos esenciales incluidos (title, description, viewport, og:title, og:description).
  - Clases preventivas en `body` contra scroll horizontal no deseado (`overflow-x-hidden`).
- **Criterios de Aceptación cubiertos**: CA-HERO-02.

---

### - [x] T06: Crear componente de encabezado `Header.astro`
- **Descripción**: Maquetar barra de navegación fija/adherida con semántica `<header>` y `<nav aria-label="Navegación principal">`. Incluir enlaces ancla hacia `#destinos`, `#galeria`, `#rutas`, `#contacto`. Implementar menú móvil accesible con botón hamburguesa, atributos `aria-expanded` y cierre automático al pulsar enlaces.
- **Archivos involucrados**:
  - `src/components/layout/Header.astro`
- **Criterios de terminado**:
  - Header fijo con contraste visual adecuado sobre fondo de contenido.
  - Enlaces de escritorio visibles a partir de breakpoint `md:`.
  - Menú desplegable en pantallas pequeñas (`< md:`) con toggle funcional por Vanilla JS.
  - `aria-expanded` conmuta entre `"true"` y `"false"`.
  - Al pulsar cualquier enlace interno, el menú móvil se cierra automáticamente.
- **Criterios de Aceptación cubiertos**: CA-NAV-01.

---

### - [x] T07: Crear componente de pie de página `Footer.astro`
- **Descripción**: Maquetar componente de pie de página estático con semántica `<footer>`. Incluir navegación rápida a las secciones, mención de origen regional y el mensaje normativo permanente de compromiso con el turismo sostenible y la preservación ambiental.
- **Archivos involucrados**:
  - `src/components/layout/Footer.astro`
- **Criterios de terminado**:
  - Enlaces de ancla a `#destinos`, `#galeria`, `#rutas`, `#contacto`.
  - Mensaje de preservación ambiental maquetado con visibilidad permanente en cualquier resolución (desde 320 px hasta 1920 px).
  - Cumplimiento de ratios de contraste WCAG AA en texto de pie de página.
- **Criterios de Aceptación cubiertos**: CA-NAV-01, CA-NAV-02.

---

### - [x] T08: Crear componente reutilizable `SectionHeading.astro`
- **Descripción**: Crear componente de interfaz para encabezados de sección que encapsule el título `h2`, subtítulo descriptivo `p` y estilos visuales consistentes, garantizando jerarquía de encabezados accesible.
- **Archivos involucrados**:
  - `src/components/ui/SectionHeading.astro`
- **Criterios de terminado**:
  - Props tipadas para `title`, `subtitle` y `alignment` (centrado o a la izquierda).
  - Renderiza etiqueta semántica `<h2>` sin alterar la jerarquía de títulos de la página.
- **Criterios de Aceptación cubiertos**: N/A (Componente UI reutilizable).

---

### - [ ] T09: Git Checkpoint 2 - Layout base, navegación y encabezados
- **Descripción**: Crear commit de git con la maquetación del layout base, header responsivo, footer informativo y componente SectionHeading.
- **Archivos involucrados**:
  - `src/layouts/BaseLayout.astro`
  - `src/components/layout/Header.astro`
  - `src/components/layout/Footer.astro`
  - `src/components/ui/SectionHeading.astro`
- **Criterios de terminado**:
  - Commit convencional: `feat: add BaseLayout, responsive Header, Footer and SectionHeading`.
  - Build local pasa sin errores.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 3: Datos Locales JSON y Gestión de Imágenes

### - [x] T10: Crear archivo de datos `src/data/destinations.json`
- **Descripción**: Estructurar la información de los 8 municipios oficiales de la v1 (Santa Fe de Antioquia, Ebéjico, San Jerónimo, Abriaquí, Peque, Toledo, Ituango, San José de la Montaña), clasificando 5 en Occidente y 3 en Norte, con clima, dificultad, mínimo 2 actividades, resumen narrativo, detalles extendidos e identificador de imagen local.
- **Archivos involucrados**:
  - `src/data/destinations.json`
- **Criterios de terminado**:
  - El archivo contiene exactamente 8 objetos acordes a la interfaz `Destination`.
  - 5 municipios asignados a `"subregion": "Occidente"` y 3 a `"subregion": "Norte"`.
  - Cada registro posee al menos 2 actividades recomendadas y campos de indumentaria y temporada.
- **Criterios de Aceptación cubiertos**: CA-DEST-01, CA-DEST-02.

---

### - [x] T11: Crear archivo de datos `src/data/gallery.json`
- **Descripción**: Estructurar los datos fotográficos de la galería con un mínimo de 12 registros balanceados entre las 4 categorías oficiales (`naturaleza`, `aventura`, `cultural`, `aguas`), asignando a cada uno título descriptivo, ubicación en Antioquia, texto alternativo `alt` accesible y nombre de archivo de imagen.
- **Archivos involucrados**:
  - `src/data/gallery.json`
- **Criterios de terminado**:
  - Contiene al menos 12 objetos acordes a la interfaz `GalleryItem`.
  - Las 4 categorías temáticas tienen al menos 2-3 imágenes asignadas cada una.
  - Cada entrada incluye atributo `alt` descriptivo y significativo.
- **Criterios de Aceptación cubiertos**: CA-GAL-05.

---

### - [x] T12: Crear archivo de datos `src/data/routes.json`
- **Descripción**: Estructurar los 3 circuitos sugeridos oficiales de la especificación: Ruta Sol y Patrimonio (Occidente fluvial/colonial), Ruta Bosques y Cañones (Occidente de cordillera) y Ruta Aguas del Norte (Norte verde). Los tiempos de duración deben expresarse estrictamente en rangos aproximados realistas.
- **Archivos involucrados**:
  - `src/data/routes.json`
- **Criterios de terminado**:
  - Exactamente 3 rutas definidas acordes a la interfaz `SuggestedRoute`.
  - Campos completos: `id`, `name`, `zone`, `approximateDuration`, `roadType`, `effortLevel`, `description`, `stops`.
  - Duraciones expresadas en rangos (ej. "Aprox. 2 a 3 horas...").
- **Criterios de Aceptación cubiertos**: CA-MAP-01.

---

### - [X] T13: Crear placeholders de imágenes locales y archivo `docs/CREDITS.md`
- **Descripción**: Crear las imágenes locales (o placeholders de aspecto correcto: 16:9 para hero/galería, 4:3 para destinos) en `src/assets/images/destinations/`, `src/assets/images/gallery/` y `src/assets/images/hero-bg.webp`. Crear el documento `docs/CREDITS.md` con el registro de fuentes, autores y licencias de cada recurso gráfico según la decisión técnica del plan.
- **Archivos involucrados**:
  - `src/assets/images/hero-bg.webp` (o formato soportado por Astro)
  - `src/assets/images/destinations/*.webp` (8 imágenes)
  - `src/assets/images/gallery/*.webp` (mínimo 12 imágenes)
  - `docs/CREDITS.md`
- **Criterios de terminado**:
  - Todos los archivos referenciados en `destinations.json` y `gallery.json` existen localmente en el repositorio.
  - Prohibido el uso de URLs remotas o ficticias.
  - `docs/CREDITS.md` documenta cada recurso con origen, autor y tipo de licencia abierta.
- **Criterios de Aceptación cubiertos**: CA-GAL-05.

---

### - [ ] T14: Git Checkpoint 3 - Datos estructurados JSON y assets locales
- **Descripción**: Crear commit de git con los archivos de datos JSON (`destinations.json`, `gallery.json`, `routes.json`), assets locales de imágenes y documento de créditos.
- **Archivos involucrados**:
  - `src/data/destinations.json`
  - `src/data/gallery.json`
  - `src/data/routes.json`
  - `src/assets/images/**/*`
  - `docs/CREDITS.md`
- **Criterios de terminado**:
  - Commit convencional: `feat: add structured JSON datasets, image assets and CREDITS.md`.
  - Sin dependencias externas de red para imágenes.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 4: Componentes Estáticos (Portada y Catálogo de Destinos)

### - [x] T15: Crear componente de portada `Hero.astro`
- **Descripción**: Maquetar la sección principal Hero con fondo optimizado mediante `<Image />` de `astro:assets` (`loading="eager"`), overlay oscuro para garantizar contraste de texto > 4.5:1, título `<h1>` inspirador sobre biodiversidad regional, párrafo explicativo y botón CTA con ancla `<a href="#destinos">`. Incluir clase `scroll-mt-20` en la sección receptora.
- **Archivos involucrados**:
  - `src/components/sections/Hero.astro`
- **Criterios de terminado**:
  - El botón CTA apunta a `#destinos` y navega con desplazamiento suave gracias a `scroll-smooth`.
  - Sin scroll horizontal ni solapamiento de textos entre 320 px y 1920 px.
  - Contraste de texto validado según WCAG AA.
- **Criterios de Aceptación cubiertos**: CA-HERO-01, CA-HERO-02.

---

### - [x] T16: Crear tarjeta de destino `DestinationCard.astro`
- **Descripción**: Implementar la ficha individual de destino. Mostrar nombre, fotografía procesada con `<Image />`, clima, nivel de dificultad y actividades. Aplicar diferenciación visual distintiva entre subregiones (paleta ámbar/terracota para Occidente y esmeralda/bosque para Norte). Implementar detalle extendido mediante acordeón semántico nativo `<details>` y `<summary>` de HTML5 sin JavaScript.
- **Archivos involucrados**:
  - `src/components/sections/DestinationCard.astro`
- **Criterios de terminado**:
  - Cada ficha exhibe claramente nombre, subregión, clima, dificultad y al menos 2 actividades.
  - Badge visual distingue claramente municipios de Occidente de los de Norte.
  - `<summary>` es enfocable por teclado con `focus-visible` definido y despliega indumentaria y recomendaciones sin necesidad de scripts de cliente.
- **Criterios de Aceptación cubiertos**: CA-DEST-02, CA-DEST-03.

---

### - [x] T17: Crear contenedor del catálogo `Destinations.astro`
- **Descripción**: Implementar la sección del catálogo con semántica `<section id="destinos" class="scroll-mt-20 ...">`, integrar `SectionHeading.astro`, cargar de forma estática `destinations.json`, resolver las imágenes con `import.meta.glob` según el plan técnico y renderizar la cuadrícula responsive de 8 tarjetas usando `DestinationCard.astro`.
- **Archivos involucrados**:
  - `src/components/sections/Destinations.astro`
- **Criterios de terminado**:
  - La sección renderiza exactamente los 8 municipios oficiales de la v1.
  - Cuadrícula responsiva que escala desde 1 columna (`mobile`) hasta 4 columnas (`xl:`).
  - La sección posee el id `destinos` y `scroll-mt-20` para evitar solapamiento con el header fijo.
- **Criterios de Aceptación cubiertos**: CA-DEST-01, CA-DEST-02, CA-DEST-03, CA-NAV-01.

---

### - [x] T18: Ensamblar Hero y Catálogo en la página principal `src/pages/index.astro`
- **Descripción**: Configurar la página principal `src/pages/index.astro` bajo `BaseLayout.astro`, integrando `Header.astro`, `Hero.astro`, `Destinations.astro` y `Footer.astro`.
- **Archivos involucrados**:
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - La página compila correctamente y renderiza el flujo completo: Header -> Hero -> Catálogo -> Footer.
  - Al pulsar el botón CTA en Hero, la ventana se desplaza fluidamente hacia `#destinos`.
  - Verificación visual de responsividad y ausencia de scroll horizontal.
- **Criterios de Aceptación cubiertos**: CA-HERO-01, CA-HERO-02, CA-DEST-01, CA-NAV-01.

---

### - [ ] T19: Git Checkpoint 4 - Componentes estáticos de Hero y Catálogo
- **Descripción**: Crear commit de git con la implementación de Hero, DestinationCard, Destinations y su integración en `index.astro`.
- **Archivos involucrados**:
  - `src/components/sections/Hero.astro`
  - `src/components/sections/DestinationCard.astro`
  - `src/components/sections/Destinations.astro`
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - Commit convencional: `feat: implement Hero and Destinations catalog sections`.
  - Build local pasa sin advertencias.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 5: Componente Interactivo 1 - Galería Fotográfica y Visor Modal

### - [x] T20: Crear componente de visor modal `GalleryModal.astro`
- **Descripción**: Implementar el visor de imágenes ampliado en primer plano empleando el elemento nativo `<dialog id="gallery-dialog">` con `role="dialog"` y `aria-modal="true"`. Incluir contenedor para imagen ampliada, pie de foto descriptivo y botón de cierre visible. Programar script en cliente para gestionar apertura vía `dialog.showModal()`, cierre con botón, cierre al pulsar el backdrop y manejo nativo de tecla `Escape`.
- **Archivos involucrados**:
  - `src/components/sections/GalleryModal.astro`
- **Criterios de terminado**:
  - Modal construido con etiqueta nativa `<dialog>` y backdrop estilizado con Tailwind.
  - Se cierra inmediatamente al pulsar el botón de cierre explícito.
  - Se cierra inmediatamente al hacer clic fuera del recuadro de la imagen (backdrop).
  - Se cierra inmediatamente al presionar la tecla `Escape`.
  - Atributo `alt` y pie de foto se actualizan acordes a la imagen abierta.
- **Criterios de Aceptación cubiertos**: CA-GAL-03, CA-GAL-04.

---

### - [x] T21: Crear sección de galería con filtrado `Gallery.astro`
- **Descripción**: Maquetar la sección `<section id="galeria" class="scroll-mt-20 ...">` con `SectionHeading.astro`. Renderizar en build las 12+ imágenes de `gallery.json` optimizadas con `<Image />` de Astro (resolviendo rutas con `import.meta.glob`). Crear barra de botones de filtro (`Todos`, `Naturaleza`, `Aventura`, `Cultural`, `Aguas`). Programar script Vanilla JS que conmute la clase `hidden` en el DOM según el atributo `data-category` en menos de 300 ms y despache la apertura del visor en `GalleryModal.astro`.
- **Archivos involucrados**:
  - `src/components/sections/Gallery.astro`
- **Criterios de terminado**:
  - Cuadrícula con al menos 12 imágenes distribuidas en las 4 categorías.
  - Al seleccionar una categoría, los elementos no correspondientes se ocultan en menos de 50 ms (muy por debajo de los 300 ms exigidos).
  - El botón "Todos" restablece la totalidad de las imágenes.
  - Al pulsar cualquier tarjeta o imagen, se abre el visor `GalleryModal` con los datos de dicha foto.
  - Los botones de filtro indican visualmente el estado activo y son operables por teclado.
- **Criterios de Aceptación cubiertos**: CA-GAL-01, CA-GAL-02, CA-GAL-03, CA-GAL-04, CA-GAL-05.

---

### - [ ] T22: Integrar Galería y Modal en `src/pages/index.astro`
- **Descripción**: Importar e incrustar `Gallery.astro` y `GalleryModal.astro` en la página principal `src/pages/index.astro` inmediatamente después del catálogo de destinos.
- **Archivos involucrados**:
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - La sección se visualiza correctamente bajo el ancla `#galeria`.
  - El filtrado y la apertura del modal funcionan en el flujo integrado sin interferir con otras secciones.
  - La navegación desde el header hacia `#galeria` posiciona la vista sin quedar oculta tras el header fijo.
- **Criterios de Aceptación cubiertos**: CA-GAL-01, CA-GAL-02, CA-GAL-03, CA-GAL-04, CA-GAL-05, CA-NAV-01.

---

### - [ ] T23: Git Checkpoint 5 - Galería interactiva y visor modal
- **Descripción**: Crear commit de git con la implementación de `GalleryModal.astro`, `Gallery.astro` y su integración en la página principal.
- **Archivos involucrados**:
  - `src/components/sections/GalleryModal.astro`
  - `src/components/sections/Gallery.astro`
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - Commit convencional: `feat: implement interactive gallery with categories filter and dialog lightbox`.
  - Build local pasa sin errores.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 6: Componente Interactivo 2 - Mapa Esquemático de Rutas

### - [ ] T24: Diseñar SVG vectorial responsivo del mapa en `RouteMap.astro`
- **Descripción**: Crear la sección `<section id="rutas" class="scroll-mt-20 ...">` con `SectionHeading.astro`. Diseñar un esquema vectorial SVG embebido (`viewBox="0 0 800 600"`, responsivo) que represente la distribución territorial de Occidente y Norte, con trazados `<path>` para las 3 rutas sugeridas (Sol y Patrimonio, Bosques y Cañones, Aguas del Norte) y nodos circulares `<g>` para los 8 municipios.
- **Archivos involucrados**:
  - `src/components/sections/RouteMap.astro`
- **Criterios de terminado**:
  - SVG embebido sin dependencias externas (0 KB librerías de terceros, sin Leaflet/Mapbox).
  - Incluye trazados visuales claros para los 3 circuitos oficiales.
  - Nodos identificados con los nombres de los 8 municipios.
  - Escala correctamente en pantallas móviles y escritorio mediante `w-full h-auto`.
- **Criterios de Aceptación cubiertos**: CA-MAP-01.

---

### - [ ] T25: Implementar panel reactivo y botonera accesible en `RouteMap.astro`
- **Descripción**: Integrar una botonera semántica visible adyacente al mapa con `<button>` para cada ruta (`Ruta Sol y Patrimonio`, `Ruta Bosques y Cañones`, `Ruta Aguas del Norte`) y un panel informativo con `role="region"` y `aria-live="polite"`. Programar script Vanilla JS que sincronice la selección (clic o teclado) entre los botones y el SVG, resaltando el trazado activo y actualizando el panel con tiempo aproximado, paradas recomendadas, tipo de vía y nivel de esfuerzo desde `routes.json`.
- **Archivos involucrados**:
  - `src/components/sections/RouteMap.astro`
- **Criterios de terminado**:
  - Todos los botones de ruta y nodos del mapa son operables secuencialmente mediante teclado (`Tab`, `Enter`, `Space`).
  - Al seleccionar una ruta, el panel actualiza de inmediato su título, duración aproximada en rango, paradas y descripción.
  - El trazado SVG correspondiente se resalta visualmente con clases CSS de Tailwind.
  - El lector de pantalla recibe las actualizaciones vía `aria-live="polite"`.
- **Criterios de Aceptación cubiertos**: CA-MAP-01, CA-MAP-02, CA-MAP-03.

---

### - [ ] T26: Integrar sección de mapa en `src/pages/index.astro`
- **Descripción**: Incorporar `RouteMap.astro` en la página principal `src/pages/index.astro` a continuación de la galería.
- **Archivos involucrados**:
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - La sección se visualiza correctamente bajo el ancla `#rutas`.
  - El enlace del menú de navegación hacia `#rutas` desplaza la vista con margen adecuado (`scroll-mt-20`).
  - Interacciones del mapa verificadas en dispositivos táctiles y con navegación por teclado.
- **Criterios de Aceptación cubiertos**: CA-MAP-01, CA-MAP-02, CA-MAP-03, CA-NAV-01.

---

### - [ ] T27: Git Checkpoint 6 - Mapa esquemático interactivo de rutas
- **Descripción**: Crear commit de git con la implementación completa del mapa vectorial de rutas y su panel de detalles reactivo.
- **Archivos involucrados**:
  - `src/components/sections/RouteMap.astro`
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - Commit convencional: `feat: implement interactive SVG route map with accessible controls and reactive panel`.
  - Build local pasa sin errores.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 7: Componente Interactivo 3 - Formulario Simulado de Contacto

### - [ ] T28: Maquetar estructura semántica y accesible de `ContactForm.astro`
- **Descripción**: Crear la sección `<section id="contacto" class="scroll-mt-20 ...">` con `SectionHeading.astro`. Maquetar el formulario con campos: Nombre completo (`type="text" required`), Correo electrónico (`type="email" required`), Destino de interés (`<select required>` con los 8 municipios), Experiencia deseada (`<select required>` con las 4 categorías) y Mensaje (`<textarea required>`). Incluir etiquetas `<label>` vinculadas mediante `for`/`id`, nota aclaratoria de canal demostrativo y botón de envío.
- **Archivos involucrados**:
  - `src/components/sections/ContactForm.astro`
- **Criterios de terminado**:
  - Todos los campos poseen etiquetas `<label>` explícitas y accesibles.
  - Menú desplegable poblado con los 8 destinos oficiales de v1.
  - Campos obligatorios marcados con `required` y atributos ARIA de descripción de error.
  - Nota aclaratoria visible indicando que es un canal demostrativo.
- **Criterios de Aceptación cubiertos**: CA-CON-01.

---

### - [ ] T29: Implementar validación nativa y procesamiento simulado en `ContactForm.astro`
- **Descripción**: Programar script en cliente que capture el evento `submit`, prevenga el envío por defecto (`event.preventDefault()`) y valide los campos mediante `form.checkValidity()`. Si hay campos inválidos, marcar visualmente con bordes de error y `aria-invalid="true"`. Si es válido, mostrar mensaje accesible de confirmación (`role="status"`, `aria-live="polite"`), reiniciar los campos con `form.reset()` y garantizar que no se emita ninguna petición HTTP/fetch a redes externas.
- **Archivos involucrados**:
  - `src/components/sections/ContactForm.astro`
- **Criterios de terminado**:
  - Si se intenta enviar vacío o con datos erróneos, se señalan visualmente los campos faltantes y no se procesa el formulario.
  - Al diligenciar datos válidos y enviar, se muestra en pantalla el mensaje de confirmación de registro exitoso.
  - La página no se recarga, no se pierde el scroll y los campos se limpian automáticamente.
  - La pestaña de red de herramientas de desarrollo confirma 0 peticiones salientes (`fetch`/`xhr`).
- **Criterios de Aceptación cubiertos**: CA-CON-01, CA-CON-02, CA-CON-03.

---

### - [ ] T30: Integrar formulario de contacto en `src/pages/index.astro`
- **Descripción**: Incorporar `ContactForm.astro` en la página principal `src/pages/index.astro` antes del pie de página.
- **Archivos involucrados**:
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - Formulario completamente integrado en `#contacto`.
  - Navegación desde el header y footer hacia `#contacto` operativa con desplazamiento suave y sin solapamiento.
  - Flujo completo de la landing page (Header -> Hero -> Destinos -> Galería -> Mapa -> Contacto -> Footer) operativo.
- **Criterios de Aceptación cubiertos**: CA-CON-01, CA-CON-02, CA-CON-03, CA-NAV-01.

---

### - [ ] T31: Git Checkpoint 7 - Formulario simulado de contacto
- **Descripción**: Crear commit de git con la implementación del formulario de contacto interactivo, validación accesible y procesamiento local simulado.
- **Archivos involucrados**:
  - `src/components/sections/ContactForm.astro`
  - `src/pages/index.astro`
- **Criterios de terminado**:
  - Commit convencional: `feat: implement simulated contact form with native validation and accessible feedback`.
  - Build local pasa sin errores.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 8: Accesibilidad (a11y), Rendimiento y Pulido Responsive

### - [ ] T32: Auditoría y correcciones de accesibilidad (WCAG 2.1 AA)
- **Descripción**: Realizar revisión integral de accesibilidad en toda la landing page: verificar contraste cromático mínimo de 4.5:1 en textos normales y 3:1 en elementos de interfaz, navegación fluida exclusiva por teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`), estados visibles de foco (`focus-visible:ring-2`) en botones, enlaces, tarjetas, modal y campos de formulario, y jerarquía estricta de encabezados (`h1` en Hero, `h2` en secciones, `h3` en tarjetas/paneles).
- **Archivos involucrados**:
  - `src/styles/global.css`
  - Componentes en `src/components/`
  - `src/layouts/BaseLayout.astro`
- **Criterios de terminado**:
  - Jerarquía de encabezados (`h1` -> `h2` -> `h3`) sin saltos de nivel en toda la página.
  - Todos los elementos interactivos cuentan con contorno de foco visible al navegar por teclado.
  - Validación de contraste supera 4.5:1 en todos los textos sobre fondos claros y oscuros.
  - Lectores de pantalla verbalizan correctamente las regiones interactivas (`aria-live`, `aria-expanded`, `aria-modal`).
- **Criterios de Aceptación cubiertos**: CA-HERO-01, CA-MAP-03, CA-GAL-04, CA-CON-01, CA-NAV-01.

---

### - [ ] T33: Optimización de imágenes, rendimiento y prueba de responsividad extrema
- **Descripción**: Verificar la carga optimizada de imágenes mediante `<Image />` de Astro (WebP/AVIF, dimensiones explícitas, lazy loading salvo en Hero con eager loading), atributos `alt` descriptivos en imágenes de contenido y `alt=""` con `aria-hidden="true"` en elementos decorativos. Probar la visualización en viewport continuo desde 320 px hasta 1920 px confirmando cero scroll horizontal y márgenes adecuados de anclas (`scroll-mt-20`).
- **Archivos involucrados**:
  - Todos los componentes en `src/components/sections/`
  - `src/layouts/BaseLayout.astro`
- **Criterios de terminado**:
  - Ningún viewport entre 320 px y 1920 px presenta scroll horizontal o textos truncados.
  - Todas las imágenes de contenido poseen `alt` descriptivo verificado.
  - No se descargan bundles pesados de JS de terceros; la aplicación se mantiene en Zero-JS salvo scripts mínimos encapsulados.
- **Criterios de Aceptación cubiertos**: CA-HERO-02, CA-NAV-01, CA-NAV-02.

---

### - [ ] T34: Git Checkpoint 8 - Accesibilidad, rendimiento y responsive
- **Descripción**: Crear commit de git con todas las mejoras y ajustes de accesibilidad, optimización de recursos y comportamiento responsive.
- **Archivos involucrados**:
  - Componentes modificados durante la auditoría
  - `src/styles/global.css`
- **Criterios de terminado**:
  - Commit convencional: `refactor: refine accessibility wcag aa, responsive design and image optimization`.
  - Build local pasa sin errores.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones).

---

## Bloque 9: Verificación de Criterios de Aceptación y Despliegue en Vercel

### - [ ] T35: Reemplazar placeholders por fotos reales de Wikimedia Commons y actualizar `docs/CREDITS.md`
- **Descripción**: Reemplazar todas las imágenes de muestra/placeholders en `src/assets/images/destinations/`, `src/assets/images/gallery/` y `src/assets/images/hero-bg.webp` por fotografías reales de Wikimedia Commons descargadas por el usuario. Actualizar exhaustivamente el archivo `docs/CREDITS.md` con autor, enlace de origen y licencia abierta de cada fotografía.
- **Archivos involucrados**:
  - `src/assets/images/hero-bg.webp`
  - `src/assets/images/destinations/*.webp`
  - `src/assets/images/gallery/*.webp`
  - `docs/CREDITS.md`
- **Criterios de terminado**:
  - Todos los placeholders sustituidos por fotos reales locales de Wikimedia Commons descargadas por el usuario.
  - Fotografías respetan relaciones de aspecto definidas (16:9 hero/galería, 4:3 destinos).
  - `docs/CREDITS.md` actualizado con cada una de las imágenes: autor, enlace a Wikimedia Commons y tipo de licencia libre.
  - Build local compila procesando las imágenes reales sin advertencias ni roturas.
- **Criterios de Aceptación cubiertos**: CA-GAL-05.

---

### - [ ] T36: Generar informe formal de verificación `docs/04-verification.md`
- **Descripción**: Ejecutar la batería de pruebas y validaciones técnicas reales contra la totalidad de los 18 Criterios de Aceptación (CA-HERO-01 a CA-NAV-02) estipulados en `docs/01-spec.md`. Registrar en `docs/04-verification.md` cada criterio con su descripción, procedimiento de prueba ejecutado, resultado real obtenido (APROBADO o RECHAZADO) y evidencia técnica observable.
- **Archivos involucrados**:
  - `docs/04-verification.md`
- **Criterios de terminado**:
  - Archivo `docs/04-verification.md` creado y estructurado formalmente.
  - Cada uno de los 18 criterios de aceptación se prueba de verdad y se registra como APROBADO o RECHAZADO según el resultado real, aportando evidencia tangible.
  - Los criterios que resulten RECHAZADOS generan tareas de corrección documentadas para ser resueltas antes del cierre.
  - Cumplimiento normativo general validado contra la Constitución (`docs/00-constitution.md`).
- **Criterios de Aceptación cubiertos**: Todos los CA (CA-HERO-01 a CA-NAV-02).

---

### - [ ] T37: Configuración para despliegue estático en Vercel y verificación de build
- **Descripción**: Configurar los parámetros de salida estática de Astro (`output: 'static'` en `astro.config.mjs`) o archivo `vercel.json` si se requiere configuración específica de encabezados, ejecutar el comando de build de producción (`npm run build`) y verificar que el directorio resultante `dist/` contiene el sitio estático optimizado listo para servir en Vercel.
- **Archivos involucrados**:
  - `astro.config.mjs`
  - `vercel.json` (opcional si la configuración predeterminada de Astro es suficiente)
  - `package.json`
- **Criterios de terminado**:
  - `npm run build` genera la carpeta `dist/` con HTML estático, CSS optimizado y assets procesados sin errores.
  - `npm run preview` permite recorrer la landing page completa localmente emulando el entorno de producción.
  - Documentación de despliegue en Vercel lista para conectar al repositorio Git.
- **Criterios de Aceptación cubiertos**: N/A (Infraestructura y entrega continua).

---

### - [ ] T38: Git Checkpoint 9 - Verificación final y preparación de despliegue
- **Descripción**: Crear commit final de git que incluya el reemplazo de fotos reales, actualización de `docs/CREDITS.md`, informe `docs/04-verification.md`, configuración de despliegue en Vercel y el estado consolidado de la aplicación.
- **Archivos involucrados**:
  - `docs/04-verification.md`
  - `docs/CREDITS.md`
  - `astro.config.mjs` / `vercel.json`
  - `docs/03-tasks.md`
- **Criterios de terminado**:
  - Commit convencional: `docs: complete acceptance criteria verification and finalize vercel deployment config`.
  - Repositorio listo para push a rama principal y despliegue automático en Vercel.
- **Criterios de Aceptación cubiertos**: N/A (Control de versiones y cierre).

---

## Matriz Resumen de Cobertura de Criterios de Aceptación (CA)

| Criterio | Descripción | Tareas de Implementación | Tarea de Verificación |
| :--- | :--- | :--- | :--- |
| **CA-HERO-01** | CTA scroll suave a destinos | T15, T18, T32 | T36 |
| **CA-HERO-02** | Sin scroll horizontal 320px–1920px | T05, T15, T18, T33 | T36 |
| **CA-DEST-01** | Exactamente 8 destinos oficiales | T10, T17, T18 | T36 |
| **CA-DEST-02** | Ficha con nombre, clima, dificultad, >= 2 actividades | T10, T16, T17 | T36 |
| **CA-DEST-03** | Diferenciación visual Occidente vs Norte | T16, T17 | T36 |
| **CA-GAL-01** | Filtro temático oculta en < 300 ms | T21, T22 | T36 |
| **CA-GAL-02** | Filtro "Todos" restaura catálogo completo | T21, T22 | T36 |
| **CA-GAL-03** | Visor modal abre foto, título y control de cierre | T20, T21, T22 | T36 |
| **CA-GAL-04** | Visor cierra por botón, clic backdrop o tecla Escape | T20, T21, T22, T32 | T36 |
| **CA-GAL-05** | Al menos 12 imágenes en 4 categorías | T11, T13, T21, T35 | T36 |
| **CA-MAP-01** | 3 rutas sugeridas (Sol, Bosques, Aguas) | T12, T24, T25, T26 | T36 |
| **CA-MAP-02** | Panel actualiza rangos de duración, paradas y detalle | T25, T26 | T36 |
| **CA-MAP-03** | Controles del mapa operables secuencialmente por teclado | T25, T26, T32 | T36 |
| **CA-CON-01** | Formulario señala visualmente campos requeridos vacíos | T28, T29, T30, T32 | T36 |
| **CA-CON-02** | Envío válido muestra confirmación sin recargar | T29, T30 | T36 |
| **CA-CON-03** | Limpieza automática de campos y 0 llamadas de red | T29, T30 | T36 |
| **CA-NAV-01** | Enlaces ancla llevan a secciones de la página | T06, T07, T17, T22, T26, T30, T32, T33 | T36 |
| **CA-NAV-02** | Mensaje ambiental visible permanente en footer | T07, T33 | T36 |
