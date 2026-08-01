# Requisitos y Especificaciones Técnicas
## Plataforma Web de Difusión y Vinculación Académica: CREN (México) – UMCE (Chile)

---

## 1. Información General del Proyecto

- **Nombre del Proyecto de Investigación:**  
  *Análisis Comparativo de los Modelos de Formación Docente Inicial y su Incidencia en las Prácticas Pedagógicas Contemporáneas: Una Perspectiva desde el Normalismo Mexicano y la Tradición Pedagógica Chilena.*
- **Instituciones Participantes:**
  - **México:** Centro Regional de Educación Normal (CREN) Dr. "Gonzalo Aguirre Beltrán" (Tuxpan, Veracruz).
  - **Chile:** Universidad Metropolitana de Ciencias de la Educación (UMCE) (Santiago, Chile).
- **Titulares del Proyecto:**
  - Ana Concepción Neri Santiago
  - Oscar Daniel Solís Castán
- **Periodo de Ejecución:** Agosto - Septiembre 2026.
- **Propósito de la Plataforma Web:** Sitio digital interactivo de acceso abierto para la comunidad educativa interesada, diseñado para visibilizar los resultados de la movilidad académica, integrar los productos desarrollados y fomentar una red permanente de colaboración entre ambas instituciones.

---

## 2. Objetivos de la Plataforma Web

1. **Difusión Académica:** Presentar de manera clara y directa los hallazgos del análisis comparativo entre la Nueva Escuela Mexicana (NEM) y el modelo pedagógico de la UMCE.
2. **Repositorio de Productos:** Alojar y permitir la consulta de 4 entregables principales: Video-Documental, Dossier/Catálogo, Propuesta Pedagógica e Informe Técnico.
3. **Vinculación e Interculturalidad:** Visibilizar las actividades de reciprocidad (Ponencia NEM y Taller de Expresión Corporal y Multiculturalidad).
4. **Contacto y Enrutamiento Dinámico:** Canal de comunicación integrado a servidor backend para envío directo de correos a CREN o UMCE según selección.
5. **Métricas de Impacto:** Integración con Google Analytics (GA4) para seguimiento de tráfico y descargas.

---

## 3. Filosofía de Diseño UI/UX y Alineación Visual

### 3.1. Enfoque Minimalista ("Menos es Más")
- **Visualización Limpia:** Estructura idéntica a la maqueta de referencia institucional, con tipografía Inter y alto nivel de legibilidad.
- **Hero Banner Personalizado:** Fondo con la imagen `img/banner_section.PNG` y gradientes de superposición (México/Chile) con mapa y banderas integradas.
- **Bloque de Cita Inspiradora:** Tarjeta flotante con avatar de Gabriela Mistral, comillas doradas `“` y cita destacada.
- **Paleta de Colores Institucional:** Tonos azul marino (`#0b1e36`), dorado/bronce (`#d97706`), verde patrio (`#047857`) y fondos neutros pulcros (`#ffffff`, `#f8fafc`).

### 3.2. Adaptabilidad Responsiva Total
- Estructura fluida mediante CSS Grid y Flexbox adaptada para móviles, tablets y escritorios.
- Menú de navegación adaptable con indicador flotante dorado para la sección activa.

---

## 4. Estructura y Secciones de la Página Web

### 4.1. Encabezado Superior (Header & Logos)
- Barra superior con logos vectoriales de **CREN MÉXICO** y **UMCE CHILE**.
- Menú de navegación horizontal con scroll suave hacia:
  - *Inicio*
  - *Planteamiento & PISA*
  - *Objetivos*
  - *Metodología*
  - *Intervención*
  - *Productos*
  - *Trascendencia*
  - *Contacto*

### 4.2. Sección Hero (Inicio)
- Imagen de fondo: `img/banner_section.PNG`.
- Título principal y nombres de los titulares del proyecto.
- Tarjeta con cita de Gabriela Mistral.
- Etiquetas laterales de localización: `Tuxpan` y `Santiago`.
- Botones de acción en formato píldora: `Explorar Productos`, `Ver Video-Documental`, `Contactar Titulares`.

