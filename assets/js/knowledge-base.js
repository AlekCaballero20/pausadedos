// Base de conocimiento de Pausa de Dos
// Contenido basado en enfoques validados: Método Gottman (cuatro jinetes, reparación,
// inicio suave, inundación emocional), Comunicación No Violenta de Rosenberg y
// Terapia Focalizada en las Emociones de Sue Johnson (ciclo perseguidor-distanciador).
// Cada intent responde en "bubbles": mensajes cortos que se envían uno a uno,
// como una conversación real. Los pasos y frases se muestran solo si la persona los pide.

window.COUPLES_KB = {
  appName: "Pausa de Dos",

  opening: [
    "Hola 👋 Soy Pau.",
    "Estoy aquí para ayudarte cuando con tu pareja no saben cómo resolver algo: una pelea, un mensaje difícil, una distancia rara.",
    "Cuéntame en una frase qué está pasando. O toca el botón ➕ para ver los modos rápidos."
  ],

  openingChips: [
    "Acabamos de pelear 😮‍💨",
    "Quiero responder sin herir",
    "Siento distancia entre nosotros",
    "Necesito calmarme primero"
  ],

  suggestions: [
    "Acabamos de pelear 😮‍💨",
    "Ayúdame a responder sin herir",
    "Quiero entender qué hay detrás",
    "Hagamos un acuerdo concreto",
    "Siento distancia entre nosotros"
  ],

  heatLabels: {
    1: "1 · Tranquilo 🌿",
    2: "2 · Algo incómodo 🙂",
    3: "3 · Hay tensión 😬",
    4: "4 · Alto voltaje ⚡",
    5: "5 · Pausa ya 🔥"
  },

  modes: [
    {
      id: "pause",
      emoji: "🫧",
      title: "Pausa de 20 min",
      desc: "Calmarte antes de hablar",
      prompt: "Necesito calmarme antes de hablar. Guíame."
    },
    {
      id: "translate",
      emoji: "📝",
      title: "Traducir mensaje",
      desc: "Decirlo sin herir",
      prompt: "Quiero decir algo difícil sin herir. Ayúdame a traducirlo."
    },
    {
      id: "repair",
      emoji: "🪡",
      title: "Reparar pelea",
      desc: "Disculpa y reconexión",
      prompt: "Tuvimos una pelea y quiero reparar."
    },
    {
      id: "twoVoices",
      emoji: "🎙️",
      title: "Dos voces",
      desc: "Cada uno cuenta su versión",
      prompt: "Hagamos modo dos voces: cada uno dice qué pasó, qué sintió y qué necesita."
    },
    {
      id: "agreement",
      emoji: "🤝",
      title: "Crear acuerdo",
      desc: "Del drama a la acción",
      prompt: "Ayúdanos a convertir este problema en un acuerdo concreto."
    },
    {
      id: "mirror",
      emoji: "🪞",
      title: "Espejo suave",
      desc: "Ver tu parte sin castigarte",
      prompt: "Ayúdame a ver mi parte en este conflicto sin culparme de todo."
    },
    {
      id: "appreciate",
      emoji: "💛",
      title: "Sumar puntos",
      desc: "Fortalecer cuando están bien",
      prompt: "Estamos bien y quiero fortalecer la relación. ¿Qué podemos hacer?"
    }
  ],

  crisis: {
    keywords: [
      "me quiero morir", "no quiero vivir", "matarme", "suicidio", "suicidarme", "hacerme daño", "autolesion", "autolesión", "no vale la pena vivir",
      "pegarle", "me pego", "me pega", "me golpeo", "me golpea", "golpear", "amenaza", "amenazó", "amenazar", "me da miedo", "tengo miedo de el", "tengo miedo de ella", "violencia", "abuso", "forzar", "encerr", "cuchillo", "arma", "chantaje", "controla mi celular", "me vigila", "me persigue a todos lados"
    ],
    response: {
      title: "Primero tu seguridad. La conversación puede esperar.",
      tone: "danger",
      bubbles: [
        "Lo que escribiste puede implicar riesgo real, y eso está por encima de cualquier técnica de comunicación.",
        "Haz esto ahora: aléjate físicamente si puedes hacerlo sin aumentar el riesgo, busca a una persona de confianza y usa una ruta de ayuda.",
        "📞 En Colombia: 123 si hay peligro inmediato. Línea 106 o WhatsApp 300 754 8933 para apoyo emocional. Violencia contra mujeres: Línea 155 / Línea Púrpura 018000112137."
      ],
      steps: [
        "No sigas discutiendo por chat en este momento.",
        "No negocies límites básicos de seguridad.",
        "Guarda evidencia si hay amenazas y busca acompañamiento humano."
      ]
    }
  },

  intents: [
    {
      id: "pause",
      priority: 95,
      keywords: ["rabia", "furia", "explote", "exploté", "no puedo mas", "no puedo más", "gritar", "grité", "me salí", "me altere", "me alteré", "muy molesto", "muy molesta", "calmarme", "regularme", "inundado", "sobrepasado", "sobrepasada", "corazon acelerado", "corazón acelerado"],
      title: "Pausa antes de hablar",
      status: "Modo: pausa y regulación",
      bubbles: [
        "Tu cuerpo está en modo alarma 🚨 Cuando el corazón pasa de cierto punto, el cerebro deja de escuchar y solo quiere ganar. Le pasa a todos los humanos, no es defecto tuyo.",
        "La investigación de Gottman dice algo clave: cuando estamos \"inundados\" emocionalmente, hay que parar mínimo 20 minutos. Menos no alcanza para que el cuerpo baje.",
        "¿Quieres que te guíe para calmarte ahora, o prefieres una frase para pedir la pausa sin que suene a portazo?"
      ],
      steps: [
        "Avisa, no desaparezcas: \"Quiero hablar de esto, pero ahora estoy muy activado/a. Necesito 20 minutos y vuelvo.\"",
        "Respira lento: inhala 4 segundos, exhala 6. Repite 6 veces. La exhalación larga le baja volumen al cuerpo.",
        "Si sigues acelerado/a, usa el 5-4-3-2-1: nombra 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas.",
        "En la pausa NO repases la pelea ni ensayes contraataques. Eso es seguir peleando en tu cabeza.",
        "Vuelve con una pregunta, no con sentencia: \"¿Qué entendiste tú de lo que pasó?\""
      ],
      phrase: "Quiero hablarlo bien, pero ahora estoy muy activado/a. Necesito 20 minutos para calmarme y vuelvo. No me estoy yendo del tema, estoy cuidando cómo lo hablamos.",
      actions: [
        { label: "🧘 Guíame a calmarme", prompt: "Guíame paso a paso para calmarme ahora." },
        { label: "📝 Traducir mi reclamo", prompt: "Quiero transformar una frase hiriente en una más cuidadosa." }
      ]
    },
    {
      id: "calmGuide",
      priority: 90,
      keywords: ["guíame paso a paso para calmarme", "guiame para calmarme", "respirar", "respiración", "respiracion", "ansiedad ahora", "me tiembla"],
      title: "Vamos a bajar el volumen interno",
      status: "Modo: regulación guiada",
      bubbles: [
        "Hagámoslo juntos. Suelta los hombros y afloja la mandíbula 😮‍💨",
        "Inhala por la nariz contando 4... y exhala lento por la boca contando 6. La exhalación larga es la que calma. Repítelo 6 veces, yo espero.",
        "Ahora ancla: nombra mentalmente 5 cosas que ves a tu alrededor, 4 que puedes tocar, 3 sonidos que oyes.",
        "Cuando sientas que el pecho afloja, vuelve aquí. ¿Cómo estás del 1 al 5?"
      ],
      steps: [
        "Respiración 4-6 durante 2 o 3 minutos.",
        "Grounding 5-4-3-2-1 con los sentidos.",
        "Toma agua, camina o lava tu cara con agua fría.",
        "Solo vuelve a la conversación cuando estés en 3 o menos del termómetro."
      ],
      phrase: "Ya estoy más tranquilo/a. ¿Podemos retomar la conversación con calma?",
      actions: [
        { label: "🪡 Ya estoy mejor, quiero reparar", prompt: "Ya me calmé. Ayúdame a reparar la pelea." },
        { label: "🫧 Sigo muy alterado/a", prompt: "Sigo muy alterado/a, necesito más tiempo." }
      ]
    },
    {
      id: "criticismContempt",
      priority: 90,
      keywords: ["me critica", "me critican", "todo le parece mal", "desprecio", "burla", "se burla", "sarcasmo", "sarcástico", "me humilla", "ojos en blanco", "me insulta", "insultos", "me trata mal", "me ridiculiza"],
      title: "Crítica y desprecio: los venenos fuertes",
      status: "Modo: frenar los jinetes",
      bubbles: [
        "Lo que describes coincide con lo que la investigación de Gottman llama \"los jinetes\" de la relación: crítica al carácter y desprecio (burla, sarcasmo, humillación). Son los patrones que más daño predicen.",
        "Importante: una queja sobre algo concreto es sana. El problema es cuando se vuelve ataque a la persona: \"eres un/a...\" en vez de \"me molestó que...\".",
        "El desprecio es el más tóxico de todos. Ahí no se negocia el tono: se pone límite.",
        "¿Quieres ver cómo poner ese límite, o una frase para nombrar lo que pasa sin escalar?"
      ],
      steps: [
        "Nombra el patrón, no la maldad: \"Cuando hay burla o sarcasmo, yo me cierro y la conversación se daña.\"",
        "Pide el cambio concreto: \"Dime qué te molestó de lo que hice, sin etiquetas sobre cómo soy.\"",
        "Antídoto de la crítica: hablar de una situación específica + lo que sientes + lo que necesitas.",
        "Antídoto del desprecio: construir aprecio diario. Y si hay humillación constante, eso ya no es comunicación: es maltrato, y merece ayuda profesional."
      ],
      phrase: "Puedo escuchar lo que te molesta de lo que hago. Lo que no puedo aceptar es burla o insulto. Hablemos del hecho concreto, sin etiquetas.",
      actions: [
        { label: "🛑 Frase de límite", prompt: "Dame una frase firme y amable para poner límite a la burla o el sarcasmo." },
        { label: "🪞 ¿Y si el que critica soy yo?", prompt: "Creo que yo soy quien critica mucho. Ayúdame a cambiarlo." }
      ]
    },
    {
      id: "softStartup",
      priority: 86,
      keywords: ["soy quien critica", "yo critico", "empiezo mal las conversaciones", "siempre peleamos cuando hablo", "como sacar un tema", "cómo sacar un tema", "sacar el tema sin pelear"],
      title: "Inicio suave: el 96% del resultado",
      status: "Modo: inicio suave",
      bubbles: [
        "Dato útil de la investigación de Gottman: cómo empieza una conversación predice casi siempre cómo termina. Si arranca con reproche, escala. Si arranca suave, hay chance real.",
        "Inicio suave no es endulzar ni callarte. Es empezar por ti (\"yo siento\") y por el hecho concreto, no por el juicio (\"tú eres\").",
        "¿Te muestro la fórmula?"
      ],
      steps: [
        "Empieza con \"yo\", no con \"tú\": \"Yo me sentí solo/a anoche\" en vez de \"Tú nunca estás\".",
        "Describe el hecho, no al culpable: \"Los platos quedaron sin lavar\" en vez de \"Eres un desastre\".",
        "Di qué necesitas en positivo: qué SÍ quieres, no solo qué te molesta.",
        "Aprecia algo real antes de pedir: suaviza la defensa del otro lado.",
        "Sin \"siempre\" ni \"nunca\". Son palabras que convierten quejas en juicios."
      ],
      phrase: "Quiero contarte algo sin que sea pelea. Cuando pasó ___, yo me sentí ___. Me ayudaría mucho que ___. ¿Lo intentamos?",
      actions: [
        { label: "📝 Traducir lo que quiero decir", prompt: "Quiero decir algo difícil sin herir. Ayúdame a traducirlo." }
      ]
    },
    {
      id: "stonewalling",
      priority: 85,
      keywords: ["ley del hielo", "me ignora", "no me habla", "se calla", "se encierra", "se va y no responde", "silencio", "me deja en visto", "no responde", "se cierra", "muro", "evade", "evita hablar"],
      title: "Cuando el otro se cierra (o tú)",
      status: "Modo: entender el muro",
      bubbles: [
        "Eso que describes tiene nombre: \"stonewalling\" o levantar un muro. Es uno de los patrones más frustrantes... y casi nunca es indiferencia.",
        "La mayoría de las veces quien se calla está sobrepasado por dentro: el cuerpo se le inundó y se desconecta para no explotar. Parece frialdad, pero suele ser autoprotección.",
        "El truco no es perseguir más fuerte (eso aumenta el muro) ni rendirse. Es pactar pausas con regreso garantizado.",
        "¿Quieres pasos para proponerle eso, o una frase para hoy?"
      ],
      steps: [
        "En frío (no en plena pelea), propón: \"Cuando te satura la conversación, dime 'necesito una pausa' en vez de quedarte en silencio.\"",
        "Pacten que toda pausa tiene hora de regreso: 20-30 minutos, máximo 24 horas.",
        "Si el que se cierra eres tú: avisa antes de callarte. El silencio sin aviso se siente como castigo.",
        "Cuando vuelvan, empieza por algo pequeño y concreto, no por \"tenemos que hablar de todo\"."
      ],
      phrase: "Cuando te quedas en silencio yo me asusto y aprieto más, y sé que eso te abruma. Propongo algo: si te saturas, pides pausa y me dices cuándo retomamos. Yo prometo respetarla.",
      actions: [
        { label: "🤝 Crear acuerdo de pausas", prompt: "Ayúdanos a crear un acuerdo de pausas con regreso garantizado." },
        { label: "🎙️ Modo dos voces", prompt: "Hagamos modo dos voces: cada uno dice qué pasó, qué sintió y qué necesita." }
      ]
    },
    {
      id: "pursueWithdraw",
      priority: 83,
      keywords: ["me agobia", "me asfixia", "necesito espacio", "no me da espacio", "se aleja cuando", "entre mas insisto", "entre más insisto", "lo persigo", "la persigo", "yo busco y se aleja", "me siento perseguido", "me siento perseguida", "uno persigue", "demandante", "intenso con el", "intensa con el"],
      title: "El baile perseguidor-distanciador",
      status: "Modo: salir del ciclo",
      bubbles: [
        "Lo que cuentas es un ciclo clásico que describe la terapia de pareja (Sue Johnson lo llama perseguidor-distanciador): uno busca conexión con insistencia, el otro se abruma y se aleja, lo que hace que el primero insista más fuerte. Y así, en bucle 🔄",
        "La clave: ninguno de los dos es el malo. El que persigue tiene miedo de perder al otro. El que se aleja tiene miedo de fallar o de ahogarse. Dos miedos bailando.",
        "El ciclo se rompe cuando dejan de pelear entre ustedes y empiezan a hablar DEL ciclo, como equipo contra el patrón.",
        "¿Te muestro cómo empezar esa conversación?"
      ],
      steps: [
        "Nombra el baile sin culpas: \"Creo que entramos en un ciclo: yo insisto, tú te alejas, yo insisto más. Nos pasa a los dos.\"",
        "El que persigue traduce su reclamo a miedo: \"Cuando no respondes, me da miedo no importarte\" (más vulnerable, menos lanzallamas).",
        "El que se aleja traduce su silencio: \"No me alejo porque no me importes, me alejo porque me saturo y no sé qué decir.\"",
        "Acuerden señales: una palabra para pedir espacio con regreso, y un gesto pequeño de conexión diaria que no cueste tanto."
      ],
      phrase: "Creo que tenemos un patrón: cuando yo busco mucho, tú te alejas, y cuando te alejas, yo busco más fuerte. No quiero pelear contra ti, quiero que le ganemos juntos al patrón.",
      actions: [
        { label: "💬 Frase para el que persigue", prompt: "Ayúdame a pedir conexión sin sonar a reclamo ni persecución." },
        { label: "💬 Frase para el que se aleja", prompt: "Ayúdame a pedir espacio sin que mi pareja sienta abandono." }
      ]
    },
    {
      id: "invalidation",
      priority: 82,
      keywords: ["calmate", "cálmate", "no es para tanto", "exager", "histérica", "histerico", "intensa", "intenso", "loca", "loco", "invalid", "me minimiza", "me toma como", "me hace sentir tonta", "me hace sentir boba"],
      title: "Cuando minimizan lo que sientes",
      status: "Modo: validar antes de corregir",
      bubbles: [
        "Uf, el clásico \"no es para tanto\" 🙃 El tema de fondo ya no es la pelea original: es que tu emoción quedó reducida a \"exageras\".",
        "Algo que la psicología de pareja repite mucho: la reparación empieza validando el impacto, no explicando la intención. La intención pudo ser buena; el impacto igual cuenta.",
        "¿Quieres una frase para pedir que te validen, o armamos un acuerdo para que no se repita?"
      ],
      steps: [
        "Frase base: \"Cuando me dices 'cálmate' o 'no es para tanto', me siento invalidado/a. No necesito que estés de acuerdo, necesito que reconozcas que para mí fue importante.\"",
        "Petición concreta: \"Antes de corregirme o bromear, pregúntame si me estoy desahogando o si quiero soluciones.\"",
        "Acuerdo útil: cambiar \"cálmate\" por \"te escucho, bajemos el ritmo\"."
      ],
      phrase: "No necesito que me des la razón en todo. Necesito que primero reconozcas que para mí sí fue importante. Después de eso, podemos ver soluciones.",
      actions: [
        { label: "🤝 Crear acuerdo", prompt: "Ayúdanos a crear un acuerdo para no invalidarnos cuando uno está molesto." },
        { label: "🪡 Mensaje reparador", prompt: "Dame un mensaje reparador para alguien que se sintió invalidado/a." }
      ]
    },
    {
      id: "repair",
      priority: 80,
      keywords: ["reparar", "disculpa", "perdón", "perdon", "arreglar", "después de pelear", "despues de pelear", "la embarré", "la embarre", "me equivoqué", "me equivoque", "quiero volver", "reconciliar", "peleamos", "acabamos de pelear", "discutimos", "pelea"],
      title: "Reparar: el superpoder de las parejas que duran",
      status: "Modo: reparación",
      bubbles: [
        "Dato que tranquiliza: las parejas que funcionan no son las que no pelean. Son las que reparan rápido y seguido. Eso dice décadas de investigación de Gottman.",
        "Reparar no es \"ya, superémoslo\" esperando que el universo borre el registro 😅 Una buena reparación tiene 4 partes: reconocer el impacto, asumir tu parte, nombrar lo que querías expresar y proponer algo distinto.",
        "¿Armamos tu disculpa paso a paso, o prefieres una frase lista para adaptar?"
      ],
      steps: [
        "Reconozco: \"Entiendo que lo que hice/dije te pudo hacer sentir ___.\"",
        "Asumo: \"Mi parte fue ___, aunque no fuera mi intención lastimarte.\"",
        "Necesito: \"Lo que yo intentaba expresar era ___.\"",
        "Propongo: \"La próxima vez voy a ___ y te pido que tú puedas ___.\"",
        "Micro-reparaciones también valen: \"¿Empezamos de nuevo?\", \"No quiero pelear, quiero entenderte\", un abrazo, humor suave."
      ],
      phrase: "Entiendo que esto te dolió. Mi intención no era hacerte sentir así, pero veo que mi forma tuvo impacto. Mi parte fue ___. Me gustaría hablarlo con calma y acordar una forma distinta para la próxima.",
      actions: [
        { label: "🪡 Armar mi disculpa", prompt: "Ayúdame a armar una disculpa concreta con responsabilidad." },
        { label: "🤝 Acuerdo para no repetir", prompt: "Necesitamos un acuerdo para que esto no se repita igual." }
      ]
    },
    {
      id: "translate",
      priority: 78,
      keywords: ["responder", "mensaje", "cómo le digo", "como le digo", "quiero decirle", "escribirle", "whatsapp", "traducir", "sin herir", "sin pelear", "sin sonar", "decir algo difícil", "decir algo dificil"],
      title: "Traducir sin herir",
      status: "Modo: mensaje cuidadoso",
      bubbles: [
        "Perfecto, este es mi deporte favorito 📝 Convertir el reclamo en una frase que diga lo importante sin meterle veneno.",
        "La fórmula (viene de la Comunicación No Violenta): hecho concreto + emoción + necesidad + petición. Sin \"siempre\", sin \"nunca\", sin leer la mente del otro.",
        "Pégame la frase cruda o cuéntame qué quieres decir, y la traducimos juntas/os."
      ],
      steps: [
        "Hecho (sin juicio): \"Cuando pasó ___\" — algo que una cámara podría grabar.",
        "Emoción: \"Me sentí ___\" (triste, frustrado/a, solo/a... evita \"me sentí ignorado\" que ya acusa).",
        "Necesidad: \"Lo que necesito es ___\" (apoyo, claridad, tiempo juntos...).",
        "Petición concreta y realizable: \"¿Podrías ___?\" — y recuerda: petición, no exigencia."
      ],
      phrase: "Cuando pasó ___, me sentí ___. Lo que necesito es ___. ¿Podríamos intentar ___?",
      actions: [
        { label: "✍️ Versión más firme", prompt: "Hazme una versión amable pero firme de mi mensaje: " },
        { label: "💛 Versión más cálida", prompt: "Hazme una versión más cálida y vulnerable de mi mensaje: " }
      ]
    },
    {
      id: "needs",
      priority: 74,
      keywords: ["necesito", "necesidad", "me falta", "quiero que entienda", "no me entiende", "sentí", "siento", "me duele", "me molesta", "me preocupa", "ansiedad", "presión", "presion"],
      title: "Buscar la necesidad debajo",
      status: "Modo: emoción + necesidad",
      bubbles: [
        "Casi todas las peleas parecen ser por una frase, un tono o una tarea... pero debajo suele haber una necesidad básica: sentirse importante, seguro/a, descansado/a, reconocido/a o conectado/a.",
        "La pregunta clave no es \"¿quién tiene razón?\" (trampa barata). Es: \"¿qué necesidad válida está defendiendo cada uno?\"",
        "Cuéntame qué pasó y buscamos juntos esa necesidad. O si prefieres, te doy la plantilla para hacerlo tú."
      ],
      steps: [
        "Completa: \"Me dolió ___ porque para mí significa ___.\"",
        "Luego: \"La necesidad que hay debajo es ___.\"",
        "Después pregunta al otro: \"¿Qué necesidad tuya apareció ahí?\"",
        "Cierren con una acción pequeña para hoy, no con una reforma total de la relación."
      ],
      phrase: "Me dolió ___ porque para mí significa ___. Creo que lo que necesito es ___. ¿Qué necesitabas tú en ese momento?",
      actions: [
        { label: "🔍 Identificar mi necesidad", prompt: "Ayúdame a identificar la necesidad detrás de esto: " },
        { label: "❓ Preguntas para entender", prompt: "Dame preguntas suaves para entender a mi pareja sin defenderme." }
      ]
    },
    {
      id: "jealousyTrust",
      priority: 72,
      keywords: ["celos", "confianza", "desconfianza", "ex", "mentira", "me ocultó", "me oculto", "revisar celular", "redes", "instagram", "quién es", "quien es", "coqueteo"],
      title: "Confianza, límites y celos",
      status: "Modo: seguridad sin control",
      bubbles: [
        "Los celos suelen ser un combo: miedo + historia pasada + necesidad de seguridad + ganas de controlar. Cóctel fuerte 🍸",
        "La meta no es vigilancia total ni fingir que nada duele. Es distinguir entre tranquilidad legítima, acuerdos de cuidado y conductas de control.",
        "Spoiler importante: revisar celulares y exigir pruebas no construye confianza. Construye una cárcel con emojis.",
        "¿Quieres expresar el celo sin acusar, o armar un acuerdo de confianza entre los dos?"
      ],
      steps: [
        "Nombra el hecho sin acusar intención: \"Cuando vi/supe ___.\"",
        "Nombra el miedo de fondo: \"Me dio miedo que ___.\"",
        "Pide transparencia específica, no control total: \"Me ayudaría que me cuentes ___.\"",
        "Límite sano: aislar amistades, revisar dispositivos o exigir pruebas permanentes son señales de control, no de amor."
      ],
      phrase: "Cuando supe ___, me dio miedo ___. No quiero controlarte; quiero entender y sentirme tranquilo/a. ¿Podemos hablar de qué nos da seguridad a cada uno?",
      actions: [
        { label: "🤝 Acuerdo de confianza", prompt: "Ayúdanos a crear un acuerdo de confianza que no sea control." },
        { label: "💬 Expresar celos sin acusar", prompt: "Ayúdame a expresar celos sin acusar ni controlar." }
      ]
    },
    {
      id: "infidelity",
      priority: 71,
      keywords: ["infiel", "infidelidad", "me engañó", "me engaño", "engañando", "traición", "traicion", "le escribía a otra", "le escribia a otra", "otra persona", "otro hombre", "otra mujer", "descubrí mensajes", "descubri mensajes"],
      title: "Después de una traición",
      status: "Modo: cuidado tras la herida",
      bubbles: [
        "Lo que estás viviendo es de las heridas más duras en una relación. Antes de cualquier técnica: lo que sientes (rabia, dolor, confusión, todo a la vez) es normal y válido.",
        "Te soy honesto: esto supera lo que un bot puede acompañar bien. La reconstrucción (o el cierre) después de una infidelidad casi siempre necesita ayuda profesional de pareja o individual.",
        "Lo que sí puedo darte: primeros pasos para no decidir todo hoy ni en caliente.",
        "¿Quieres verlos?"
      ],
      steps: [
        "No tomes decisiones permanentes en las primeras 72 horas. El dolor agudo decide mal.",
        "Busca apoyo fuera de la pareja: una persona de confianza o un profesional. No lo cargues solo/a.",
        "Si deciden intentarlo: la persona que rompió la confianza es quien sostiene la transparencia, sin que se la tengan que arrancar.",
        "Si decides cerrar: cerrar también es una forma válida de cuidarte. No es fracaso.",
        "Pongan reglas mínimas mientras deciden: dónde duerme cada uno, qué se cuenta a terceros, cuándo hablan del tema (no a toda hora)."
      ],
      phrase: "Ahora mismo estoy demasiado herido/a para decidir. Necesito tiempo y reglas claras mientras proceso. Hablemos el ___ con calma, no a toda hora.",
      actions: [
        { label: "🫧 Necesito calmarme primero", prompt: "Necesito calmarme antes de hablar. Guíame." },
        { label: "🆘 Ver rutas de ayuda", prompt: "Ver rutas de ayuda" }
      ]
    },
    {
      id: "chores",
      priority: 68,
      keywords: ["tareas", "oficios", "la casa", "no ayuda", "yo hago todo", "carga mental", "desorden", "limpiar", "cocinar", "los niños", "me toca todo", "no colabora"],
      title: "Tareas y carga mental",
      status: "Modo: repartir en serio",
      bubbles: [
        "El conflicto por tareas casi nunca es por los platos. Es por lo que los platos significan: \"¿estamos en equipo o yo cargo sola/o?\" 🏋️",
        "Hay algo invisible que pesa más que la tarea: la carga mental. No es solo hacer, es ser quien recuerda, planea y supervisa todo.",
        "La salida no es \"ayúdame más\" (eso asume que la casa es tuya y el otro ayuda). Es repartir dueños de tareas completas: quien la tiene, la piensa, la hace y la termina.",
        "¿Armamos el reparto, o primero necesitas decirle esto sin que suene a regaño?"
      ],
      steps: [
        "Hagan lista de TODO, incluyendo lo invisible: recordar cumpleaños, pedir citas, planear mercado.",
        "Cada tarea tiene un dueño completo: la piensa, la ejecuta y la cierra. Sin supervisores.",
        "Acuerden el estándar juntos: \"limpio\" debe significar lo mismo para ambos.",
        "Revisión semanal de 10 minutos. Se ajusta sin juicio, no se acumula resentimiento."
      ],
      phrase: "No quiero ser quien administra la casa y reparte órdenes. Quiero que dividamos tareas completas: cada uno es dueño de las suyas, de principio a fin. ¿Hacemos la lista juntos?",
      actions: [
        { label: "🤝 Acuerdo de tareas", prompt: "Ayúdanos a crear un acuerdo de reparto de tareas con dueños claros." },
        { label: "💬 Explicar la carga mental", prompt: "Ayúdame a explicarle a mi pareja qué es la carga mental sin sonar a regaño." }
      ]
    },
    {
      id: "money",
      priority: 66,
      keywords: ["plata", "dinero", "gastos", "deuda", "deudas", "pagar", "ingresos", "compras", "banco", "tarjeta", "ahorro", "presupuesto"],
      title: "Dinero sin juicio moral",
      status: "Modo: acuerdos financieros",
      bubbles: [
        "El dinero en pareja nunca es solo dinero 💸 Es seguridad, miedo, libertad, poder y cansancio, todo en un Excel emocional que nadie pidió abrir.",
        "El truco es separar tres cosas que solemos mezclar: los hechos financieros, las emociones que despiertan y las decisiones concretas.",
        "¿Quieres un guion para hablar de plata sin pelear, o armamos directamente el acuerdo de gastos?"
      ],
      steps: [
        "Hecho: \"Tenemos ___ por pagar / entra ___ / sale ___.\" Solo números.",
        "Emoción: \"Esto me genera ___\" (miedo, presión, rabia, vergüenza).",
        "Valor: \"Para mí es importante ___: seguridad, libertad, orden o disfrute.\"",
        "Acuerdo con monto, fecha, responsable y fecha de revisión. Si le falta algo de eso, es deseo decorativo."
      ],
      phrase: "Quiero que hablemos de plata sin pelear. Propongo: primero los números fríos, después cómo nos sentimos, y al final un acuerdo con monto, fecha y responsable. ¿Te parece el ___?",
      actions: [
        { label: "🤝 Acuerdo de gastos", prompt: "Ayúdanos a crear un acuerdo de gastos de pareja." },
        { label: "📋 Guion para hablar de dinero", prompt: "Dame un guion para hablar de dinero sin pelear." }
      ]
    },
    {
      id: "family",
      priority: 62,
      keywords: ["familia", "mamá", "mama", "papá", "papa", "hermana", "hermano", "suegra", "suegro", "visita", "límites familia", "limites familia"],
      title: "Familia externa, equipo interno",
      status: "Modo: límites con terceros",
      bubbles: [
        "Cuando entra la familia, la regla de oro es: primero acuerdo interno, después mensaje externo. La pareja decide como equipo antes de responderle a nadie.",
        "Y otra clave: cada quien pone el límite a SU familia. Que tu pareja enfrente a tu mamá por ti casi nunca termina bien 😅",
        "¿Necesitas el acuerdo entre ustedes, o redactar el límite amable para la familia?"
      ],
      steps: [
        "Define qué pasó sin atacar a la familia: \"Cuando ocurre ___.\"",
        "Explica el impacto en la pareja: \"Nos afecta porque ___.\"",
        "Acuerdo interno primero: \"Entre nosotros vamos a ___.\"",
        "Mensaje externo después: breve, respetuoso, firme, y lo da el hijo/a de esa familia."
      ],
      phrase: "Te quiero mucho y queremos verlos. También necesitamos ___ (avisar antes de visitar / decidir esto nosotros). No es contra nadie, es cómo funcionamos como pareja.",
      actions: [
        { label: "💌 Redactar límite amable", prompt: "Ayúdame a redactar un límite amable para familia externa." },
        { label: "🤝 Acuerdo interno primero", prompt: "Ayúdanos a crear un acuerdo interno sobre familia y límites." }
      ]
    },
    {
      id: "distanceConnection",
      priority: 58,
      keywords: ["distancia", "frío", "fria", "frio", "seco", "seca", "no me busca", "no me abraza", "desconect", "no hablamos", "tiempo juntos", "prioridad", "solo trabajo", "cansancio", "rutina", "monotonía", "monotonia", "apagado", "apagada"],
      title: "Reconectar sin pasar factura",
      status: "Modo: conexión",
      bubbles: [
        "A veces el reclamo \"no me buscas\" en realidad dice \"quiero sentir que sigo siendo importante para ti\". Mucho más vulnerable, mucho menos lanzallamas 🔥➡️🕯️",
        "Y un dato de la investigación: la conexión no se recupera con gestos gigantes, sino con micro-momentos diarios. Responder al comentario pequeño, el abrazo de 30 segundos, el café sin celular.",
        "¿Quieres una frase vulnerable para decirlo, o diseñamos un ritual pequeño de reconexión?"
      ],
      steps: [
        "Di: \"He sentido distancia y me gustaría recuperar conexión contigo\" — necesidad, no factura vencida.",
        "Propón una acción mínima: abrazo de 30 segundos, caminar 10 minutos, no cerrar el día peleados.",
        "Pregunta: \"¿Qué forma de conexión te pesa menos cuando estás cansado/a?\"",
        "Acuerden un momento semanal corto, realista y protegido (sin celulares)."
      ],
      phrase: "He sentido distancia entre nosotros y te extraño, aunque vivamos juntos. No te lo digo como reclamo: me gustaría que busquemos un momento pequeño al día solo para nosotros. ¿Qué te pesaría menos?",
      actions: [
        { label: "💞 Diseñar ritual de conexión", prompt: "Diseña un ritual corto de conexión para pareja ocupada." },
        { label: "💬 Mensaje vulnerable", prompt: "Ayúdame a decir que extraño la conexión sin sonar acusador/a." }
      ]
    },
    {
      id: "intimacy",
      priority: 56,
      keywords: ["intimidad", "deseo", "sexo", "no me toca", "rechazo", "ya no quiere", "no quiere estar conmigo", "frecuencia", "sin ganas"],
      title: "Hablar de intimidad sin herir",
      status: "Modo: intimidad",
      bubbles: [
        "Tema delicado y valiente de traer 💜 Primero: las diferencias de deseo son de lo más común en parejas, y casi nunca significan \"ya no te quiere\".",
        "El deseo se apaga por muchas vías: estrés, cansancio, resentimientos acumulados, rutina, salud. Y se daña más cuando se convierte en reproche o en obligación.",
        "La conversación funciona mejor fuera de la cama y sin presión: hablar de cercanía, no de cuotas.",
        "¿Quieres una forma de sacar el tema con cuidado?"
      ],
      steps: [
        "Elige un momento neutro, nunca justo después de un rechazo ni en la cama.",
        "Habla desde el extrañar, no desde la queja: \"Extraño sentirte cerca\" en vez de \"nunca quieres\".",
        "Pregunta sin presionar: \"¿Hay algo que te tenga apagado/a? ¿Estrés, cansancio, algo entre nosotros?\"",
        "Reconstruyan cercanía sin meta: afecto físico que no \"tiene que terminar en algo\" quita presión y suele reabrir el deseo.",
        "Si hay dolor físico, cambios bruscos o esto lleva mucho tiempo: profesional (médico o terapeuta sexual). No es exageración, es cuidado."
      ],
      phrase: "Extraño sentirte cerca, y no te lo digo como reclamo. Me gustaría que hablemos de cómo estamos los dos con esto, sin presión y sin culpas. ¿Te parece?",
      actions: [
        { label: "💬 Sacar el tema con cuidado", prompt: "Ayúdame a sacar el tema de la intimidad sin presionar ni herir." },
        { label: "💞 Reconstruir cercanía", prompt: "Diseña pasos pequeños para reconstruir cercanía física sin presión." }
      ]
    },
    {
      id: "decision",
      priority: 54,
      keywords: ["decidir", "decisión", "decision", "qué hacemos", "que hacemos", "no sabemos", "opciones", "acuerdo", "plan", "responsable", "quién se encarga", "quien se encarga"],
      title: "De vueltas mentales a decisión",
      status: "Modo: claridad",
      bubbles: [
        "Suena a que necesitan menos debate infinito y más estructura 🧭",
        "Una buena decisión de pareja no exige que ambos sientan lo mismo. Exige que ambos entiendan el acuerdo y puedan cumplirlo.",
        "¿Usamos la matriz rápida? Es corta: problema en una frase, máximo 3 opciones, criterios y acuerdo final."
      ],
      steps: [
        "Problema en una frase: \"Necesitamos decidir ___.\"",
        "Opciones reales: máximo 3. Más de eso es decoración ansiosa.",
        "Criterios: tranquilidad, dinero, tiempo, cuidado emocional, justicia.",
        "Acuerdo final: qué, quién, cuándo y cómo se revisa."
      ],
      phrase: "Acuerdo: cuando ocurra ___, la persona responsable de ___ hará ___ antes de ___. Lo revisamos el día ___ y si no funciona, ajustamos sin culparnos.",
      actions: [
        { label: "🧮 Matriz rápida", prompt: "Ayúdanos a elegir entre opciones con criterios de pareja." },
        { label: "📋 Repartir tareas", prompt: "Ayúdanos a repartir responsabilidades de forma clara y amable." }
      ]
    },
    {
      id: "appreciate",
      priority: 50,
      keywords: ["estamos bien", "vamos bien", "fortalecer", "agradecer", "celebrar", "mejorar la relación", "mejorar la relacion", "mantener la relación", "mantener la relacion", "sumar puntos", "aprecio"],
      title: "Sumar cuando están bien",
      status: "Modo: fortalecer",
      bubbles: [
        "Me encanta que vengas cuando NO hay incendio 🧯💛 Eso es justo lo que hacen las parejas que duran.",
        "Dato de la investigación de Gottman: las relaciones estables mantienen una proporción de 5 interacciones positivas por cada negativa. El amor se sostiene con depósitos pequeños y frecuentes.",
        "¿Te doy ideas de micro-depósitos diarios, o un ritual semanal para ustedes?"
      ],
      steps: [
        "Aprecio específico diario: no \"gracias por todo\" sino \"gracias por hacerme café cuando me viste cansada\".",
        "Responde a los gestos pequeños: cuando tu pareja comenta algo, levanta la vista. Esos micro-momentos son los ladrillos de la confianza.",
        "Pregunta semanal: \"¿Qué hice esta semana que te hizo bien? ¿Y qué te hizo falta?\"",
        "Celebren lo bueno del otro en voz alta, también frente a otros.",
        "Un ritual protegido a la semana: corto, sin celulares, solo de ustedes."
      ],
      phrase: "Gracias por ___ esta semana. Me hizo sentir ___. Quiero que sigamos cuidando esto: ¿qué hice yo que te hizo bien, y qué te hizo falta?",
      actions: [
        { label: "💛 Ideas de micro-depósitos", prompt: "Dame ideas de gestos pequeños diarios para fortalecer la relación." },
        { label: "💞 Ritual semanal", prompt: "Diseña un ritual semanal corto de conexión para nosotros." }
      ]
    }
  ],

  fallback: {
    id: "fallback",
    title: "Vamos a ordenar esto",
    status: "Modo: escucha y claridad",
    bubbles: [
      "Te leo. No necesito todo el contexto para empezar a ayudarte 🙂",
      "Para no perdernos, ayúdame con una cosa: ¿qué es lo más fuerte ahora mismo?",
      "Puedes elegir abajo o contarme con tus palabras."
    ],
    steps: [
      "Hecho: ¿qué pasó, sin adjetivos?",
      "Emoción: ¿qué sentiste exactamente?",
      "Interpretación: ¿qué historia te contó tu mente?",
      "Necesidad: ¿qué necesitabas y no apareció?",
      "Petición: ¿qué acción concreta ayudaría ahora?"
    ],
    phrase: "Cuando pasó ___, me sentí ___. Para mí significó ___. Lo que necesito es ___. ¿Podemos intentar ___?",
    actions: [
      { label: "😮‍💨 Acabamos de pelear", prompt: "Acabamos de pelear y no sé qué hacer." },
      { label: "💬 Quiero decir algo difícil", prompt: "Quiero decir algo difícil sin herir. Ayúdame a traducirlo." },
      { label: "🌫️ Siento distancia", prompt: "Siento distancia entre nosotros." },
      { label: "🫧 Necesito calmarme", prompt: "Necesito calmarme antes de hablar. Guíame." }
    ]
  },

  templates: {
    pause: "Quiero hablarlo bien, pero ahora estoy muy activado/a. Necesito 20 minutos para calmarme y vuelvo. No me estoy yendo del tema, estoy cuidando cómo lo hablamos.",
    repair: "Entiendo que esto te dolió. Mi intención no era hacerte sentir así, pero veo que mi forma tuvo impacto. Mi parte fue ___. Me gustaría hablarlo con calma y acordar una forma distinta para la próxima vez.",
    boundary: "Esto es importante para mí. Puedo escucharte y también necesito que lo hablemos sin insultos, gritos ni frases que minimicen lo que siento. Si sube el tono, pausamos y volvemos.",
    nvc: "Cuando pasó ___, me sentí ___. Para mí significó ___. Lo que necesito es ___. ¿Podemos intentar ___?",
    twoVoices: "Persona A: hecho, emoción, necesidad, petición. Persona B repite lo que entendió antes de responder. Luego se invierten los turnos.",
    agreement: "Acuerdo: cuando ocurra ___, la persona responsable de ___ hará ___ antes de ___. Lo revisamos el día ___ y, si no funciona, ajustamos sin culparnos."
  },

  feelingWords: ["rabia", "tristeza", "miedo", "ansiedad", "culpa", "vergüenza", "soledad", "frustración", "agotamiento", "confusión", "dolor", "inseguridad", "ternura", "celos"],
  needWords: ["claridad", "seguridad", "respeto", "descanso", "apoyo", "autonomía", "cariño", "presencia", "reconocimiento", "orden", "justicia", "confianza", "tiempo", "calma", "cuidado"]
};
