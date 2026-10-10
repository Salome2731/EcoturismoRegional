# Especificación Funcional: Landing Page de Ecoturismo en Antioquia

Documento funcional que define los objetivos, usuarios, funcionalidades y comportamiento esperado de la landing page de ecoturismo regional en Antioquia para la versión 1.

---

## 1. Objetivo del Producto y Público Objetivo

### 1.1 Objetivo del Producto
Brindar una experiencia digital interactiva, cercana e inspiradora que promueva el ecoturismo responsable en los municipios de las subregiones Occidente y Norte de Antioquia. La plataforma busca conectar a viajeros conscientes con la riqueza natural, histórica y cultural de estos territorios, facilitando la exploración visual de destinos, la consulta de rutas sugeridas y el contacto informativo simulado sin fricciones.

### 1.2 Público Objetivo
- **Ecoturistas y senderistas**: Personas interesadas en caminatas ecológicas, avistamiento de flora y fauna, y actividades al aire libre con impacto ambiental mínimo.
- **Viajeros culturales y de fin de semana**: Turistas regionales y nacionales que buscan escapadas cortas, patrimonio histórico colonial y tradiciones campesinas.
- **Comunidades locales y guías regionales**: Promotores de la conservación que buscan dar visibilidad a destinos no masivos ni saturados.

---

## 2. Historias de Usuario

1. **Como viajero ecológico**, quiero explorar una lista organizada de destinos con sus características clave para identificar opciones acordes a mis preferencias de viaje.
2. **Como amante de la fotografía y la naturaleza**, quiero filtrar la galería visual por categorías temáticas (naturaleza, aventura, cultural, aguas) para visualizar el tipo de paisajes que ofrece cada experiencia.
3. **Como usuario visual**, quiero abrir cualquier fotografía en una vista ampliada para apreciar los detalles del entorno antes de planificar mi visita.
4. **Como senderista planificador**, quiero consultar un mapa esquemático interactivo con rutas sugeridas entre destinos cercanos para organizar recorridos lógicos por la misma zona.
5. **Como visitante primerizo**, quiero conocer el clima, nivel de dificultad de acceso y actividades recomendadas de cada municipio para preparar la indumentaria y equipo adecuados.
6. **Como usuario interesado en asesoría**, quiero diligenciar un formulario de consulta simulado para verificar cómo solicitar acompañamiento o recomendaciones de viaje.
7. **Como usuario que navega mediante teclado o tecnologías de asistencia**, quiero recorrer e interactuar con cada sección de forma ordenada y accesible para acceder a toda la información sin barreras.

---

## 3. Estructura y Secciones de la Landing Page

### 3.1 Sección de Portada (Hero)
- **Qué ve el usuario**:
  - Un encabezado principal inspirador que destaca la biodiversidad y geografía de Antioquia.
  - Un mensaje de bienvenida cercano que invita a viajar con respeto y conciencia ambiental.
  - Una fotografía panorámica representativa de alto impacto.
  - Un botón de llamada a la acción principal para iniciar la exploración.
- **Qué puede hacer el usuario**:
  - Leer la propuesta de valor del portal.
  - Activar el botón de llamada a la acción para desplazarse suavemente hacia la sección de destinos.

### 3.2 Catálogo de Destinos (Occidente y Norte)
- **Destinos incluidos en la v1**:
  - **Subregión Occidente**: Santa Fe de Antioquia, Ebéjico, San Jerónimo, Abriaquí, Peque.
  - **Subregión Norte**: Toledo, Ituango, San José de la Montaña.
- **Qué ve el usuario**:
  - Fichas individuales para cada uno de los 8 destinos, organizadas con indicación clara de su subregión.
  - Cada ficha contiene: nombre del municipio, fotografía representativa, clima promedio, actividades destacadas (ej. agroturismo, senderismo, patrimonio, deportes náuticos o de río), nivel de dificultad o acceso, y un resumen narrativo breve.
- **Qué puede hacer el usuario**:
  - Leer la información esencial de cada destino.
  - Identificar visualmente a qué subregión pertenece cada municipio.
  - Interactuar con la ficha para consultar los detalles extendidos de la localidad.

### 3.3 Galería Interactiva con Filtros y Vista Ampliada
- **Qué ve el usuario**:
  - Una barra o grupo de controles de filtrado por categoría temática:
    - Todos
    - Naturaleza
    - Aventura
    - Cultural
    - Aguas
  - Una cuadrícula de imágenes fotográficas correspondientes a los destinos, cada una rotulada con su nombre, categoría y ubicación.
- **Qué puede hacer el usuario**:
  - Seleccionar un filtro para visualizar únicamente las imágenes correspondientes a esa temática.
  - Seleccionar cualquier fotografía para abrirla en un visor ampliado en primer plano.
  - En la vista ampliada: observar la imagen en gran formato, leer su pie descriptivo y cerrar el visor mediante un botón visible o la tecla de escape.

### 3.4 Mapa Esquemático de Rutas Sugeridas
- **Qué ve el usuario**:
  - Un esquema visual simplificado del territorio que ubica los destinos de Occidente y Norte.
  - Trazados visuales que representan circuitos sugeridos entre municipios de la misma zona:
    - *Ruta Sol y Patrimonio (Occidente fluvial/colonial)*: Santa Fe de Antioquia – San Jerónimo – Ebéjico.
    - *Ruta Bosques y Cañones (Occidente de cordillera)*: Abriaquí – Peque.
    - *Ruta Aguas del Norte (Norte verde)*: Toledo – San José de la Montaña – Ituango.
  - Un panel lateral o inferior con el detalle de la ruta seleccionada: duración estimada en transporte terrestre, tipo de camino, paradas recomendadas y nivel de esfuerzo.
