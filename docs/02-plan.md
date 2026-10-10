# Plan Técnico de Arquitectura: Landing Page de Ecoturismo en Antioquia

Documento técnico que define la arquitectura de software, la estructura de componentes, los esquemas de datos locales, las decisiones de ingeniería y la matriz de trazabilidad para la implementación de la landing page bajo la metodología Spec-Driven Development (SDD).

---

## 1. Estructura de Carpetas del Proyecto Astro

La organización del proyecto sigue una arquitectura limpia, orientada a contenido estático y desacoplada de dependencias externas, ubicando todo el código fuente en `src/`:

```text
├── docs/
│   ├── 00-constitution.md
│   ├── 01-spec.md
│   ├── 02-plan.md
│   └── CREDITS.md
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── hero-bg.webp
│   │       ├── destinations/
│   │       │   ├── abriaqui.webp
│   │       │   ├── ebejico.webp
│   │       │   ├── ituango.webp
│   │       │   ├── peque.webp
│   │       │   ├── san-jeronimo.webp
│   │       │   ├── san-jose-montana.webp
│   │       │   ├── santa-fe-antioquia.webp
│   │       │   └── toledo.webp
│   │       └── gallery/
│   │           ├── gal-01.webp
│   │           ├── gal-02.webp
│   │           └── ... (hasta mínimo 12 imágenes)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Destinations.astro
│   │   │   ├── DestinationCard.astro
│   │   │   ├── Gallery.astro
│   │   │   ├── GalleryModal.astro
│   │   │   ├── RouteMap.astro
│   │   │   └── ContactForm.astro
│   │   └── ui/
│   │       └── SectionHeading.astro
│   ├── data/
│   │   ├── destinations.json
│   │   ├── gallery.json
│   │   └── routes.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── index.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── (archivos generados por la integración oficial de Tailwind)
```

> **Nota sobre Tailwind CSS**: Se ejecutó la integración oficial (`npx astro add tailwind`), instalando **Tailwind CSS v4** (`tailwindcss@^4.3.3` y `@tailwindcss/vite@^4.3.3`). Esta versión prescinde de `tailwind.config.mjs`; en su lugar, configura el plugin de Vite en `astro.config.mjs` (`vite: { plugins: [tailwindcss()] }`) y genera el archivo `src/styles/global.css` con la directiva nativa `@import "tailwindcss";`.

---

## 2. Lista y Clasificación de Componentes

Siguiendo la regla de **Zero-JS por defecto** establecida en la Constitución (Sección 5), no se integra ningún framework de UI externo (como React, Svelte o Vue). Toda la interactividad cliente requerida se resuelve mediante **Vanilla JavaScript / TypeScript nativo en bloques `<script>` encapsulados dentro de los componentes `.astro`**.

### 2.1 Componentes Estáticos (0 KB de JavaScript enviado al cliente)

1. **`BaseLayout.astro`**
   - **Responsabilidad**: Estructura base HTML5 (`<!DOCTYPE html>`, `lang="es"`), metadatos SEO, Open Graph, fuentes y contenedor principal.
   - **Justificación**: Maquetación estática pura requerida para todas las vistas.

2. **`SectionHeading.astro`**
   - **Responsabilidad**: Componente UI reutilizable para títulos de sección con subtítulo descriptivo, garantizando jerarquía de encabezados accesible (`h2`, `p`).
   - **Justificación**: Reutilización visual sin necesidad de lógica o estado.

3. **`Hero.astro`**
   - **Responsabilidad**: Presentación de cabecera con fotografía de impacto, propuesta de valor y botón de llamada a la acción hacia `#destinos`.
   - **Justificación**: Desplazamiento suave resuelto de forma nativa vía CSS (`scroll-behavior: smooth`) sin necesidad de JavaScript.

4. **`Destinations.astro`**
   - **Responsabilidad**: Contenedor de la sección del catálogo. Carga `destinations.json` en tiempo de compilación y mapea los 8 destinos oficiales.
   - **Justificación**: Renderizado SSG en tiempo de compilación; el catálogo de v1 es estático.

