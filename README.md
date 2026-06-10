# Pausa de Dos

Bot conversacional de apoyo emocional para parejas, construido como **motor de conocimiento local**, sin IA, sin backend y sin dependencias externas.

La idea: ofrecer una primera versión funcional para conversaciones difíciles. Sirve para bajar tensión, traducir reclamos, reparar después de una pelea y crear acuerdos concretos.

## Qué incluye

```txt
pausa-de-dos-bot/
├── index.html
├── manifest.webmanifest
├── sw.js
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── app.js
│       └── knowledge-base.js
├── docs/
│   ├── como-personalizar.md
│   └── seguridad-y-limites.md
└── prompts/
    └── prompt-para-mejorar-con-claude.md
```

## Funciones principales

- Interfaz tipo app de mensajería, optimizada para móvil (pantalla completa, hojas inferiores, chips de respuesta rápida).
- Respuestas en burbujas cortas y secuenciales, con revelado progresivo: los pasos y frases listas aparecen solo si la persona los pide ("👣 Ver pasos", "✍️ Frase lista" con botón de copiar).
- Motor de intención por palabras clave y prioridad.
- Termómetro emocional de 1 a 5 (desplegable desde el encabezado; en nivel 5 el bot propone regulación antes de seguir).
- Modos rápidos (botón ➕): pausa de 20 minutos, traducir mensaje, reparar pelea, dos voces, crear acuerdo, espejo suave y sumar puntos.
- Detección de temas sensibles:
  - Riesgo de hacerse daño.
  - Violencia, amenazas, miedo o control.
  - Crítica y desprecio (jinetes de Gottman).
  - Muro de silencio / ley del hielo.
  - Ciclo perseguidor-distanciador.
  - Invalidación emocional.
  - Celos/confianza e infidelidad.
  - Tareas del hogar y carga mental.
  - Dinero.
  - Familia externa.
  - Distancia emocional e intimidad.
  - Decisiones y responsabilidades.
  - Fortalecimiento cuando la relación está bien (proporción 5:1).

## Base teórica del contenido

El conocimiento del bot se apoya en enfoques con respaldo de investigación:

- **Método Gottman**: cuatro jinetes y sus antídotos, intentos de reparación, inicio suave, inundación emocional y pausa de 20+ minutos, proporción 5:1 de interacciones positivas.
- **Comunicación No Violenta (Rosenberg)**: observación + sentimiento + necesidad + petición.
- **Terapia Focalizada en las Emociones (Sue Johnson)**: ciclo perseguidor-distanciador y apego.
- **Regulación emocional**: respiración 4-6 y grounding 5-4-3-2-1.
- Exportación de conversación en JSON.
- Historial local con `localStorage`.
- PWA básica con service worker.

## Cómo usarlo

Abre `index.html` en el navegador.

Para probarlo mejor como PWA local, puedes levantar un servidor simple:

```bash
python -m http.server 8080
```

Luego entra a:

```txt
http://localhost:8080
```

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio, por ejemplo `pausa-de-dos`.
2. Sube todos los archivos de esta carpeta.
3. En GitHub ve a `Settings > Pages`.
4. En `Build and deployment`, elige:
   - Source: `Deploy from a branch`.
   - Branch: `main`.
   - Folder: `/root`.
5. Guarda y abre la URL pública.

## Privacidad

Esta versión no envía datos a ningún servidor. El historial queda únicamente en el navegador con `localStorage`. Si se publica en internet, sigue siendo una app estática: no hay base de datos ni backend.

## Límite importante

No debe presentarse como terapeuta ni como sustituto de atención profesional o de emergencia. Es un acompañante de conversación para conflictos cotidianos. Si hay violencia, miedo, amenazas, coerción o riesgo de autolesión, la app debe priorizar seguridad y rutas de ayuda.

## Personalización rápida

La mayoría del contenido está en:

```txt
assets/js/knowledge-base.js
```

Ahí puedes editar:

- Nombre del bot.
- Mensajes de apertura.
- Modos rápidos.
- Palabras clave.
- Respuestas.
- Plantillas de reparación.
- Rutas de ayuda.