- **Qué puede hacer el usuario**:
  - Seleccionar una ruta o un punto del mapa para actualizar la información del panel de detalle.
  - Visualizar la secuencia lógica del itinerario sugerido entre municipios vecinos.

### 3.5 Formulario Simulado de Contacto y Guía
- **Qué ve el usuario**:
  - Campos de entrada: Nombre completo, Correo electrónico, Destino de interés (menú desplegable con los 8 destinos de la v1), Tipo de experiencia deseada (naturaleza, aventura, cultural, aguas), y Área de mensaje/preguntas.
  - Botón de acción para enviar la solicitud.
  - Nota aclaratoria de que se trata de un canal demostrativo para planificadores de ecoturismo.
- **Qué puede hacer el usuario**:
  - Diligenciar sus datos y preferencias de viaje.
  - Pulsar el botón de envío.
  - Visualizar un mensaje de éxito en pantalla confirmando la recepción simulada de su solicitud sin salir de la página.

### 3.6 Pie de Página (Footer)
- **Qué ve el usuario**:
  - Mensaje de compromiso con el turismo sostenible y la preservación de ecosistemas.
  - Enlaces de navegación rápida hacia cada sección de la landing page.
  - Créditos informativos y mención de origen regional.
- **Qué puede hacer el usuario**:
  - Navegar de regreso a las secciones superiores de forma directa.

---

## 4. Criterios de Aceptación Medibles y Verificables

### 4.1 Portada (Hero)
- **CA-HERO-01**: Al presionar el botón de llamada a la acción, la vista se desplaza directamente a la sección de destinos sin saltos bruscos.
- **CA-HERO-02**: Sin scroll horizontal ni texto cortado entre 320 px y 1920 px de ancho.

### 4.2 Catálogo de Destinos
- **CA-DEST-01**: La sección presenta exactamente los 8 destinos oficiales definidos para la versión 1 (Santa Fe de Antioquia, Ebéjico, San Jerónimo, Abriaquí, Peque, Toledo, Ituango, San José de la Montaña).
- **CA-DEST-02**: Cada ficha de destino muestra visiblemente: nombre, subregión (Occidente o Norte), clima, nivel de dificultad y al menos 2 actividades recomendadas.
- **CA-DEST-03**: La pertenencia geográfica de cada destino está claramente diferenciada visualmente entre Occidente y Norte.

### 4.3 Galería Interactiva
- **CA-GAL-01**: Al seleccionar una categoría (Naturaleza, Aventura, Cultural, Aguas), se presentan exclusivamente los elementos fotográficos clasificados bajo dicha categoría, ocultando los restantes en menos de 300 ms.
- **CA-GAL-02**: Al activar la opción "Todos", se restablece la visibilidad de la totalidad del catálogo fotográfico.
- **CA-GAL-03**: Al activar cualquier fotografía, se abre una vista ampliada en primer plano que contiene la imagen, su título descriptivo y un control de cierre visible.
- **CA-GAL-04**: La vista ampliada se cierra inmediatamente al pulsar el botón de cierre, al hacer clic fuera del recuadro de la imagen, o al presionar la tecla de escape en el teclado.
- **CA-GAL-05**: Contiene al menos 12 imágenes distribuidas en las 4 categorías.

### 4.4 Mapa de Rutas Sugeridas
- **CA-MAP-01**: El mapa incluye las 3 rutas sugeridas entre destinos de la misma zona (Sol y Patrimonio, Bosques y Cañones, Aguas del Norte).
- **CA-MAP-02**: Al seleccionar una ruta o un destino en el mapa, el panel informativo actualiza su contenido con el tiempo estimado, las paradas recomendadas y la descripción del trayecto correspondiente.
- **CA-MAP-03**: Todos los controles de selección del mapa son operables secuencialmente mediante teclado.

### 4.5 Formulario de Contacto Simulado
- **CA-CON-01**: Si el usuario intenta enviar el formulario con campos obligatorios vacíos (nombre, correo o mensaje), el sistema no procesa la acción y señala de forma visual los campos faltantes.
- **CA-CON-02**: Cuando todos los datos requeridos son válidos, al presionar el botón de envío se muestra un mensaje de confirmación que notifica el registro exitoso de la consulta demostrativa.
- **CA-CON-03**: Tras la confirmación del envío, los campos del formulario se limpian automáticamente y la página no se recarga ni intenta comunicarse con redes o servicios externos.

### 4.6 Navegación y Pie de Página
- **CA-NAV-01**: Todos los enlaces de navegación conducen a sus secciones correspondientes de la misma página.
- **CA-NAV-02**: El mensaje de preservación ambiental y turismo responsable permanece visible en el pie de página en toda resolución.

---

## 5. Requisitos No Funcionales

Los requisitos no funcionales de esta especificación se rigen por los principios inmutables establecidos en la Constitución del Proyecto (`docs/00-constitution.md`):

1. **Diseño y Adaptabilidad**: La experiencia de usuario debe concebirse prioritariamente para dispositivos móviles pequeños y escalar armoniosamente hacia pantallas de escritorio, garantizando legibilidad y áreas táctiles confortables según la norma de diseño estipulada en la constitución.
2. **Accesibilidad Universal**: Toda la estructura informativa, contrastes de color, textos alternativos para contenido gráfico y navegación por teclado deben cumplir estrictamente el estándar de accesibilidad definido en la constitución.
3. **Eficiencia y Carga Rápida**: La entrega de contenido y recursos visuales debe operar bajo los principios de máxima optimización, ligereza y entrega sin sobrecargas estipulados en la constitución.
4. **Autonomía y Privacidad**: La solución debe operar de manera completamente autónoma sin persistencia en bases de datos ni envío de datos sensibles a servicios de terceros, alineándose con el alcance delimitado en la constitución.