5. **`DestinationCard.astro`**
   - **Responsabilidad**: Ficha de destino individual que presenta foto, subregión con distintivo visual, clima, actividades y dificultad.
   - **Detalles extendidos**: Implementados con elementos semánticos nativos `<details>` y `<summary>` de HTML5 estilizados con Tailwind CSS.
   - **Justificación**: El acordeón nativo de HTML5 no requiere JavaScript para desplegar u ocultar los detalles adicionales del municipio.

6. **`Footer.astro`**
   - **Responsabilidad**: Enlaces internos de navegación rápida, créditos y mensaje normativo permanente de turismo responsable.
   - **Justificación**: Contenido completamente estático.

### 2.2 Componentes con Interactividad Cliente (Vanilla JS encapsulado)

1. **`Header.astro`**
   - **Responsabilidad**: Barra de navegación fija/adherida con enlaces de ancla a cada sección y botón de menú hamburguesa para pantallas móviles.
   - **Lógica interactiva**: Script ligero que gestiona el toggle del menú móvil modificando atributos de accesibilidad (`aria-expanded="true|false"` y clases de visibilidad).

2. **`Gallery.astro`**
   - **Responsabilidad**: Contenedor de la galería fotográfica. Renderiza en build todas las fotografías (mínimo 12) utilizando el componente nativo `<Image />` de `astro:assets`.
   - **Lógica interactiva**: Script en cliente para los botones de filtro (`Todos`, `Naturaleza`, `Aventura`, `Cultural`, `Aguas`). El filtrado no vuelve a renderizar ni manipula datos en memoria: conmuta clases de visibilidad (`hidden`) en el DOM según el atributo `data-category` de cada tarjeta, cumpliendo el límite de respuesta menor a 300 ms.

3. **`GalleryModal.astro`**
   - **Responsabilidad**: Vista ampliada en primer plano para las imágenes de la galería.
   - **Lógica interactiva**: Basada en el elemento nativo `<dialog>` de HTML5 con `role="dialog"` y `aria-modal="true"`. Al hacer clic en una tarjeta de la galería, el script asigna el `src` y `alt` correspondiente y llama a `modal.showModal()`. Se cierra mediante el botón de cierre, al hacer clic en el backdrop exterior o al pulsar la tecla `Escape`.

4. **`RouteMap.astro`**
   - **Responsabilidad**: Esquema gráfico visual de los circuitos territoriales de Occidente y Norte, acompañado de una botonera de selección semántica y un panel reactivo de detalles.
   - **Lógica interactiva**: Script que escucha los eventos `click` y teclado tanto en los botones de ruta (`<button>`) como en los trazados/nodos del SVG embebido. Actualiza el estado activo visual y los textos del panel de detalle con tiempos en rangos aproximados.

5. **`ContactForm.astro`**
   - **Responsabilidad**: Formulario de consulta demostrativa con campos de nombre, correo, destino de interés, experiencia y mensaje.
   - **Lógica interactiva**: Script que intercepta el evento `submit`, valida los campos obligatorios mediante la API de validación nativa (`checkValidity()`), previene el refresco (`event.preventDefault()`), muestra un contenedor accesible con `aria-live="polite"` con el mensaje de confirmación y reinicia los campos (`form.reset()`).

---

## 3. Esquemas de los Archivos de Datos JSON

Todos los datos residen en `src/data/` y se importan de forma estática en tiempo de construcción.

### 3.1 `src/data/destinations.json`

Contiene exactamente los 8 municipios oficiales de la versión 1.

#### Definición de tipos TypeScript:
```typescript
export interface Destination {
  id: string;
  name: string;
  subregion: "Occidente" | "Norte";
  climate: string;
  difficulty: "Baja" | "Media" | "Alta";
  activities: string[];
  summary: string;
  extendedDetails: {
    recommendedGear: string;
    bestSeason: string;
    localHighlights: string[];
  };
  image: string; // Solo el nombre del archivo, ej. "santa-fe-antioquia.webp"
}
```

