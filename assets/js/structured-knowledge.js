(function (root, factory) {
  const knowledge = factory();
  if (typeof module === "object" && module.exports) module.exports = knowledge;
  else root.PAUSA_KNOWLEDGE = knowledge;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return {
    supportResources: {
      region: "Bogotá, Colombia", verifiedAt: "2026-08-11",
      emergency: { label: "Emergencias", contact: "123", audience: "riesgo inmediato" },
      emotional: { label: "Línea 106 Bogotá", contact: "106 · WhatsApp 300 754 8933", audience: "apoyo emocional" },
      women: { label: "Línea Púrpura Bogotá", contact: "01 8000 112 137 · WhatsApp 300 755 1846", audience: "violencia contra mujeres" },
      national: { label: "Línea nacional 155", contact: "155", audience: "violencia basada en género" },
      men: { label: "Línea Calma Bogotá", contact: "01 8000 423 614", audience: "hombres que necesitan orientación" }
    },
    topics: {
      time: { label: "Tiempo y puntualidad", signals: ["tarde", "puntual", "avisar"] },
      chores: { label: "Carga de tareas", signals: ["tareas", "oficio", "carga mental"] },
      money: { label: "Dinero", signals: ["plata", "dinero", "gastos", "deuda"] },
      family: { label: "Familia", signals: ["familia", "suegra", "suegro"] },
      conflict: { label: "Pelea o discusión", signals: ["pelear", "pelea", "discutimos", "discusión", "discusion", "discutir", "gritó", "grito", "gritos"] },
      communication: { label: "Comunicación", signals: ["escucha", "hablar", "responde", "visto", "me contestó", "me contesto", "no me responde"] },
      emotional_distance: { label: "Distancia emocional", signals: ["distante", "frío", "desconectados"] },
      intimacy: { label: "Intimidad", signals: ["intimidad", "sexo", "deseo"] },
      digital_control: { label: "Celular y redes", signals: ["celular", "redes", "contraseña"] }
    },
    externalStressors: ["trabajo", "dinero", "crianza", "enfermedad", "sueño", "cansancio", "estudios", "desempleo", "familia", "mudanza", "duelo", "responsabilidades", "cuidar"],
    emotions: {
      anger: ["rabia", "furia", "enoj", "mamado", "mamada", "gritó", "grito", "gritos"], sadness: ["triste", "llor", "dolor", "decepción"],
      fear: ["miedo", "temor", "insegur"], guilt: ["culpa", "culpable"], shame: ["vergüenza"],
      frustration: ["frustr", "harto"], loneliness: ["solo", "sola"], overwhelm: ["satur", "abrum", "agotad", "destruid"]
    },
    needs: { validation: ["escuch", "entienda"], respect: ["respeto", "insulto", "burla"], safety: ["miedo", "segur"], rest: ["cans", "satur"], autonomy: ["espacio", "control"], predictability: ["tarde", "avisar"] },
    riskRules: [
      ["self_harm", "crisis", "me quiero morir|no quiero vivir|quiero matarme|voy a matarme|suicid(?:io|arme)|hacerme dano|no vale la pena vivir"],
      ["imminent_violence", "crisis", "quiero (?:pegarle|golpearle|matarlo|matarla)|amenaza con matarme"],
      ["physical_violence", "crisis", "me (?:pego|golpeo|agredio|empujo)|me pega|me golpea|me encerro|rompe cosas"],
      ["threat", "crisis", "me amenaza|me amenazo|tengo miedo de lo que pueda hacer|me da miedo llegar a casa|si lo dejo dice que se mata"],
      ["sexual_coercion", "crisis", "me fuerza|me obliga(?: a)? tener sexo|sexo sin mi consentimiento"],
      ["coercive_control", "caution", "no me deja salir|me aisla|me vigila"],
      ["digital_control", "caution", "me controla (?:el|mi) celular|me obliga a mostrarle el celular|revisa mi celular"],
      ["financial_control", "caution", "controla mi dinero|no me deja usar mi dinero"],
      ["stalking", "caution", "me persigue"], ["fear", "caution", "me da miedo"],
      ["weapon", "crisis", "(?:tiene|hay un|hay una).{0,25}(?:cuchillo|pistola|\\barma\\b)" ],
      ["weapon", "caution", "tenemos.{0,25}(?:cuchillo|pistola|\\barma\\b)" ]
    ]
  };
});
