# Prompt para mejorar este proyecto con Claude/Codex

Actúa como desarrollador senior frontend, diseñador UX y experto en productos de bienestar digital con enfoque ético. Tengo un proyecto estático llamado **Pausa de Dos**, un bot conversacional para parejas basado en motor de conocimiento local, sin IA ni backend.

Objetivo: mejorar la experiencia para que se sienta más conversacional, cálida, segura y útil para parejas que quieren ordenar conflictos cotidianos, bajar tensión, reparar peleas, traducir mensajes y crear acuerdos concretos.

Restricciones importantes:

1. No debe presentarse como terapeuta ni reemplazar atención psicológica, médica, legal o de emergencia.
2. Debe detectar y frenar temas de riesgo: autolesión, suicidio, violencia, amenazas, miedo, control, coerción, vigilancia, armas o abuso.
3. Si hay riesgo, debe priorizar seguridad y rutas de ayuda, no mediación de pareja.
4. Debe funcionar como app estática en GitHub Pages.
5. No usar backend, Firebase, APIs ni dependencias externas.
6. Mantener diseño claro, moderno, responsive y amable.
7. Mantener el motor de conocimiento editable desde `assets/js/knowledge-base.js`.
8. El historial solo debe guardarse localmente en el navegador o poder desactivarse fácilmente.

Mejoras deseadas:

- Hacer el chat más fluido, con sensación de conversación real aunque sea motor local.
- Añadir un flujo guiado paso a paso para “Dos voces”: Persona A, resumen de Persona B, Persona B, resumen de Persona A, acuerdo final.
- Añadir un flujo de “Mensaje reparador” que permita pegar una frase dura y devolver 3 versiones: suave, clara y firme.
- Añadir un flujo de “Acuerdo concreto” con campos: situación, necesidad de cada persona, conducta esperada, responsable, momento de revisión.
- Añadir una vista de “Bitácora de reparación” exportable en JSON o TXT.
- Mejorar accesibilidad: navegación por teclado, contraste, labels y aria-live.
- Mejorar el service worker y manifest para PWA.
- Evitar respuestas repetitivas cuando el usuario insiste en el mismo tema.
- Agregar más categorías de conflicto: tiempo, cansancio, intimidad, proyectos compartidos, familia, dinero, celos, convivencia, toma de decisiones, tono de voz, bromas que hieren.

Entrega:

- Devuélveme todos los archivos completos modificados.
- Explica brevemente qué cambiaste.
- No borres las rutas de seguridad.
- No agregues librerías externas.