#### Ejemplo de registro (`destinations.json`):
```json
[
  {
    "id": "santa-fe-de-antioquia",
    "name": "Santa Fe de Antioquia",
    "subregion": "Occidente",
    "climate": "Cálido seco (28°C promedio)",
    "difficulty": "Baja",
    "activities": ["Recorrido histórico colonial", "Agroturismo y frutales", "Caminatas ribereñas"],
    "summary": "Ciudad colonial patrimonio con calles empedradas, arquitectura del siglo XVI y proximidad al histórico Puente de Occidente sobre el río Cauca.",
    "extendedDetails": {
      "recommendedGear": "Ropa fresca, protector solar, sombrero y calzado cómodo para empedrado.",
      "bestSeason": "Todo el año; preferencia fines de semana secos de diciembre a marzo.",
      "localHighlights": ["Puente de Occidente", "Museo Juan del Corral", "Plaza Mayor"]
    },
    "image": "santa-fe-antioquia.webp"
  }
]
```

> **Resolución de imágenes en componentes con `import.meta.glob`**:
> El campo `image` guarda únicamente el nombre del archivo (sin rutas absolutas ni relativas). Para que el componente `<Image />` de `astro:assets` procese la imagen en tiempo de build, el componente resuelve el archivo local utilizando `import.meta.glob`:
> ```typescript
> import type { ImageMetadata } from 'astro';
> const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/destinations/*.webp', { eager: true });
> const imagePath = `/src/assets/images/destinations/${destination.image}`;
> const imageMetadata = images[imagePath]?.default;
> ```
> De este modo, el JSON queda limpio y agnóstico del sistema de archivos, y Astro obtiene el `ImageMetadata` necesario para optimización automática.

### 3.2 `src/data/gallery.json`

Contiene un mínimo de 12 registros distribuidos de manera equilibrada entre las 4 categorías temáticas.

#### Definición de tipos TypeScript:
```typescript
export interface GalleryItem {
  id: string;
  title: string;
  category: "naturaleza" | "aventura" | "cultural" | "aguas";
  location: string;
  alt: string;
  description: string;
  image: string; // Solo el nombre del archivo, ej. "gal-01.webp"
}
```

#### Ejemplo de registro (`gallery.json`):
```json
[
  {
    "id": "gal-01",
    "title": "Arquitectura Colonial y Sol",
    "category": "cultural",
    "location": "Santa Fe de Antioquia",
    "alt": "Calle empedrada con casonas coloniales blancas y balcones de madera en Santa Fe de Antioquia",
    "description": "Detalle patrimonial del centro histórico con iluminación de atardecer en el occidente antioqueño.",
    "image": "gal-01.webp"
  }
]
```

> **Resolución en Galería**: De forma análoga a destinos, el componente `Gallery.astro` resuelve las imágenes con `import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/gallery/*.webp', { eager: true })` mapeando por el nombre del archivo guardado en el JSON.

### 3.3 `src/data/routes.json`

Contiene los 3 circuitos sugeridos definidos en la especificación funcional. Los tiempos de trayecto se expresan estrictamente en rangos aproximados realistas para evitar falsa precisión.

#### Definición de tipos TypeScript:
```typescript
export interface SuggestedRoute {
  id: string;
  name: string;
  zone: "Occidente fluvial/colonial" | "Occidente de cordillera" | "Norte verde";
  approximateDuration: string;
  roadType: string;
  effortLevel: "Bajo" | "Moderado" | "Exigente";
  description: string;
  stops: string[];
}
```

#### Ejemplo de registro (`routes.json`):
```json
[
  {
    "id": "ruta-sol-patrimonio",
    "name": "Ruta Sol y Patrimonio",
    "zone": "Occidente fluvial/colonial",
    "approximateDuration": "Aprox. 2 a 3 horas en trayectos terrestres",
    "roadType": "Vía pavimentada secundaria y terciaria en buen estado",
    "effortLevel": "Bajo",
    "description": "Circuito que articula la historia colonial y el clima cálido del valle del río Cauca, conectando arquitectura patrimonial con gastronomía campesina tradicional.",
    "stops": ["Santa Fe de Antioquia", "San Jerónimo", "Ebéjico"]
  }
]
```

---

## 4. Implementación Técnica por Sección

