// Conocimiento combinable: señales, hipótesis y herramientas. El motor nunca presenta
// emociones o necesidades como diagnósticos; son puntos de partida para preguntar.
window.PAUSA_KNOWLEDGE = {
  topics: {
    time: { label: "Tiempo y puntualidad", signals: ["tarde", "puntual", "avisar"], commonEmotions: ["frustration"], commonNeeds: ["predictability", "respect"], usefulQuestions: ["¿El problema es el retraso, la falta de aviso o sentir que tu tiempo no cuenta?"], interventions: ["clear_time", "late_notice"] },
    chores: { label: "Carga de tareas", signals: ["tareas", "oficio", "carga mental"], commonEmotions: ["overwhelm", "anger"], commonNeeds: ["fairness", "rest"], usefulQuestions: ["¿Qué tarea, frecuencia y responsable necesitan quedar visibles?"], interventions: ["task_map", "weekly_review"] },
    money: { label: "Dinero", signals: ["plata", "dinero", "gastos", "deudas"], commonEmotions: ["fear", "anger", "shame"], commonNeeds: ["clarity", "fairness", "safety"], usefulQuestions: ["¿El conflicto es por monto, responsabilidad, transparencia o prioridades?"], interventions: ["numbers_first", "weekly_review", "clear_amount_date"] },
    family: { label: "Familia", signals: ["familia", "suegra", "suegro"], commonEmotions: ["frustration"], commonNeeds: ["autonomy", "respect"], usefulQuestions: ["¿Qué decisión debe tomar primero la pareja como equipo?"], interventions: ["internal_agreement_first"] },
    communication: { label: "Comunicación", signals: ["escucha", "hablar", "responde"], commonEmotions: ["frustration", "loneliness"], commonNeeds: ["validation", "clarity"], usefulQuestions: ["¿Qué necesitarías que la otra persona pudiera resumir correctamente?"], interventions: ["reflect_before_reply"] },
    emotional_distance: { label: "Distancia emocional", signals: ["distante", "frío", "desconectados"], commonEmotions: ["sadness", "loneliness"], commonNeeds: ["affection", "predictability"], usefulQuestions: ["¿Cuándo empezaron a notar la distancia?"], interventions: ["small_connection_ritual"] },
    jealousy: { label: "Celos", signals: ["celos", "desconfianza", "infidelidad"], commonEmotions: ["fear", "anger"], commonNeeds: ["safety", "clarity"], usefulQuestions: ["¿Hay un hecho verificable, una herida anterior o una incertidumbre?"], interventions: ["facts_before_story"] },
    shared_project: { label: "Trabajo o proyecto compartido", signals: ["negocio", "proyecto", "trabajo juntos"], commonEmotions: ["frustration"], commonNeeds: ["clarity", "fairness"], usefulQuestions: ["¿Qué rol, entrega y fecha están ambiguos?"], interventions: ["role_owner_deadline"] },
    digital_control: { label: "Celular y redes", signals: ["celular", "redes", "contraseña"], commonEmotions: ["fear", "frustration"], commonNeeds: ["autonomy", "safety"], risks: ["digital_control"], usefulQuestions: ["¿Hay un acuerdo voluntario o vigilancia y presión?"], interventions: ["privacy_boundary"] },
    intimacy: { label: "Intimidad", signals: ["intimidad", "sexo", "deseo"], commonEmotions: ["shame", "sadness"], commonNeeds: ["safety", "affection"], usefulQuestions: ["¿Necesitan hablar de deseo, consentimiento, frecuencia o cercanía?"], interventions: ["consent_first"] },
    overwhelm: { label: "Cansancio y saturación", signals: ["cansancio", "saturado", "agotada"], commonEmotions: ["overwhelm"], commonNeeds: ["rest", "fairness"], usefulQuestions: ["¿Qué puede esperar y qué apoyo concreto aliviaría hoy?"], interventions: ["pause", "reduce_load"] }
  },
  patterns: {
    criticism: { label: "Crítica", signals: ["siempre", "nunca", "eres"], explanation: "Ataca a la persona en vez del hecho.", reframe: "Describe un hecho y una petición.", repairPrompt: "¿Qué conducta concreta te molestó?" },
    defensiveness: { label: "Defensividad", signals: ["no fue mi culpa", "pero tú"], explanation: "Responde protegiéndose antes de reconocer impacto.", reframe: "Reconoce una parte pequeña y real.", repairPrompt: "¿Qué 5% sí puedes reconocer?" },
    invalidation: { label: "Invalidación", signals: ["exageras", "no es para tanto"], explanation: "Discute la legitimidad de la emoción.", reframe: "Valida la experiencia sin tener que coincidir.", repairPrompt: "¿Puedes resumir lo que dolió?" },
    contempt: { label: "Desprecio", signals: ["burla", "humillación", "insulto"], explanation: "Comunica superioridad y requiere límite.", reframe: "Pausa y vuelve solo con respeto.", repairPrompt: "¿Qué límite protege la dignidad?" },
    avoidance: { label: "Evasión", signals: ["cambia el tema", "evita"], explanation: "El tema queda sin cierre.", reframe: "Agenda un momento específico.", repairPrompt: "¿Cuándo lo retomarán?" },
    stonewalling: { label: "Muro o silencio", signals: ["ley del hielo", "se calla"], explanation: "Puede ser saturación o castigo; hace falta distinguirlo.", reframe: "Pausa con hora de regreso.", repairPrompt: "¿El silencio viene con aviso y regreso?" },
    pursue_withdraw: { label: "Perseguidor-distanciador", signals: ["insisto", "se aleja"], explanation: "Más presión produce más distancia y viceversa.", reframe: "Baja presión y garantiza regreso.", repairPrompt: "¿Qué seguridad necesita cada lado?" },
    escalation: { label: "Escalada", signals: ["gritos", "insultos"], explanation: "La intensidad impide escuchar.", reframe: "Regular antes de resolver.", repairPrompt: "¿Están por debajo de 4/5?" },
    control: { label: "Control", signals: ["no me deja", "me vigila"], explanation: "La prioridad es seguridad y autonomía, no mediar.", reframe: "Busca apoyo y una ruta segura.", repairPrompt: "¿Puedes pedir ayuda sin aumentar el riesgo?" }
  },
  tasks: {
    translate_message: { output: ["soft", "clear", "firm"] }, repair: { requires: ["impact", "responsibility", "action"] },
    agreement: { requires: ["situation", "behavior", "owner", "timing", "fallback", "review"] },
    set_boundary: { requires: ["behavior", "limit", "consequence"] }, calm_down: { requires: ["emotion", "body", "breath", "return_time"] },
    understand: { requires: ["fact", "emotion", "meaning", "need"] }
  }
};
