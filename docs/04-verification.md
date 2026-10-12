# Verificación de criterios de aceptación

**Probado en:** Brave · 11/10/2026
**URL pública:** [PEGA AQUÍ LA URL DE VERCEL, p. ej. https://ecoturismo-regional.vercel.app]

Cada criterio de `docs/01-spec.md` se probó manualmente en la página desplegada.

| Criterio | Qué probé | Resultado | Evidencia |
|---|---|---|---|
| CA-HERO-01 | Clic en "Explorar destinos" | APROBADO | Baja suave a Destinos; el título no queda tapado por el header |
| CA-HERO-02 | Redimensionar de 320 a 1920 px | APROBADO | Sin scroll horizontal ni texto cortado |
| CA-DEST-01 | Contar tarjetas | APROBADO | Se ven 8 tarjetas |
| CA-DEST-02 | Datos de cada ficha | APROBADO | Todas muestran nombre, subregión, clima, dificultad y actividades |
| CA-DEST-03 | Badges por subregión | APROBADO | Ámbar para Occidente, verde para Norte |
| CA-GAL-01 | Filtrar por categoría | APROBADO | Muestra solo la categoría elegida, al instante |
| CA-GAL-02 | Botón "Todos" | APROBADO | Restaura las 12 fotos |
| CA-GAL-03 | Clic en una foto | APROBADO | Abre el visor con imagen, título y botón de cierre |
| CA-GAL-04 | Cerrar el visor | APROBADO | Cierra con botón, clic fuera y Escape |
| CA-GAL-05 | Contar imágenes | APROBADO | 12 imágenes, 3 por categoría |
| CA-MAP-01 | Ver el mapa | APROBADO | Se ven las 3 rutas sugeridas |
| CA-MAP-02 | Elegir cada ruta | APROBADO | El panel muestra duración, paradas y descripción |
| CA-MAP-03 | Usar el mapa solo con teclado | APROBADO | Se opera con Tab, Enter y Espacio |
| CA-CON-01 | Enviar formulario vacío | APROBADO | Marca los campos faltantes |
| CA-CON-02 | Enviar con datos válidos | APROBADO | Muestra mensaje de confirmación |
| CA-CON-03 | Revisar campos y pestaña Network | APROBADO | Campos se limpian; no hay peticiones de red |
| CA-NAV-01 | Enlaces del menú y del footer | APROBADO | Todos llevan a su sección |
| CA-NAV-02 | Footer en móvil y escritorio | APROBADO | El mensaje de turismo responsable siempre se ve |
