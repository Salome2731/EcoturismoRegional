# Constitución del Proyecto: Ecoturismo Antioquia

Documento normativo de arquitectura y principios de desarrollo para la landing page interactiva de ecoturismo regional en Antioquia, Colombia. Estas reglas son permanentes e inmutables durante el ciclo de vida del proyecto bajo la metodología Spec-Driven Development (SDD).

---

## 1. Stack Tecnológico

- **Framework**: Astro (arquitectura orientada a contenido y generación estática SSG).
- **Estilos**: Tailwind CSS (enfoque de utilidades atómicas, consistente y responsivo).
- **Gestión de datos**: Archivos JSON locales estructurados en `src/data/`. Prohibido el uso de bases de datos externas o llamadas a servicios backend.
- **Despliegue**: Vercel (configurado para salida estática).

---

## 2. Código Limpio y Convenciones de Nomenclatura

- **Componentes Astro**: `PascalCase.astro` (ej. `DestinationCard.astro`, `InteractiveGallery.astro`, `RouteMap.astro`).
- **Layouts**: `PascalCase.astro` (ej. `BaseLayout.astro`).
- **Páginas y rutas**: `kebab-case.astro` respetando el sistema de enrutamiento basado en archivos de Astro.
- **Archivos de datos JSON**: `kebab-case.json` (ej. `destinations.json`, `routes.json`).
- **Módulos y utilidades JS/TS**: `kebab-case.ts` o `camelCase.ts` según convención funcional.
- **Principios de diseño**:
  - Responsabilidad única por componente (Single Responsibility Principle).
  - Separación estricta entre estructura de datos (JSON), maquetación (Astro/HTML) y comportamiento interactivo.
  - Prohibida la duplicación de lógica y el uso de estilos inline.

---

## 3. Diseño Responsivo Mobile-First

- **Estrategia**: Todo componente y vista debe estructurarse y estilizarse primero para pantallas móviles (`< 640px`).
- **Escalabilidad**: Adaptación progresiva a pantallas más amplias utilizando exclusivamente los prefijos de Tailwind CSS (`sm:`, `md:`, `lg:`, `xl:`).
- **Semántica HTML**: Uso obligatorio de etiquetas semánticas (`header`, `main`, `section`, `article`, `nav`, `footer`).

---

## 4. Accesibilidad Web (a11y)

- **Imágenes**: Atributo `alt` descriptivo y significativo en toda imagen de contenido. Las imágenes estrictamente decorativas deben incluir `alt=""` y `aria-hidden="true"`.
- **Contraste**: Cumplimiento del nivel AA de las WCAG 2.1 (ratio mínimo de contraste de 4.5:1 para texto normal y 3:1 para texto grande o elementos de interfaz).
- **Navegación por teclado**: Todo elemento interactivo (`a`, `button`, controles de filtro o mapa) debe ser accesible por teclado con estados de foco visibles y definidos (`focus-visible`).
- **Jerarquía de títulos**: Jerarquía estricta (`h1` a `h6`) sin omitir niveles.

---

## 5. Rendimiento y Optimización

- **Zero-JS por defecto**: Todo componente que no requiera interactividad del lado del cliente se genera como HTML estático puro.
- **Islas interactivas aisladas**: Las partes interactivas (galería, mapa de rutas) se encapsulan como islas usando directivas de cliente de Astro (`client:load`, `client:visible`).
- **Optimización de imágenes**: Uso del componente nativo `Image` de Astro (`astro:assets`) para generación automática de formatos modernos (WebP/AVIF), dimensiones explícitas y carga diferida (`loading="lazy"`).

---

## 6. Control de Contexto y Proceso de Trabajo (SDD)

- **Una tarea a la vez**: El desarrollo avanza estrictamente de forma secuencial. No se inicia una nueva tarea sin validar y cerrar la anterior.
- **Lectura previa mandatoria**: Antes de cualquier implementación o modificación técnica, es obligatorio consultar y validar los documentos normativos en `docs/`.
- **Trazabilidad**: Ninguna funcionalidad entra al código fuente sin estar previamente especificada en la documentación del proyecto.

---

## 7. Alcance del Proyecto (Scope)

### Dentro de alcance (In Scope)
- Landing page interactiva con catálogo de destinos ecoturísticos de Antioquia.
- Galería interactiva con filtrado visual por categorías (ej. senderismo, avistamiento, aventura).
- Mapa visual de rutas y senderos interactivo basado en datos locales.
- Consumo exclusivo de datos estructurados en archivos JSON locales.

### Fuera de alcance (Out of Scope)
- Servidores dedicados, APIs dinámicas o capas de backend.
- Autenticación, registro de usuarios o gestión de sesiones/login.
- Pasarelas de pago, reservas transaccionales o procesamiento financiero.
- Formularios con persistencia en bases de datos.
