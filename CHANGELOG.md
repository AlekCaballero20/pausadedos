# Changelog

## 2026-08-11

- Motor: `conversation-engine.js` es la fuente única para análisis, activación, riesgo, hecho/interpretación, ciclo, DEEP y recomendación.
- Seguridad: reglas y recursos centralizados en `structured-knowledge.js`; se evita mediar cuando hay riesgo.
- UX: nuevos accesos para ciclo, perspectiva, comprensión y estrés; las respuestas empiezan con reflejo breve y una pregunta.
- Pruebas: se amplió la suite de seguridad y formulación.

## 2026-07-04

- Personalización: formulario opcional para guardar, editar o borrar el nombre de la persona y su pareja; en modo privado solo viven durante la sesión.
- Primera visita: la app pregunta los nombres antes de iniciar el chat, permite omitirlos y recuerda la decisión en el dispositivo.
- Inicio sin nombres: si falta el nombre del usuario o de su pareja, vuelve a solicitarlo al abrir; “Ahora no” omite solo la sesión actual.
- Seguridad: detector con niveles, categorías y límites de frase; prioridad absoluta antes y durante flujos; ruta breve de crisis/control.
- Privacidad: modo privado visible, sin persistencia; borrado total de historial, contexto, bitácora, último acceso, nombres y preferencias.
- Comprensión: motor separado para intención, tema, patrón, emoción, necesidad, intensidad, confianza y continuidad.
- Conocimiento: base combinable inicial para once temas, nueve patrones y seis tareas.
- Conversación: contexto anterior se conserva hasta construir la respuesta; acuerdos incluyen momento, contingencia y revisión; nombres solo en presentaciones claras.
- Seguridad HTML: se añadió escape específico para atributos y casos manuales de inyección.
- Pruebas: suite Node para riesgo, falsos positivos, comprensión y nombres, más checklist de flujos y privacidad.

Pendiente sugerido: revisión clínica y jurídica local de textos/rutas de ayuda; pruebas con usuarios; ampliar reglas con ejemplos colombianos anonimizados.
