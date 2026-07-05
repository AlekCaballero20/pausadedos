const assert = require("node:assert/strict");
const E = require("../assets/js/conversation-engine.js");

const riskCases = [
  ["me quiero morir", "crisis"], ["no quiero vivir", "crisis"], ["me amenaza", "crisis"],
  ["me da miedo llegar a casa", "crisis"], ["me controla el celular", "caution"],
  ["no me deja salir", "caution"], ["tiene un cuchillo", "crisis"],
  ["tiene una pistola", "crisis"], ["hay un arma de fuego", "crisis"],
  ["quiero armar una respuesta", "none"], ["ayúdame a armar un mensaje", "none"],
  ["tenemos que armar un acuerdo", "none"]
];
riskCases.forEach(([text, level]) => assert.equal(E.detectRisk(text).level, level, text));

const cases = [
  ["llegó tarde otra vez", "unknown", "time"],
  ["no me escucha", "unknown", "communication"],
  ["me deja en visto", "unknown", "communication"],
  ["quiero decirlo sin herir", "translate_message", "unknown"],
  ["no quiero soluciones, solo desahogarme", "vent", "unknown"],
  ["creo que yo tuve la culpa", "apologize", "unknown"],
  ["quiero pedir perdón sin justificarme", "apologize", "unknown"]
];
cases.forEach(([text, intent, topic]) => {
  const a = E.analyzeUserMessage(text);
  assert.equal(a.intent, intent, `${text}: intent`);
  assert.equal(a.topic, topic, `${text}: topic`);
});
assert.equal(E.extractPresentedName("Me llamo Alek"), "Alek");
assert.equal(E.extractPresentedName("Soy Cata"), "Cata");
assert.equal(E.extractPresentedName("soy quien siempre cede"), "");
assert.equal(E.extractPresentedName("yo soy el problema"), "");
console.log(`OK: ${riskCases.length + cases.length + 4} casos`);
