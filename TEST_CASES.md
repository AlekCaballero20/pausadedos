# Casos de prueba

Ejecutar: `node tests/conversation-engine.test.js`.

## Riesgo

Se prueban autolesión, amenazas, miedo en casa, control del celular, encierro y armas. “Armar una respuesta”, “armar un mensaje” y “armar un acuerdo” deben quedar en `none`.

En Dos voces, Acuerdo o Mensaje reparador, cualquier riesgo debe cancelar el flujo y mostrar seguridad. Probar además cancelar, responder “no sé” y pegar comillas `“” '" < >`.

## Comprensión

La suite cubre puntualidad, escucha, visto, traducción cuidadosa, desahogo, culpa y disculpa. Cada caso verifica `risk`, `intent` y `topic`; visualmente debe producir 2–4 burbujas, hipótesis no categóricas y acciones contextuales.

La cobertura estructurada añade control digital, violencia física, amenazas de suicidio coercitivas, armas sin amenaza, hecho frente a interpretación, ciclo perseguidor-distanciador, estrés externo, escucha sin consejos, reparación y baja confianza.

## Privacidad y HTML

- Activar modo privado, conversar y recargar: no debe restaurar conversación, contexto ni bitácora.
- Borrar todos los datos y verificar que no queden claves `pausaDeDos.*`.
- Pegar `<img src=x onerror=alert(1)>` y comillas en un mensaje: debe verse como texto y nunca ejecutarse.
- Copiar cada variante suave, clara y firme: el portapapeles debe conservar las comillas correctamente.
- Guardar ambos nombres, recargar y comprobar personalización; activar modo privado y comprobar que nuevos nombres no se restauran al recargar.
- Borrar nombres y verificar que Pau deja de utilizarlos sin borrar el resto de la conversación.
- En un almacenamiento limpio, verificar que el formulario de nombres aparece antes del chat; guardar y recargar para confirmar que no vuelve a aparecer.
- En almacenamiento limpio, pulsar “Ahora no”: debe abrir el chat; al recargar debe volver a preguntar mientras falte algún nombre.
