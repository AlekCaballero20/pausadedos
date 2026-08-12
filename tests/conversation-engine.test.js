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

const structuredCases = [
  ["me obliga a mostrarle el celular y me da miedo", "caution", "digital_control"],
  ["revisa mi celular porque ambos tenemos la clave y estamos de acuerdo", "caution", "digital_control"],
  ["me empujó", "crisis", "physical_violence"],
  ["rompe cosas cuando se enoja", "crisis", "physical_violence"],
  ["si lo dejo dice que se mata", "crisis", "threat"],
  ["quiero pegarle", "crisis", "imminent_violence"],
  ["tenemos una pistola guardada pero no hay una amenaza", "caution", "weapon"]
];
structuredCases.forEach(([text, level, category]) => {
  const a = E.analyzeUserMessage(text);
  assert.equal(a.risk.level, level, text);
  assert.equal(a.risk.category, category, text);
});
let a = E.analyzeUserMessage("Llegó 40 minutos tarde.");
assert.equal(a.meaning.interpretation, null);
a = E.analyzeUserMessage("Llegó tarde y siento que mi tiempo no le importa.");
assert.match(a.meaning.interpretation, /no le importa/i);
a = E.analyzeUserMessage("Entre más le escribo menos me responde y entonces le escribo más.");
assert.equal(a.cycle, "pursue_withdraw");
a = E.analyzeUserMessage("Estamos peleando por cualquier bobada pero ambos estamos destruidos por el trabajo.");
assert.ok(a.deep.externalStressors.includes("trabajo"));
a = E.analyzeUserMessage("Solo quiero desahogarme, no quiero consejos.");
assert.equal(a.recommendedIntervention, "LISTEN");
a = E.analyzeUserMessage("No debí gritarle, quiero pedir perdón.");
assert.equal(a.recommendedIntervention, "REPAIR");
a = E.analyzeUserMessage("Estoy mal.");
assert.equal(a.topic, "unknown");
a = E.analyzeUserMessage("Acabamos de pelear 😮‍💨");
assert.equal(a.topic, "conflict");
a = E.analyzeUserMessage("Ella gritó.");
assert.equal(a.topic, "conflict");
assert.ok(a.emotions.explicit.includes("anger"));
a = E.analyzeUserMessage("No me responde desde ayer y me deja en visto.");
assert.equal(a.topic, "communication");
console.log(`OK: ${riskCases.length + cases.length + 4 + structuredCases.length + 12} casos`);