### 4.1 Encabezado y Navegación (`Header.astro`)
- **Estructura**: Elemento `<header>` fijado en la parte superior con contenedor semántico `<nav aria-label="Navegación principal">`.
- **Navegación Desktop**: Lista `<ul>` con enlaces hacia `#destinos`, `#galeria`, `#rutas`, `#contacto`.
- **Menú Móvil**: Botón con `aria-controls="mobile-menu"`, `aria-expanded="false"` y un ícono SVG accesible. Un script en línea controla la visibilidad del menú en pantallas inferiores a `md: (768px)`.
- **Cierre automático**: Al pulsar cualquier enlace del menú móvil, el menú se repliega de inmediato.
- **Compensación de cabecera fija (`scroll-margin-top`)**: Dado que el encabezado tiene posición fija (`fixed` o `sticky`), todas las secciones con ancla (`#destinos`, `#galeria`, `#rutas`, `#contacto`) deben incluir la clase `scroll-mt-20` (o `scroll-mt-24` de Tailwind) para evitar que el header tape o solape los títulos al navegar mediante los enlaces internos.

### 4.2 Portada (`Hero.astro`)
- **Estructura**: Sección con fondo optimizado mediante `<Image />` de `astro:assets` con prioridad de carga (`loading="eager"` o `fetchpriority="high"`), overlay con contraste accesible (ratio > 4.5:1 para el texto).
- **Contenido**: Título principal `<h1>` centrado en la biodiversidad y conservación, párrafo descriptivo y botón `<a href="#destinos">` con estilo de botón primario.
- **Scroll suave**: Manejado globalmente mediante la clase `scroll-smooth` en el elemento `html` en `BaseLayout.astro`.