### 4.3. Sección: Planteamiento & PISA
- Gráfica visual interactiva PISA 452 puntos (Chile líder en América Latina).
- Cuadrante 2x2 de tarjetas informativas con números de paso (`02`, `04`) e iconos institucionales.

### 4.4. Sección: Objetivos de la Investigación
- 3 tarjetas con insignias de iconos en tonos dorados:
  - **Eje 1:** Analizar el sistema (Modelo chileno y PISA).
  - **Eje 2:** Comparar el sistema (Contexto mexicano).
  - **Eje 3:** Indagar la formación (Estrategias en institución anfitriona).

### 4.5. Sección: Metodología
- 3 tarjetas con insignias circulares en azul marino:
  - **Observación:** Registro sistemático en diario de campo.
  - **Análisis:** Revisión comparada de planes de estudio.
  - **Entrevistas:** Diálogos estructurados con formadores y tutores.

### 4.6. Sección: Intervención
- Tarjetas visuales de actividades de reciprocidad:
  - **Presentación de la NEM**
  - **Taller de Multiculturalidad**

### 4.7. Sección: Plan de Productos (4 Entregables)
Grilla de 4 columnas con botones de acción `Ver Más`:
1. 🎬 **Video-Doc:** Registro audiovisual de inmersión.
2. 📁 **Dossier:** Compendio de estrategias didácticas.
3. 📘 **Propuesta:** Secuencia didáctica innovadora.
4. 📄 **Informe:** Documento comparativo técnico.

*(Nota: Se eliminó el apartado Web del catálogo de productos según requerimiento).*

### 4.8. Sección: Trascendencia Normalista
- Tarjeta horizontal con marco de imagen y reflexión sobre la vocación docente normalista.

### 4.9. Sección: Contacto & Vinculación (Conectado a Backend)
- Formulario dinámico con campos:
  - **Nombre completo** (`nombre`)
  - **Selector de Institución Destino** (`destino`):
    - CREN (México): `direccion.cren@msev.gob.mx`
    - UMCE (Chile): `movilidad@umce.cl`
  - **Correo electrónico** (`email`)
  - **Motivo de contacto** (`motivo`)
  - **Mensaje** (`mensaje`)

### 4.10. Pie de Página (Footer)
- Fondo azul profundo (`#0b1e36`) con logos institucionales, créditos de los titulares y enlaces de navegación rápida.

---

## 5. Arquitectura del Backend y Envío de Correos

1. **Servidor Node.js con Express (`server.js`):**
   - Configuración de servidor web estático y endpoint API POST `/api/contacto`.
2. **Enrutamiento Dinámico de Mensajes:**
   - Si el usuario selecciona **CREN** -> El servidor envía el correo a `direccion.cren@msev.gob.mx`.
   - Si el usuario selecciona **UMCE** -> El servidor envía el correo a `movilidad@umce.cl`.
3. **Módulo de Correo (Nodemailer):**
   - Plantilla HTML formateada para notificación institucional.
   - Soporte para variables SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) mediante `.env`.
4. **Archivo de Configuración (`package.json`):**
   - Dependencias: `express`, `nodemailer`, `cors`, `dotenv`.

---

## 6. Especificaciones de Analítica (Google Analytics GA4)

- Inclusión del script oficial `gtag.js` en el `<head>`.
- Registro del evento personalizado `contact_submit` en `app.js` para medir la interacción por institución seleccionada (CREN / UMCE).

---

## 7. Estado Actual del Proyecto

- [x] Análisis del documento PDF fuente (`CRENUMCE.pdf`).
- [x] Definición de requerimientos con enfoque **"Menos es Más"** y **Responsividad Total**.
- [x] Ajuste de diseño visual acorde a la maqueta de referencia provista.
- [x] Integración de fondo personalizado `img/banner_section.PNG` en la sección Hero.
- [x] Actualización de la grilla de Productos a 4 entregables (eliminado apartado Web).
- [x] Desarrollo e integración del Backend Node.js (`server.js`) con selector de correo institucional (CREN / UMCE).
- [x] Actualización de la documentación en `REQUERIMIENTOS.md`.
