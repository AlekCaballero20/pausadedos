# Cómo personalizar Pausa de Dos

## 1. Cambiar el nombre del bot

En `assets/js/knowledge-base.js`, edita:

```js
appName: "Pausa de Dos"
```

Y en `index.html`, cambia el título visible.

## 2. Editar mensajes iniciales

Busca:

```js
opening: [ ... ]
```

Cada elemento del arreglo se muestra como un párrafo al iniciar.

## 3. Agregar un modo rápido

En `modes`, agrega un objeto como este:

```js
{
  id: "nuevoModo",
  emoji: "🌱",
  title: "Nombre del modo",
  desc: "Qué hace este modo.",
  prompt: "Texto que se pondrá en el chat al tocar el botón."
}
```

## 4. Agregar una nueva intención

En `intents`, agrega:

```js
{
  id: "temaNuevo",
  priority: 60,
  keywords: ["palabra clave", "otra frase"],
  title: "Título de respuesta",
  status: "Modo sugerido: nombre del modo",
  body: [
    "Párrafo principal.",
    "Párrafo secundario."
  ],
  steps: [
    "Paso 1.",
    "Paso 2."
  ],
  actions: [
    { label: "Botón", prompt: "Prompt que aparece al hacer clic." }
  ]
}
```

## 5. Cambiar colores

En `assets/css/styles.css`, edita las variables de `:root`:

```css
--primary: #8b5cf6;
--accent: #fb7185;
--bg: #fff7f0;
```

## 6. Quitar el historial local

En `assets/js/app.js`, puedes desactivar `localStorage` modificando las funciones `loadHistory()` y `saveHistory()`.

## 7. Convertirlo después en IA real

Esta versión es motor local. Si más adelante quieres conectarlo con IA, conserva:

- El termómetro emocional.
- La detección de crisis antes de llamar a IA.
- La base de conocimiento como contexto.
- La exportación de conversaciones.
- La regla de no mediar violencia.