### 4.3 Catálogo de Destinos (`Destinations.astro` y `DestinationCard.astro`)
- **Organización visual**: Cuadrícula responsive (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
- **Diferenciación geográfica**: Badges distintivos basados en Tailwind:
  - *Occidente*: paleta ámbar/terracota cálida (`bg-amber-100 text-amber-800 border-amber-300`).
  - *Norte*: paleta esmeralda/verde bosque fría (`bg-emerald-100 text-emerald-800 border-emerald-300`).
- **Detalle extendido**: Elemento nativo `<details class="group">` con `<summary class="cursor-pointer font-medium focus-visible:ring-2 ...">` que expone indumentaria sugerida y puntos de interés sin intervención de JavaScript.

### 4.4 Galería Interactiva con Visor (`Gallery.astro` y `GalleryModal.astro`)
- **Renderizado SSG**: Cada una de las 12+ imágenes se procesa en build con `<Image />` de Astro (generando WebP optimizado con `width`, `height` y `loading="lazy"`).
- **Controles de filtro**: Barra de botones con atributos `data-filter="todos|naturaleza|aventura|cultural|aguas"`.
- **Mecanismo de filtrado**:
  - Evento `click` delegado en el contenedor de filtros.
  - El script itera sobre las tarjetas `.gallery-item`: si la categoría coincide con el filtro activo (o si es "todos"), remueve la clase `hidden`; de lo contrario, agrega `hidden`.
  - Transición rápida que se ejecuta en menos de 50 ms en el cliente, muy por debajo del requisito de 300 ms.
- **Visor Modal (`GalleryModal.astro`)**:
  - Elemento nativo `<dialog id="gallery-dialog" class="backdrop:bg-black/80 ...">`.
  - Script que escucha el clic en cualquier botón de tarjeta de la galería, inyecta la URL de alta resolución y el texto descriptivo, y ejecuta `dialog.showModal()`.
  - Se escuchan eventos de cierre en el botón explícito, en el evento `click` sobre el backdrop (`event.target === dialog`) y en la tecla `Escape` (manejada de forma nativa por el elemento `<dialog>`).

### 4.5 Mapa Esquemático de Rutas (`RouteMap.astro`)
- **Composición del componente**:
  - **Columna / Área Gráfica**: SVG vectorial personalizado con `viewBox="0 0 800 600"`, trazados (`<path>`) de las 3 rutas y nodos circulares (`<g role="button">`) para los 8 municipios.
  - **Botonera de Control Accesible**: Lista de `<button>` semánticos visibles adyacentes al mapa, permitiendo seleccionar directamente cualquiera de las 3 rutas sin depender exclusivamente de punteros o clics sobre el SVG.
  - **Panel de Detalle**: Tarjeta informativa con `role="region"` y `aria-live="polite"` que presenta: nombre de la ruta, zona territorial, tiempo estimado (rango aproximado), tipo de camino, nivel de esfuerzo y listado secuencial de paradas.
- **Lógica de sincronización**:
  - Un único manejador de estado en el script del componente almacena la ruta activa actual.
  - Al seleccionar una ruta (ya sea desde un botón accesible o desde un trazado SVG), se actualizan las clases CSS de resaltado (`stroke-emerald-600`, `stroke-[3px]`) y se inyecta la información correspondiente en el panel.

### 4.6 Formulario Simulado de Consulta (`ContactForm.astro`)
- **Campos del formulario**:
  - Nombre completo (`<input type="text" required>`).
  - Correo electrónico (`<input type="email" required>`).
  - Destino de interés (`<select required>` poblado con los 8 destinos).
  - Experiencia deseada (`<select required>` con naturaleza, aventura, cultural, aguas).
  - Mensaje / Preguntas (`<textarea required rows="4">`).
- **Validación accesible**:
  - Se utiliza `form.checkValidity()`. Si un campo falla, se le asigna `aria-invalid="true"` y se despliega un mensaje de error visual adyacente vinculado mediante `aria-describedby`.
- **Procesamiento simulado**:
  - Evento `submit` interceptado con `event.preventDefault()`.
  - Al superar la validación, se oculta temporalmente el cuerpo del formulario o se despliega una alerta de éxito con `role="status"` y `aria-live="polite"`.
  - Se ejecuta `form.reset()` para limpiar las entradas. No se genera ninguna petición `fetch` ni comunicación de red.

### 4.7 Pie de Página (`Footer.astro`)
- **Contenido**: Enlaces de navegación rápida duplicados para acceso ágil, créditos de desarrollo regional y mensaje enfático y permanente de ecoturismo responsable, visible en todas las resoluciones.

---

## 5. Decisiones Técnicas Justificadas

### 5.1 Origen y Manejo de Imágenes

- **Origen de las imágenes**: Fotografías con licencias libres obtenidas de Wikimedia Commons (o placeholders temporales para el prototipo inicial), descargadas manualmente por el usuario y almacenadas localmente en `src/assets/images/`.
- **Registro de atribución y licencias (`docs/CREDITS.md`)**: Se mantiene un archivo dedicado `docs/CREDITS.md` en el que se anota estrictamente cada recurso gráfico: autor/fotógrafo, enlace a la fuente original en Wikimedia Commons y el tipo de licencia abierta correspondiente (ej. CC BY-SA 4.0, CC BY 2.0, Dominio Público).
- **Prohibición de URLs inventadas o externas**: Queda terminantemente prohibido inventar URLs ficticias, enlazar a servicios externos o solicitar recursos remotos en tiempo de ejecución. Todo activo reside localmente en el repositorio.
- **Estrategia de Placeholders**: Si alguna fotografía definitiva no está disponible durante el desarrollo, se utilizarán imágenes o vectores locales temporales dentro de `src/assets/images/`, respetando rigurosamente las relaciones de aspecto establecidas (16:9 para hero y galería, 4:3 para tarjetas de destinos).
- **Resolución y Optimización con `astro:assets`**:
  - Los componentes resuelven las imágenes mediante `import.meta.glob` a partir del nombre de archivo registrado en los esquemas JSON.
  - Se utiliza el componente nativo `<Image />` de Astro para compilar automáticamente en formatos modernos (WebP/AVIF), calcular dimensiones exactas para prevenir el Cumulative Layout Shift (CLS) y aplicar `loading="lazy"` por defecto (`loading="eager"` en el Hero).

### 5.2 Mapa SVG Propio vs. Librería Externa (Leaflet / Mapbox)
- **Decisión**: Implementación mediante un **SVG vectorial propio embebido**, descartando por completo Leaflet, Mapbox o Google Maps.
- **Justificación Técnica**:
  - *Sobrecarga de JavaScript*: Leaflet o Mapbox añaden entre 150 KB y 250 KB de JavaScript minificado, más hojas de estilo externas y decenas de peticiones HTTP para baldosas de mapas (tiles).
  - *Naturaleza del problema*: La especificación demanda un esquema visual simplificado y conceptual de 8 municipios y 3 rutas en dos subregiones, no navegación por GPS ni geolocalización satelital.
  - *Rendimiento y Zero-JS*: Un SVG embebido pesa menos de 10 KB, se escala limpiamente en cualquier densidad de pantalla (`viewBox` responsivo), se estiliza mediante clases de Tailwind y es 100% gobernable con botones nativos accesibles sin dependencias externas.

### 5.3 Validación del Formulario (Nativa + Vanilla Script vs. Librerías Externas)
- **Decisión**: Uso de la **Constraint Validation API de HTML5** complementada con un script ligero de JavaScript nativo para feedback visual y accesibilidad ARIA.
- **Justificación Técnica**:
  - Incorporar librerías como Zod, Formik o React Hook Form en el cliente introduce bundles innecesarios y obliga a acoplarse a un framework de componentes.
  - Los navegadores modernos proveen validación robusta y estandarizada (`checkValidity()`, `validity.valid`, patrones regex). El script solo requiere interceptar el envío, prevenir el comportamiento por defecto del navegador y actualizar el DOM de forma accesible.

### 5.4 Arquitectura Zero-Framework (Vanilla JS en `<script>` de Astro)
- **Decisión**: No instalar ni configurar ningún framework de interfaz de usuario (React, Vue, Svelte, Preact).
- **Justificación Técnica**:
  - Astro permite escribir etiquetas `<script>` estándar dentro de los archivos `.astro`. Astro empaqueta, procesa TypeScript y optimiza estos scripts automáticamente.
  - Todas las interacciones de la aplicación son interacciones clásicas y discretas: alternar una clase CSS, llamar a la API de un `<dialog>` nativo y escuchar un evento de formulario. Pagar el costo de descarga, hidratación y reconciliación de un virtual DOM de un framework es una mala práctica arquitectónica frente a la especificación dada.

---

## 6. Matriz de Trazabilidad de Criterios de Aceptación (CA)

La siguiente tabla mapea la totalidad de los criterios de aceptación especificados en `docs/01-spec.md` contra los componentes y archivos responsables de su cumplimiento:

| Criterio | Descripción del Criterio | Componente Responsable | Archivo Fuente | Mecanismo de Cumplimiento Técnico |
| :--- | :--- | :--- | :--- | :--- |
| **CA-HERO-01** | Al pulsar el botón CTA, la vista se desplaza a destinos sin saltos bruscos. | `Hero.astro` | `src/components/sections/Hero.astro` | Enlace `<a href="#destinos">` combinado con regla CSS global `scroll-smooth` en `BaseLayout.astro`. |
| **CA-HERO-02** | Sin scroll horizontal ni texto cortado entre 320 px y 1920 px de ancho. | `Hero.astro` / `BaseLayout.astro` | `src/components/sections/Hero.astro`, `src/layouts/BaseLayout.astro` | Maquetación con Tailwind mobile-first (`w-full`, `max-w-7xl`, `px-4`, `overflow-x-hidden` en body). |
| **CA-DEST-01** | Presenta exactamente los 8 destinos oficiales de la versión 1. | `Destinations.astro` | `src/components/sections/Destinations.astro`, `src/data/destinations.json` | Carga de `destinations.json` (exactamente 8 entradas) y mapeo estático con `.map()`. |
| **CA-DEST-02** | Cada ficha muestra visiblemente: nombre, subregión, clima, dificultad y >= 2 actividades. | `DestinationCard.astro` | `src/components/sections/DestinationCard.astro` | Maquetación semántica en tarjeta con elementos dedicados para cada propiedad del esquema de datos. |
| **CA-DEST-03** | Pertenencia geográfica claramente diferenciada visualmente (Occidente vs Norte). | `DestinationCard.astro` | `src/components/sections/DestinationCard.astro` | Clases condicionales de Tailwind: badges y acentos ámbar para Occidente y esmeralda para Norte. |
| **CA-GAL-01** | Filtro temático oculta elementos no coincidentes en menos de 300 ms. | `Gallery.astro` | `src/components/sections/Gallery.astro` | Script Vanilla JS que conmuta la clase `hidden` en el DOM según `data-category` (< 50 ms). |
| **CA-GAL-02** | Filtro "Todos" restablece visibilidad de la totalidad del catálogo fotográfico. | `Gallery.astro` | `src/components/sections/Gallery.astro` | Script que remueve la clase `hidden` de todos los elementos `.gallery-item`. |
| **CA-GAL-03** | Selección de fotografía abre vista ampliada con imagen, título y control de cierre. | `GalleryModal.astro` | `src/components/sections/GalleryModal.astro` | Invocación de `dialog.showModal()` inyectando los atributos de la imagen seleccionada. |
| **CA-GAL-04** | Visor se cierra inmediatamente por botón, clic fuera (backdrop) o tecla Escape. | `GalleryModal.astro` | `src/components/sections/GalleryModal.astro` | Manejo nativo de tecla `Escape` en `<dialog>`, evento en botón de cierre y listener en backdrop. |
| **CA-GAL-05** | Contiene al menos 12 imágenes distribuidas en las 4 categorías. | `Gallery.astro` | `src/data/gallery.json` | Archivo `gallery.json` configurado con >= 12 elementos cubriendo naturaleza, aventura, cultural y aguas. |
| **CA-MAP-01** | Incluye las 3 rutas sugeridas (Sol y Patrimonio, Bosques y Cañones, Aguas del Norte). | `RouteMap.astro` | `src/components/sections/RouteMap.astro`, `src/data/routes.json` | Datos en `routes.json` y trazados vectoriales correspondientes dentro del SVG esquemático. |
| **CA-MAP-02** | Al seleccionar ruta/destino, el panel actualiza tiempo aproximado, paradas y descripción. | `RouteMap.astro` | `src/components/sections/RouteMap.astro` | Script reactivo que actualiza el contenedor del panel con los atributos del JSON usando rangos de tiempo. |
| **CA-MAP-03** | Todos los controles de selección del mapa son operables secuencialmente por teclado. | `RouteMap.astro` | `src/components/sections/RouteMap.astro` | Botones semánticos `<button>` asociados a cada ruta y elementos SVG con `tabindex="0"` y eventos `keydown`. |
| **CA-CON-01** | Formulario no procesa y señala campos faltantes si hay requeridos vacíos. | `ContactForm.astro` | `src/components/sections/ContactForm.astro` | Verificación con `checkValidity()`, asignación de `aria-invalid="true"` y mensajes de error visibles. |
| **CA-CON-02** | Al enviar datos válidos, muestra mensaje de confirmación de registro exitoso. | `ContactForm.astro` | `src/components/sections/ContactForm.astro` | Despliegue de alerta de éxito con `role="status"` y `aria-live="polite"` en el DOM sin recargar la página. |
| **CA-CON-03** | Tras el envío, los campos se limpian automáticamente y no hay llamadas de red. | `ContactForm.astro` | `src/components/sections/ContactForm.astro` | Invocación de `form.reset()`, `event.preventDefault()` y ausencia total de llamadas `fetch` o `XHR`. |
| **CA-NAV-01** | Todos los enlaces de navegación conducen a sus secciones en la misma página. | `Header.astro` / `Footer.astro` | `src/components/layout/Header.astro`, `src/components/layout/Footer.astro` | Enlaces ancla `#destinos`, `#galeria`, `#rutas`, `#contacto` validados contra los IDs de sección, con `scroll-mt-20` en cada sección para compensar la cabecera fija. |
| **CA-NAV-02** | Mensaje de preservación ambiental visible en el footer en toda resolución. | `Footer.astro` | `src/components/layout/Footer.astro` | Párrafo normativo estático maquetado con visibilidad permanente en el pie de página. |
