(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) module.exports = engine;
  else root.PAUSA_ENGINE = engine;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function normalize(text) {
    return String(text || "").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ").trim();
  }
  const rx = source => new RegExp(`(?:^|\\s)(?:${source})(?=$|\\s)`, "iu");
  const RISK_RULES = [
    { level: "crisis", category: "self_harm", re: rx("me quiero morir|no quiero vivir|quiero matarme|voy a matarme|suicid(?:io|arme)|hacerme dano|no vale la pena vivir") },
    { level: "crisis", category: "violence", re: rx("me (?:pego|golpeo|agredio)|me pega|me golpea|me encerro|tiene (?:un |una )?(?:cuchillo|pistola)|hay un arma de fuego|me da miedo llegar a casa") },
    { level: "crisis", category: "threat", re: rx("me amenaza|me amenazo|tengo miedo de lo que pueda hacer|amenaza con matarme|voy a (?:pegarle|golpearle|matarlo|matarla)") },
    { level: "caution", category: "control", re: rx("me controla (?:el|mi) celular|no me deja salir|me vigila|revisa mi celular|controla mi dinero|me aisla") },
    { level: "caution", category: "violence", re: rx("me empujo|me intimida|rompe cosas|violencia|abuso|me fuerza") }
  ];
  function detectRisk(text) {
    const clean = normalize(text);
    const matches = RISK_RULES.filter(rule => rule.re.test(clean));
    if (!matches.length) return { level: "none", category: "unknown", matches: [] };
    const level = matches.some(m => m.level === "crisis") ? "crisis" : "caution";
    const selected = matches.find(m => m.level === level) || matches[0];
    return { level, category: selected.category, matches: matches.map(m => m.re.source) };
  }
  const dictionaries = {
    intent: {
      calm_down: ["calmarme", "bajar la intensidad", "respirar", "pausa"],
      translate_message: ["sin herir", "traducir", "como le digo", "armar una respuesta", "responder"],
      repair: ["reparar", "arreglar la pelea"], agreement: ["acuerdo", "pacto"],
      understand: ["entender", "que hay detras", "por que"], vent: ["desahogarme", "solo escuchar", "no quiero soluciones"],
      set_boundary: ["poner limite", "no voy a permitir"], apologize: ["pedir perdon", "disculparme", "tuve la culpa"],
      ask_for_phrase: ["dame una frase", "que le digo"], continue_previous: ["ademas", "tambien", "y entonces"]
    },
    topic: {
      money: ["dinero", "plata", "gastos", "deuda"], time: ["tarde", "puntual", "tiempo"],
      chores: ["tareas", "oficio", "platos", "aseo", "carga mental"], family: ["familia", "suegra", "suegro"],
      work: ["trabajo", "proyecto"], intimacy: ["intimidad", "sexo", "deseo"], jealousy: ["celos", "infidelidad"],
      communication: ["hablar", "escucha", "responde", "visto"], digital_control: ["celular", "redes", "contrasena"],
      disrespect: ["insulto", "burla", "humilla"], emotional_distance: ["distante", "frio", "no me habla"],
      shared_project: ["negocio", "proyecto juntos"]
    },
    pattern: {
      criticism: ["siempre", "nunca", "eres un", "eres una"], defensiveness: ["se pone a la defensiva", "no fue mi culpa"],
      contempt: ["burla", "humilla", "ridiculiza"], stonewalling: ["ley del hielo", "se calla", "me deja en visto"],
      invalidation: ["exageras", "estas loca", "estas loco", "no es para tanto"], pursue_withdraw: ["entre mas insisto", "se aleja"],
      escalation: ["gritamos", "pelea", "insultos"], avoidance: ["evita hablar", "cambia el tema"], control: ["controla", "no me deja"]
    },
    emotion: {
      anger: ["rabia", "furia", "enoj"], sadness: ["triste", "llor"], fear: ["miedo", "temor"],
      guilt: ["culpa", "culpable"], frustration: ["frustr", "harto", "cansado de"], shame: ["verguenza"],
      loneliness: ["solo", "sola"], overwhelm: ["satur", "abrum", "sobrepas"], confusion: ["confund", "no entiendo"]
    },
    need: {
      clarity: ["entender", "claridad"], respect: ["respeto", "insulto", "burla"], safety: ["miedo", "segur"],
      rest: ["cans", "satur"], validation: ["escuch", "entienda"], autonomy: ["espacio", "controla"],
      affection: ["carino", "afecto", "distante"], fairness: ["justo", "carga", "mitad"], repair: ["perdon", "reparar"],
      predictability: ["tarde", "avisar", "cumplir"]
    }
  };
  function detect(group, clean, fallback) {
    let best = { id: fallback, score: 0 };
    Object.entries(dictionaries[group]).forEach(([id, signals]) => {
      const score = signals.reduce((n, signal) => n + (clean.includes(normalize(signal)) ? 1 : 0), 0);
      if (score > best.score) best = { id, score };
    });
    return best;
  }
  function detectEmotionalHeat(text) {
    const clean = normalize(text);
    let heat = /[!?]{2,}/.test(String(text)) ? 3 : 2;
    if (/(furia|odio|explote|gritamos|desesperad|no puedo mas)/.test(clean)) heat += 2;
    else if (/(rabia|harto|satur|llor|miedo)/.test(clean)) heat += 1;
    return Math.max(1, Math.min(5, heat));
  }
  function analyzeUserMessage(text, previousContext = {}) {
    const clean = normalize(text);
    const intent = detect("intent", clean, "unknown");
    const topic = detect("topic", clean, "unknown");
    const pattern = detect("pattern", clean, "unclear");
    const emotion = detect("emotion", clean, "unknown");
    const need = detect("need", clean, "unknown");
    const detected = [intent, topic, pattern, emotion, need].filter(x => x.score > 0).length;
    return {
      originalText: String(text), normalizedText: clean, risk: detectRisk(text),
      heat: detectEmotionalHeat(text), intent: intent.id, topic: topic.id, pattern: pattern.id,
      emotion: emotion.id, userGoal: intent.id, need: need.id,
      confidence: Number((detected / 5).toFixed(2)),
      continuation: Boolean(previousContext.lastTopic && (topic.id === previousContext.lastTopic || intent.id === "continue_previous"))
    };
  }
  function toneFor(a) {
    if (a.risk.level !== "none") return "safe";
    if (a.heat >= 4) return "gentle";
    if (a.heat <= 2) return "warm_light";
    return "balanced";
  }
  function buildResponse(a, previous = {}) {
    if (a.risk.level !== "none") return { tone: "safe", bubbles: [], actions: ["safety", "private", "clear"] };
    const topic = a.topic === "unknown" ? "lo que pasó" : a.topic.replaceAll("_", " ");
    const need = a.need === "unknown" ? "entender mejor qué necesitas" : a.need.replaceAll("_", " ");
    const bubbles = [
      a.continuation ? `Esto parece venir del mismo hilo sobre ${topic}.` : `Lo que entiendo es que el punto concreto tiene que ver con ${topic}.`,
      `Puede que debajo de esto haya ${a.emotion === "unknown" ? "una emoción todavía difícil de nombrar" : a.emotion} y una necesidad de ${need}. Lo tomo como hipótesis, no como certeza.`,
      `Yo lo trabajaría como ${a.intent === "unknown" ? "una escena concreta antes de sacar conclusiones" : a.intent.replaceAll("_", " ")}.`
    ];
    return { tone: toneFor(a), bubbles, actions: ["translate_message", "agreement", "calm_down", "understand", "set_boundary"] };
  }
  function extractPresentedName(text) {
    const match = String(text).trim().match(/^(?:me llamo|mi nombre es|soy)\s+([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,18})(?:[.!])?$/iu);
    if (!match) return "";
    const stop = new Set(["quien", "que", "el", "la", "alguien", "persona", "problema", "culpable", "responsable", "critica"]);
    return stop.has(normalize(match[1])) ? "" : match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
  }
  return { normalize, detectRisk, detectEmotionalHeat, analyzeUserMessage, toneFor, buildResponse, extractPresentedName };
});
