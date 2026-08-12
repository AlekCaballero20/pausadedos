(function () {
  const KB = window.COUPLES_KB;
  const Engine = window.PAUSA_ENGINE;
  const els = {
    messages: document.getElementById("messages"),
    template: document.getElementById("messageTemplate"),
    form: document.getElementById("chatForm"),
    input: document.getElementById("userInput"),
    suggestionRow: document.getElementById("suggestionRow"),
    modeGrid: document.getElementById("modeGrid"),
    heatBtn: document.getElementById("heatBtn"),
    heatPanel: document.getElementById("heatPanel"),
    heatRange: document.getElementById("heatRange"),
    heatLabel: document.getElementById("heatLabel"),
    safetyDialog: document.getElementById("safetyDialog"),
    openSafetyBtn: document.getElementById("openSafetyBtn"),
    closeSafetyBtn: document.getElementById("closeSafetyBtn"),
    modesBtn: document.getElementById("modesBtn"),
    modesSheet: document.getElementById("modesSheet"),
    menuBtn: document.getElementById("menuBtn"),
    menuSheet: document.getElementById("menuSheet"),
    exportBtn: document.getElementById("exportBtn"),
    exportTxtBtn: document.getElementById("exportTxtBtn"),
    clearBtn: document.getElementById("clearBtn"),
    leftEye: document.getElementById("leftEye"),
    rightEye: document.getElementById("rightEye"),
    mouth: document.getElementById("mouth"),
    avatarAura: document.getElementById("avatarAura"),
    avatarStatus: document.getElementById("avatarStatus"),
    privateModeBtn: document.getElementById("privateModeBtn"),
    privateBadge: document.getElementById("privateBadge"),
    privacyNote: document.getElementById("privacyNote"),
    privacyNoteBtn: document.getElementById("privacyNoteBtn"),
    dismissPrivacyNote: document.getElementById("dismissPrivacyNote")
    ,profileBtn: document.getElementById("profileBtn"),
    profileDialog: document.getElementById("profileDialog"),
    closeProfileBtn: document.getElementById("closeProfileBtn"),
    profileForm: document.getElementById("profileForm"),
    userNameInput: document.getElementById("userNameInput"),
    partnerNameInput: document.getElementById("partnerNameInput"),
    clearNamesBtn: document.getElementById("clearNamesBtn"),
    profilePrivacyText: document.getElementById("profilePrivacyText"),
    profileIntro: document.getElementById("profileIntro"),
    skipProfileBtn: document.getElementById("skipProfileBtn")
  };

  const STORAGE_KEY = "pausaDeDos.history.v2";
  const PRIVATE_KEY = "pausaDeDos.privateMode.v1";
  const ONBOARDING_KEY = "pausaDeDos.onboarding.v1";
  const APP_STORAGE_KEYS = [STORAGE_KEY, "pausaDeDos.history.v1", "pausaDeDos.context.v1",
    "pausaDeDos.repairLog.v1", "pausaDeDos.lastSeen", "pausaDeDos.userName.v1",
    PRIVATE_KEY, ONBOARDING_KEY, "pausaDeDos.privacyNotice.v1"];
  let privateMode = localStorage.getItem(PRIVATE_KEY) === "true";
  let history = loadHistory();
  let lastIntent = null; // para "ver pasos" / "frase lista"
  let activeFlow = null;
  let conversationContext = loadConversationContext();
  let repairLog = loadRepairLog();
  let busy = false;
  let onboardingPending = false;

  /* ---------- Avatar ---------- */

  function updateAvatar(heat, isTyping = false, customState = null) {
    const { avatarAura: aura, leftEye, rightEye, mouth, avatarStatus: status } = els;
    if (!aura || !leftEye || !rightEye || !mouth || !status) return;

    aura.className = "avatar-aura";

    let state = customState;
    if (!state) {
      if (heat >= 5) state = "crisis";
      else if (heat >= 4) state = "alert";
      else if (heat >= 3) state = "attentive";
      else state = "calm";
    }
    if (isTyping) state = "thinking";

    if (state === "crisis") {
      aura.classList.add("aura-danger");
      leftEye.setAttribute("d", "M 32,46 L 38,43");
      rightEye.setAttribute("d", "M 68,46 L 62,43");
      mouth.setAttribute("d", "M 46,65 Q 50,60 54,65");
      status.textContent = "Aquí contigo · Tu seguridad primero";
    } else if (state === "alert") {
      aura.classList.add("aura-tension");
      leftEye.setAttribute("d", "M 32,45 L 38,44");
      rightEye.setAttribute("d", "M 68,45 L 62,44");
      mouth.setAttribute("d", "M 45,64 L 55,64");
      status.textContent = "Atento · Bajemos revoluciones";
    } else if (state === "attentive") {
      aura.classList.add("aura-primary");
      leftEye.setAttribute("d", "M 30,46 Q 35,48 40,46");
      rightEye.setAttribute("d", "M 60,46 Q 65,48 70,46");
      mouth.setAttribute("d", "M 45,63 Q 50,65 55,63");
      status.textContent = "Escuchando con atención";
    } else if (state === "thinking") {
      aura.classList.add("aura-primary");
      leftEye.setAttribute("d", "M 30,47 Q 35,44 40,47");
      rightEye.setAttribute("d", "M 60,47 Q 65,44 70,47");
      mouth.setAttribute("d", "M 48,63 Q 50,66 52,63");
      status.textContent = "Escribiendo...";
    } else {
      aura.classList.add("aura-calm");
      leftEye.setAttribute("d", "M 30,46 Q 35,40 40,46");
      rightEye.setAttribute("d", "M 60,46 Q 65,40 70,46");
      mouth.setAttribute("d", "M 44,62 Q 50,67 56,62");
      status.textContent = "En línea · Un espacio seguro";
    }
  }

  function botAvatarSVG() {
    const eyeL = els.leftEye ? els.leftEye.getAttribute("d") : "M 30,46 Q 35,40 40,46";
    const eyeR = els.rightEye ? els.rightEye.getAttribute("d") : "M 60,46 Q 65,40 70,46";
    const mo = els.mouth ? els.mouth.getAttribute("d") : "M 44,62 Q 50,67 56,62";
    return `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="url(#avatarGradient)" />
      <circle cx="32" cy="55" r="4" fill="#fb7185" opacity="0.4" />
      <circle cx="68" cy="55" r="4" fill="#fb7185" opacity="0.4" />
      <path d="${eyeL}" stroke="#241d2d" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="${eyeR}" stroke="#241d2d" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="${mo}" stroke="#241d2d" stroke-width="3.5" stroke-linecap="round" fill="none" />
    </svg>`;
  }

  /* ---------- Indicador de escritura ---------- */

  function showTypingIndicator() {
    removeTypingIndicator();
    const node = document.createElement("article");
    node.className = "message bot typing";
    node.id = "typingIndicator";
    node.innerHTML = `
      <div class="avatar bot-svg-avatar">${botAvatarSVG()}</div>
      <div class="typing-bubble">
        <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
      </div>`;
    els.messages.appendChild(node);
    scrollToEnd();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) indicator.remove();
  }

  function scrollToEnd() {
    els.messages.scrollTop = els.messages.scrollHeight;
  }

  /* ---------- Utilidades de texto ---------- */

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9ñ\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function listHTML(items) {
    return `<ol>${items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ol>`;
  }

  /* ---------- Mensajes ---------- */

  function addMessage(role, html, options = {}) {
    const { persist = true, tone = "" } = options;
    const node = els.template.content.firstElementChild.cloneNode(true);
    node.classList.add(role);
    const avatar = node.querySelector(".avatar");
    const bubble = node.querySelector(".bubble");

    if (role === "user") {
      avatar.remove();
    } else {
      avatar.classList.add("bot-svg-avatar");
      avatar.innerHTML = botAvatarSVG();
    }

    if (tone) bubble.classList.add(tone);
    bubble.innerHTML = html;
    els.messages.appendChild(node);
    scrollToEnd();

    if (persist) {
      history.push({ role, html, tone, timestamp: new Date().toISOString() });
      saveHistory();
    }
  }

  // Envía burbujas del bot una a una, con indicador de escritura entre cada una.
  function botSay(parts, done) {
    const queue = parts.filter(Boolean);
    busy = true;

    function next() {
      if (!queue.length) {
        busy = false;
        updateAvatar(Number(els.heatRange.value));
        if (done) done();
        return;
      }
      updateAvatar(Number(els.heatRange.value), true);
      showTypingIndicator();
      const part = queue.shift();
      const delay = Math.min(1700, 450 + (part.text || "").length * 9);
      window.setTimeout(() => {
        removeTypingIndicator();
        addMessage("bot", part.html || `<p>${escapeHTML(part.text)}</p>`, { tone: part.tone || "" });
        next();
      }, delay);
    }
    next();
  }

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (err) {
      return [];
    }
  }

  function saveHistory() {
    if (privateMode) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-120)));
  }

  function loadRepairLog() {
    try {
      return JSON.parse(localStorage.getItem("pausaDeDos.repairLog.v1") || "[]");
    } catch (err) {
      return [];
    }
  }

  function saveRepairLog() {
    if (privateMode) return;
    localStorage.setItem("pausaDeDos.repairLog.v1", JSON.stringify(repairLog.slice(-80)));
  }


  function loadConversationContext() {
    try {
      return JSON.parse(localStorage.getItem("pausaDeDos.context.v1") || "{}");
    } catch (err) {
      return {};
    }
  }

  function saveConversationContext() {
    if (privateMode) return;
    localStorage.setItem("pausaDeDos.context.v1", JSON.stringify(conversationContext));
  }

  function rememberRepair(entry) {
    if (privateMode) return;
    repairLog.push({ ...entry, createdAt: new Date().toISOString(), heat: els.heatRange.value });
    saveRepairLog();
  }

  function restoreOrStart() {
    if (history.length) {
      history.forEach(item => addMessage(item.role, item.html, { persist: false, tone: item.tone }));
      maybeFollowUp();
      renderSuggestions();
      return;
    }
    botSay(KB.opening.map(text => ({ text })), () => renderSuggestions(KB.openingChips));
  }

  // Al volver, retoma el último acuerdo si pasó más de medio día desde la última visita.
  function maybeFollowUp() {
    if (privateMode) return;
    const last = repairLog[repairLog.length - 1];
    const lastSeen = Number(localStorage.getItem("pausaDeDos.lastSeen") || 0);
    const now = Date.now();
    localStorage.setItem("pausaDeDos.lastSeen", String(now));

    if (!last || !lastSeen || (now - lastSeen) < 12 * 60 * 60 * 1000) return;

    const who = conversationContext.userName ? `${conversationContext.userName}, ` : "";
    const what = last.agreement || last.summary || "lo que estaban trabajando";
    window.setTimeout(() => {
      botSay([
        { text: `Hola de nuevo 👋 ${who}la última vez quedamos en algo:` },
        { html: `<div class="response-card"><strong>Tu último acuerdo</strong><p>“${escapeHTML(clampText(what, 220))}”</p></div>` },
        { text: "¿Cómo les fue con eso? Podemos ajustarlo, celebrarlo o trabajar en algo nuevo." }
      ], () => renderSuggestions([
        { label: "✅ Nos fue bien", prompt: "Nos fue bien con el acuerdo, quiero fortalecer la relación." },
        { label: "⚠️ No funcionó", prompt: "El acuerdo no funcionó, necesitamos ajustarlo." },
        { label: "🆕 Algo nuevo", prompt: "Quiero hablar de algo nuevo." }
      ]));
    }, 700);
  }

  /* ---------- Chips y modos ---------- */

  function renderModes() {
    const modes = [...KB.modes, ...[
      { emoji: "🔄", title: "Mapear nuestro ciclo", desc: "Entender el baile que se repite", prompt: "Quiero mapear nuestro ciclo: qué lo dispara, qué hago yo y qué pasa después." },
      { emoji: "🎬", title: "Verlo desde afuera", desc: "Mirar el problema sin bandos", prompt: "Quiero mirar el problema desde afuera." },
      { emoji: "💛", title: "Sentirme entendido/a", desc: "Escuchar antes de resolver", prompt: "Necesito sentirme entendido/a antes de hablar de soluciones." },
      { emoji: "🌧️", title: "Nosotros contra el estrés", desc: "Separar estrés externo y culpa", prompt: "Queremos mirar el estrés externo como equipo." }
    ]];
    els.modeGrid.innerHTML = modes.map(mode => `
      <button class="mode-button" type="button" data-prompt="${escapeHTML(mode.prompt)}">
        <span class="mode-emoji">${mode.emoji}</span>
        <span><span class="mode-title">${escapeHTML(mode.title)}</span><span class="mode-desc">${escapeHTML(mode.desc)}</span></span>
      </button>
    `).join("");
  }

  function chipHTML(chip) {
    if (typeof chip === "string") {
      return `<button class="chip" type="button" data-prompt="${escapeHTML(chip)}">${escapeHTML(chip)}</button>`;
    }
    return `<button class="chip ${chip.kind || ""}" type="button" data-action="${chip.action || ""}" data-prompt="${escapeHTML(chip.prompt || "")}">${escapeHTML(chip.label)}</button>`;
  }

  function renderSuggestions(chips = KB.suggestions) {
    els.suggestionRow.innerHTML = chips.slice(0, 7).map(chipHTML).join("");
  }

  function fieldCard(title, fields) {
    return `<div class="response-card flow-card"><strong>${escapeHTML(title)}</strong><dl>${fields.map(([key, value]) => `<dt>${escapeHTML(key)}</dt><dd>${escapeHTML(value || "Pendiente")}</dd>`).join("")}</dl></div>`;
  }

  function startFlow(type) {
    const flow = KB.flows[type];
    if (!flow) return false;
    activeFlow = { type, step: 0, answers: {} };
    lastIntent = { id: type, title: flow.title, steps: flow.steps || [], phrase: flow.phrase || "" };
    botSay([
      { html: `<strong>${escapeHTML(flow.title)}</strong><p>${escapeHTML(flow.intro)}</p>`, text: flow.title },
      { text: flow.questions[0].ask }
    ], () => renderSuggestions([{ label: "Cancelar flujo", action: "cancelFlow" }]));
    return true;
  }

  function buildFlowResult(flowState) {
    const flow = KB.flows[flowState.type];
    const a = flowState.answers;

    if (flowState.type === "twoVoices") {
      rememberRepair({ type: "Dos voces", summary: a.personaA || "", agreement: a.acuerdo || "" });
      return [
        { html: fieldCard("Mapa de dos voces", [["Persona A", a.personaA], ["Resumen de B sobre A", a.resumenB], ["Persona B", a.personaB], ["Resumen de A sobre B", a.resumenA], ["Acuerdo final", a.acuerdo]]) },
        { text: "Clave de oro, porque parece que toca recordárselo a la especie: nadie responde hasta haber resumido al otro de forma que el otro diga 'sí, eso era'." }
      ];
    }

    if (flowState.type === "repairMessage") {
      const raw = a.fraseDura || "eso que dijiste/hiciste";
      const need = a.necesidad || "cuidado y claridad";
      const action = a.accion || "hablarlo de otra forma";
      const soft = `Me dolió ${raw}. Me gustaría que podamos hablarlo con más cuidado, porque para mí hay una necesidad de ${need}. ¿Podemos intentar ${action}?`;
      const clear = `Cuando pasó o dijiste: "${raw}", yo me sentí afectado/a. Necesito ${need}. Para reparar, te pido concretamente: ${action}.`;
      const firm = `Quiero hablar de esto, pero no de cualquier manera. ${raw} me hizo daño. Puedo escuchar tu punto, y también necesito ${need}. Si vuelve a pasar, voy a pedir pausa y retomamos cuando haya respeto.`;
      rememberRepair({ type: "Mensaje reparador", summary: raw, agreement: action });
      return [
        { html: `<div class="response-card phrase"><strong>Versión suave</strong><p>“${escapeHTML(soft)}”</p><button class="copy-button" type="button" data-copy="${escapeHTML(soft)}">📋 Copiar</button></div>` },
        { html: `<div class="response-card phrase"><strong>Versión clara</strong><p>“${escapeHTML(clear)}”</p><button class="copy-button" type="button" data-copy="${escapeHTML(clear)}">📋 Copiar</button></div>` },
        { html: `<div class="response-card phrase"><strong>Versión firme</strong><p>“${escapeHTML(firm)}”</p><button class="copy-button" type="button" data-copy="${escapeHTML(firm)}">📋 Copiar</button></div>` }
      ];
    }

    if (flowState.type === "concreteAgreement") {
      const agreement = `Cuando ocurra ${a.situacion || "esta situación"}, ${a.responsable || "la persona responsable"} hará ${a.conducta || "la acción acordada"} ${a.momento || "en el momento acordado"}. Si no puede, avisará ${a.alternativa || "tan pronto como sea posible"}. Revisamos este acuerdo ${a.revision || "en una fecha acordada"}. Si no funciona, lo ajustamos sin culpar.`;
      rememberRepair({ type: "Acuerdo concreto", summary: a.situacion || "", agreement });
      return [
        { html: fieldCard("Acuerdo concreto", [["Situación", a.situacion], ["Necesidad A", a.necesidadA], ["Necesidad B", a.necesidadB], ["Conducta esperada", a.conducta], ["Responsable", a.responsable], ["Momento", a.momento], ["Si no se puede", a.alternativa], ["Revisión", a.revision]]) },
        { html: `<div class="response-card phrase"><strong>Texto listo</strong><p>“${escapeHTML(agreement)}”</p><button class="copy-button" type="button" data-copy="${escapeHTML(agreement)}">📋 Copiar</button></div>` }
      ];
    }
    return [{ text: "Flujo terminado." }];
  }

  function continueFlow(text) {
    if (!activeFlow) return false;
    const flow = KB.flows[activeFlow.type];
    const current = flow.questions[activeFlow.step];
    activeFlow.answers[current.key] = text;
    activeFlow.step += 1;

    if (activeFlow.step < flow.questions.length) {
      const nextQuestion = flow.questions[activeFlow.step];
      botSay([
        { text: flowAcknowledgement(text) },
        { text: nextQuestion.ask }
      ], () => renderSuggestions([{ label: "Cancelar flujo", action: "cancelFlow" }]));
      return true;
    }

    const finished = activeFlow;
    activeFlow = null;
    botSay(buildFlowResult(finished), () => renderSuggestions([
      { label: "🧾 Exportar bitácora", action: "exportTxt" },
      { label: "🤝 Otro acuerdo", prompt: "Ayúdanos a convertir este problema en un acuerdo concreto." },
      { label: "🪡 Mensaje reparador", prompt: "Quiero transformar una frase dura en un mensaje reparador." }
    ]));
    return true;
  }

  /* ---------- Capa conversacional (small talk) ---------- */

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function timeGreeting(simple = false) {
    const h = new Date().getHours();
    if (simple) return h < 12 ? "Buen día." : h < 19 ? "Buena tarde." : "Buena noche.";
    return h < 12 ? "Buenos días ☀️" : h < 19 ? "Buenas tardes 🌤️" : "Buenas noches 🌙";
  }

  function farewellByTime() {
    const h = new Date().getHours();
    return h >= 19 || h < 5 ? "Que descanses 🌙" : "Que te vaya bonito.";
  }

  function fillTokens(text) {
    return text
      .replace(/\{saludo_simple\}/g, timeGreeting(true))
      .replace(/\{saludo\}/g, timeGreeting(false))
      .replace(/\{despedida\}/g, farewellByTime());
  }

  // Detecta charla conversacional. Devuelve la categoría o null.
  function detectSmalltalk(text) {
    const clean = normalize(text);
    if (!clean) return null;
    const wordCount = clean.split(" ").length;

    let best = null;
    let bestScore = 0;
    for (const cat of (KB.smalltalk || [])) {
      // Categorías "shortOnly" (sí/no/ok) solo si el mensaje es muy corto.
      if (cat.shortOnly && wordCount > 2) continue;
      for (const kw of cat.keywords) {
        const key = normalize(kw);
        if (!key) continue;
        // Coincidencia como palabra/frase completa, no como subcadena suelta.
        const re = new RegExp(`(^|\\s)${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|\\s)`);
        if (re.test(clean)) {
          // Frases más largas pesan más (más específicas).
          const score = key.length + (key.includes(" ") ? 5 : 0);
          if (score > bestScore) { bestScore = score; best = cat; }
        }
      }
    }

    // Para frases largas, exigimos que el small talk no sea trivial:
    // un "hola, acabamos de pelear" debe ir al motor de intenciones.
    if (best && wordCount > 6 && best.id !== "botFrustration" && best.id !== "ventOnly" && best.id !== "smallNeg") {
      // Si además hay señales de un tema real, dejamos pasar al motor.
      const hasTopic = KB.intents.some(i => i.keywords.some(k => clean.includes(normalize(k))));
      if (hasTopic) return null;
    }
    return best;
  }

  function handleSmalltalk(cat) {
    lastIntent = null;
    let reply = pick(cat.replies).map(line => ({ text: fillTokens(line) }));
    // Personaliza el saludo si ya conocemos el nombre.
    if (cat.id === "greeting" && conversationContext.userName && reply[0]) {
      reply[0].text = reply[0].text.replace(/Soy Pau[^.]*\./, `Soy Pau. Qué bueno verte de nuevo, ${conversationContext.userName} 💛`);
    }
    const chips = (cat.chips && cat.chips.length) ? cat.chips : KB.suggestions;
    botSay(reply, () => renderSuggestions(chips));
  }

  /* ---------- Memoria de nombres ---------- */

  function cleanName(raw) {
    if (!raw) return "";
    const word = raw.trim().split(/\s+/)[0];
    if (word.length < 2 || word.length > 18) return "";
    // Evita falsos positivos comunes ("soy feliz", "soy tonto", etc.).
    const stop = ["feliz", "triste", "tonto", "tonta", "bobo", "boba", "un", "una", "el", "la", "muy", "tan", "mas", "menos", "yo", "asi", "asi"];
    if (stop.includes(normalize(word))) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  function validatedName(raw) {
    const value = String(raw || "").trim();
    if (!value) return "";
    return Engine.extractPresentedName(`Soy ${value}`);
  }

  function openProfile(options = {}) {
    onboardingPending = Boolean(options.onboarding);
    els.userNameInput.value = conversationContext.userName || "";
    els.partnerNameInput.value = conversationContext.partnerName || "";
    els.profileIntro.textContent = onboardingPending
      ? "Antes de empezar, ¿cómo se llaman? Pau usará los nombres con moderación para acompañar mejor la conversación."
      : "Es opcional. Pau usará los nombres con moderación para que la conversación se sienta más cercana.";
    els.skipProfileBtn.hidden = !onboardingPending;
    els.clearNamesBtn.hidden = onboardingPending;
    els.closeProfileBtn.hidden = onboardingPending;
    els.profilePrivacyText.textContent = privateMode
      ? "Modo privado activo: los nombres se usarán solo durante esta sesión."
      : "Los nombres se guardarán únicamente en este dispositivo.";
    if (els.menuSheet.open) els.menuSheet.close();
    els.profileDialog.showModal();
  }

  function saveProfile(event) {
    event.preventDefault();
    const userName = validatedName(els.userNameInput.value);
    const partnerName = validatedName(els.partnerNameInput.value);
    if (els.userNameInput.value.trim() && !userName) {
      els.userNameInput.setCustomValidity("Escribe solo un nombre corto.");
      els.userNameInput.reportValidity();
      return;
    }
    if (els.partnerNameInput.value.trim() && !partnerName) {
      els.partnerNameInput.setCustomValidity("Escribe solo un nombre corto.");
      els.partnerNameInput.reportValidity();
      return;
    }
    els.userNameInput.setCustomValidity("");
    els.partnerNameInput.setCustomValidity("");
    conversationContext.userName = userName;
    conversationContext.partnerName = partnerName;
    saveConversationContext();
    if (!privateMode) localStorage.setItem(ONBOARDING_KEY, "completed");
    els.profileDialog.close();
    const wasOnboarding = onboardingPending;
    onboardingPending = false;
    const greeting = userName ? `${userName}, listo.` : "Listo.";
    const detail = partnerName
      ? `Tendré presente que tu pareja se llama ${partnerName}, sin meter los nombres a la fuerza en cada respuesta.`
      : "Puedes volver a editar los nombres cuando quieras desde Opciones.";
    if (wasOnboarding && history.length) {
      restoreOrStart();
      botSay([
        { text: userName ? `${userName}, guardé los nombres.` : "Guardé la personalización." },
        { text: partnerName ? `Tendré presente que tu pareja se llama ${partnerName}.` : "Puedes completar el nombre de tu pareja después desde Opciones." }
      ], () => renderSuggestions());
    } else if (wasOnboarding) {
      botSay([
        { text: userName ? `Hola, ${userName} 👋 Soy Pau.` : "Hola 👋 Soy Pau." },
        { text: partnerName ? `Tendré presente que tu pareja se llama ${partnerName}. Cuéntame qué está pasando entre ustedes.` : "Cuéntame qué está pasando y qué necesitas ahora." }
      ], () => renderSuggestions(KB.openingChips));
    } else {
      botSay([{ text: greeting }, { text: detail }], () => renderSuggestions());
    }
  }

  function skipOnboarding() {
    onboardingPending = false;
    els.profileDialog.close();
    restoreOrStart();
  }

  function clearNames() {
    delete conversationContext.userName;
    delete conversationContext.partnerName;
    saveConversationContext();
    els.userNameInput.value = "";
    els.partnerNameInput.value = "";
    els.profileDialog.close();
    botSay([{ text: "Listo, borré ambos nombres. La conversación seguirá sin personalización." }], () => renderSuggestions());
  }

  // Detecta y guarda nombres del usuario y de su pareja. Devuelve un saludo si recién se presentó.
  function detectNames(text) {
    let learnedUser = false;

    const partnerMatch = text.match(/(?:mi pareja|mi novi[oa]|mi espos[oa]|mi marido|mi mujer|el?\s|ella\s)?\s*se llama\s+([A-Za-zÁÉÍÓÚáéíóúñÑ]+)/i);
    if (partnerMatch && /pareja|novi|espos|marido|mujer/i.test(text)) {
      const name = cleanName(partnerMatch[1]);
      if (name) { conversationContext.partnerName = name; saveConversationContext(); }
    }

    const presentedName = Engine.extractPresentedName(text);
    if (presentedName) {
      const name = cleanName(presentedName);
      if (name && name !== conversationContext.userName) {
        conversationContext.userName = name;
        saveConversationContext();
        learnedUser = true;
      }
    }
    return learnedUser;
  }

  /* ---------- Motor de intención ---------- */

  function scoreIntent(intent, clean) {
    return intent.keywords.reduce((score, keyword) => {
      const key = normalize(keyword);
      if (clean.includes(key)) return score + 8 + Math.min(8, key.length / 5);
      const words = key.split(" ").filter(Boolean);
      if (words.length > 1 && words.every(word => clean.includes(word))) return score + 5;
      return score;
    }, 0) + intent.priority / 100;
  }

  function clampText(text, max = 110) {
    const clean = (text || "").replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max - 1).trim() + "…";
  }

  function sentenceLike(text) {
    const first = (text || "").split(/[.!?\n]/).map(x => x.trim()).find(Boolean) || text;
    return clampText(first, 120);
  }

  function includesAny(clean, words) {
    return words.some(word => clean.includes(normalize(word)));
  }

  function inferNeed(clean) {
    const map = [
      { need: "seguridad", words: ["miedo", "amenaza", "agres", "control", "celos", "desconfianza", "mentira"] },
      { need: "validación", words: ["no es para tanto", "exager", "calmate", "cálmate", "no me entiende", "me minimiza", "loca", "loco"] },
      { need: "claridad", words: ["confuso", "no entiendo", "qué quiere", "que quiere", "dudas", "explicar", "aclarar"] },
      { need: "respeto", words: ["insulto", "grito", "burla", "sarcasmo", "humill", "me habló feo", "me hablo feo"] },
      { need: "conexión", words: ["distancia", "frío", "fria", "fría", "frio", "solo", "sola", "no me habla", "se aleja"] },
      { need: "espacio", words: ["me agobia", "asfixia", "espacio", "me satura", "me presiona"] },
      { need: "reparación", words: ["perdón", "perdon", "disculpa", "reparar", "la embarr", "me equivoqué", "me equivoque"] },
      { need: "acuerdo práctico", words: ["tareas", "plata", "dinero", "responsabilidad", "horarios", "familia", "decidir", "acuerdo"] }
    ];
    const hit = map.find(item => includesAny(clean, item.words));
    return hit ? hit.need : "ser escuchado/a sin que esto escale";
  }

  function inferTask(clean, intentId) {
    if (includesAny(clean, ["cómo le digo", "como le digo", "quiero decir", "mensaje", "responder", "whatsapp", "traducir"]) || intentId === "translate") return "armar una respuesta";
    if (includesAny(clean, ["calmar", "pausa", "ansiedad", "respirar", "no quiero pelear"]) || intentId === "pause" || intentId === "calmGuide") return "bajar la intensidad";
    if (includesAny(clean, ["acuerdo", "que no se repita", "reglas", "pacto", "organizar"]) || intentId === "chores" || intentId === "money" || intentId === "decision") return "convertirlo en un acuerdo";
    if (includesAny(clean, ["por qué", "porque", "no entiendo", "qué hay detrás", "que hay detras", "entender"]) || intentId === "needs") return "entender qué hay debajo";
    if (includesAny(clean, ["perdón", "perdon", "disculpa", "reparar", "arreglar"]) || intentId === "repair") return "reparar el daño";
    return "ubicar el problema antes de responder";
  }

  function extractMoment(text, intent, heat) {
    const clean = normalize(text);
    const feeling = detectFeeling(clean);
    const need = inferNeed(clean);
    const task = inferTask(clean, intent.id);
    const topic = sentenceLike(text);
    const absolutes = detectAbsolutes(clean);
    const directAsk = includesAny(clean, ["dame", "hazme", "ayúdame", "ayudame", "cómo", "como", "quiero", "necesito"]);
    return { clean, feeling, need, task, topic, heat: Number(heat), absolutes, directAsk };
  }

  function updateConversationContext(moment, intent) {
    conversationContext.turns = (conversationContext.turns || 0) + 1;
    conversationContext.lastTopic = moment.topic;
    conversationContext.lastNeed = moment.need;
    conversationContext.lastTask = moment.task;
    conversationContext.lastIntentId = intent.id;
    conversationContext.lastHeat = moment.heat;
    saveConversationContext();
  }

  function groundedOpening(moment, intent) {
    const opener = [];
    const userPrefix = conversationContext.userName ? `${conversationContext.userName}, ` : "";
    if (moment.heat >= 5) {
      opener.push({ text: `Esto suena demasiado cargado para resolverlo en caliente. Primero bajemos intensidad; después sí miramos el tema.` });
      return opener;
    }

    if (conversationContext.turns > 1 && conversationContext.lastTopic && conversationContext.lastTopic !== moment.topic) {
      opener.push({ text: `Vengo siguiendo el hilo: antes estábamos en "${conversationContext.lastTopic}" y ahora aparece esto: "${moment.topic}".` });
    } else {
      opener.push({ text: pick([
        `${userPrefix}lo que entiendo de tu caso es esto: "${moment.topic}".`,
        `A ver si te sigo bien: "${moment.topic}".`,
        `Te leo. Lo que capto es: "${moment.topic}".`
      ]) });
    }

    const needText = moment.feeling
      ? pick([
          `Debajo alcanzo a leer ${moment.feeling} y una necesidad de ${moment.need}.`,
          `Por debajo se siente ${moment.feeling}, y una necesidad de ${moment.need}.`
        ])
      : pick([
          `Debajo parece haber una necesidad de ${moment.need}.`,
          `Y creo que el fondo de esto es una necesidad de ${moment.need}.`
        ]);
    opener.push({ text: needText });

    if (moment.absolutes.length) {
      opener.push({ text: `También noto palabras absolutas como ${moment.absolutes.map(w => `"${w}"`).join(", ")}. A veces son verdad emocional, pero suelen prender la defensa del otro lado.` });
    }

    if (intent.id !== "fallback") {
      opener.push({ text: `Entonces no lo trataría como "tema genérico de ${intent.title.toLowerCase()}". Lo trabajaría como: ${moment.task}.` });
    }
    return opener;
  }

  function actionQuestion(moment) {
    const partner = conversationContext.partnerName ? ` a ${conversationContext.partnerName}` : "";
    if (moment.task === "armar una respuesta") return `Pégame la frase cruda o dime exactamente qué quieres decir${partner}, y te la devuelvo en versión cuidadosa, clara y firme.`;
    if (moment.task === "bajar la intensidad") return "Antes de hablar con tu pareja: ¿quieres una pausa guiada de 2 minutos o una frase corta para pedir espacio sin sonar a abandono?";
    if (moment.task === "convertirlo en un acuerdo") return "Para volverlo acuerdo necesito una conducta observable: ¿qué tendría que pasar distinto la próxima vez?";
    if (moment.task === "reparar el daño") return "Para reparar bien: ¿qué parte sí reconoces como tuya y qué impacto tuvo en la otra persona?";
    if (moment.task === "entender qué hay debajo") return "Dime una escena concreta: ¿qué pasó, qué sentiste y qué fue lo que más te dolió de eso?";
    return "Para no adivinar como aplicación mediocre: ¿quieres que primero entendamos qué hay debajo, que armemos una respuesta, o que lo convirtamos en acuerdo?";
  }

  function progressiveIntentBubbles(intent, moment) {
    if (!intent.bubbles?.length) return [];
    const max = moment.directAsk ? 2 : 1;
    return intent.bubbles.slice(0, max).map(b => ({ text: b }));
  }

  function contextChips(intent, moment) {
    const chips = [];
    chips.push({ label: "🎯 Afinar mi caso", prompt: `El detalle importante es: ` });
    if (moment.task !== "armar una respuesta") chips.push({ label: "📝 Armar respuesta", prompt: "Quiero decir esto sin herir: " });
    if (moment.task !== "convertirlo en un acuerdo") chips.push({ label: "🤝 Convertir en acuerdo", prompt: "Ayúdanos a convertir este problema en un acuerdo concreto." });
    if (intent.bubbles?.length > 2) chips.push({ label: "📚 Ver explicación", action: "more" });
    return [...chips, ...intentChips(intent)].slice(0, 7);
  }

  function showMore() {
    if (!lastIntent?.moreBubbles?.length) return;
    botSay(lastIntent.moreBubbles.map(text => ({ text })), () => renderSuggestions(intentChips(lastIntent)));
  }

  function flowAcknowledgement(text) {
    const clean = normalize(text);
    if (includesAny(clean, ["no sé", "no se", "ni idea", "no estoy seguro", "no estoy segura"])) {
      return "Sirve decir “no sé”. No es elegante, pero al menos es honesto. Vamos con una versión aproximada.";
    }
    const analysis = Engine.analyzeUserMessage(text, conversationContext);
    if (analysis.emotions.explicit[0]) return `Tiene sentido que aparezca ${analysis.emotions.explicit[0]}. Lo tomo como dato importante, no como exageración.`;
    if (text.length > 80) return "Gracias, eso ya da más contexto. Voy guardando lo importante.";
    return "Te sigo.";
  }

  /* ---------- Respuesta ---------- */

  function startFlowFromText(text) {
    const clean = normalize(text);
    if (clean.includes("dos voces") || clean.includes("cada uno dice")) return startFlow("twoVoices");
    if (clean.includes("frase dura") || clean.includes("mensaje reparador") || clean.includes("traducir") || clean.includes("sin herir")) return startFlow("repairMessage");
    if (clean.includes("acuerdo concreto") || clean.includes("crear acuerdo") || clean.includes("convertir este problema en un acuerdo")) return startFlow("concreteAgreement");
    return false;
  }

  function intentChips(intent) {
    const chips = [];
    if (intent.steps?.length) chips.push({ label: "👣 Ver pasos", action: "steps" });
    if (intent.phrase) chips.push({ label: "✍️ Frase lista", action: "phrase" });
    (intent.actions || []).forEach(action => chips.push({ label: action.label, prompt: action.prompt }));
    return chips.slice(0, 6);
  }

  function respond(text) {
    const previousContext = { ...conversationContext, activation: { selfReported: Number(els.heatRange.value) } };
    const analysis = Engine.analyzeUserMessage(text, previousContext);
    if (analysis.risk.level !== "none") return handleRisk(analysis.risk);
    if (startFlowFromText(text)) return;

    {
      const learnedUser = detectNames(text);
      const small = detectSmalltalk(text);

      // Si solo se presentó ("me llamo Ana"), responde con calidez y sigue.
      if (learnedUser && (!small || small.id === "greeting") && normalize(text).split(" ").length <= 6) {
        lastIntent = null;
        botSay([
          { text: `¡Mucho gusto, ${conversationContext.userName}! 💛 Me alegra tenerte por aquí.` },
          { text: "¿Qué te trae hoy? Cuéntame qué pasó o qué te gustaría lograr." }
        ], () => renderSuggestions(["Acabamos de pelear 😮‍💨", "Quiero responder sin herir", "Solo quiero desahogarme"]));
        return;
      }

      if (small) { handleSmalltalk(small); return; }
    }

    const topic = analysis.topic === "unknown" ? "esto" : analysis.topic.replaceAll("_", " ");
    const explicit = analysis.emotions.explicit[0];
    const clean = analysis.normalizedText;
    let reflection = explicit ? `Suena a que esto te pegó fuerte; aparece ${explicit}.` : "Te leo. No quiero completar la historia por ti.";
    if (/acabamos de pelear|acabamos de discutir/.test(clean)) reflection = "Acaban de pelear. No voy a asumir el motivo ni poner culpas, pero sí entiendo que están en un momento sensible.";
    if (/(ella|el|él) grito|gritos/.test(clean)) reflection = "Hubo gritos. Eso suele hacer mucho más difícil escucharse; antes de seguir, quiero ubicar qué ocurrió y cómo te impactó.";
    if (/me dejo en visto|no me responde/.test(clean)) reflection = "La falta de respuesta te está dejando con algo abierto. Puede doler por el silencio mismo o por lo que termina significando para ti.";
    if (/llego tarde|llegó tarde/.test(clean)) reflection = "La tardanza está sobre la mesa. Antes de concluir qué significa, quiero distinguir si dolió el retraso, la falta de aviso o sentir que tu tiempo no contó.";
    let question = "¿Qué pasó en una escena concreta, justo antes de que esto se sintiera así?";
    if (analysis.recommendedIntervention === "LISTEN") question = "¿Qué fue lo más pesado de esta escena?";
    if (analysis.recommendedIntervention === "HIGH_ACTIVATION") question = "¿Prefieres pedir una pausa con hora de regreso o bajar primero un poco la activación?";
    if (analysis.recommendedIntervention === "DYADIC_COPING") question = "¿Esto nació entre ustedes o hay algo de afuera dejándoles menos paciencia?";
    if (analysis.recommendedIntervention === "MAP_CYCLE") question = "Cuando tú haces eso para protegerte, ¿qué suele hacer la otra persona después?";
    if (analysis.topic === "conflict" && /grito|gritos/.test(clean)) question = "¿Qué pasó justo antes del grito y qué hiciste tú después?";
    if (analysis.recommendedIntervention === "REPAIR") question = "¿Qué impacto concreto reconoces y qué harías diferente, sin justificarlo primero?";
    if (analysis.recommendedIntervention === "AGREEMENT") question = "¿Cuál sería una acción observable, voluntaria y realista para la próxima vez?";
    const parts = [{ text: reflection }, { text: analysis.meaning.interpretation ? "Podemos distinguir el hecho de lo que significó para ti, sin decir que esa interpretación sea absurda." : `Antes de buscar solución, ubiquemos el patrón alrededor de ${topic}.` }, { text: question }];
    conversationContext.confirmed = conversationContext.confirmed || {};
    if (analysis.topic !== "unknown") conversationContext.confirmed.topic = analysis.topic;
    if (analysis.meaning.interpretation) conversationContext.confirmed.interpretation = analysis.meaning.interpretation;
    conversationContext.hypotheses = { possiblePrimary: analysis.emotions.possiblePrimary, needs: analysis.needs.hypotheses };
    conversationContext.activation = analysis.activation;
    conversationContext.lastIntent = analysis.intent;
    saveConversationContext();
    botSay(parts, () => renderSuggestions(analysis.userGoal === "vent" ? ["Quiero contar qué pasó", "Ahora sí quiero una idea"] : KB.suggestions));
  }

  function handleRisk(risk) {
    activeFlow = null;
    updateAvatar(5);
    const crisis = risk.level === "crisis";
    botSay([
      { text: crisis ? "Primero tu seguridad. La conversación puede esperar." : "Esto puede ser una señal de control o violencia. Conviene tomarlo en serio.", tone: "danger" },
      { text: crisis ? "Si hay peligro inmediato, aléjate solo si hacerlo no aumenta el riesgo y llama al 123. Para apoyo emocional en Bogotá: Línea 106 o WhatsApp 300 754 8933." : "No tienes que resolverlo conversando a solas. Busca apoyo de alguien de confianza si hacerlo es seguro. No recomiendo confrontar ni negociar ahora.", tone: "danger" },
      { text: "Si este dispositivo puede estar vigilado, usa modo privado o borra datos solo si eso no aumenta el riesgo. Si guardar información te sirve para una ruta de apoyo, hazlo desde un lugar o dispositivo seguro.", tone: "danger" }
    ], () => renderSuggestions([
      { label: "🆘 Ver rutas de ayuda", action: "safety" },
      { label: "🔒 Activar modo privado", action: "privateMode" },
      { label: "🧹 Borrar todos mis datos", action: "clearAll" }
    ]));
    return true;
  }

  function showSteps() {
    if (!lastIntent?.steps?.length) return;
    botSay([{
      html: `<div class="response-card"><strong>Paso a paso</strong>${listHTML(lastIntent.steps)}</div>`,
      text: lastIntent.steps.join(" ")
    }, { text: "Si quieres, cuéntame cómo lo aplicarías a tu caso y lo afinamos juntos 🙂" }],
    () => renderSuggestions(intentChips(lastIntent).filter(c => c.action !== "steps")));
  }

  function showPhrase() {
    if (!lastIntent?.phrase) return;
    botSay([
      { text: "Aquí tienes una frase base. Cópiala y ajústala con tus palabras, los espacios ___ son tuyos:" },
      { html: `<div class="response-card phrase"><p>“${escapeHTML(lastIntent.phrase)}”</p><button class="copy-button" type="button" data-copy="${escapeHTML(lastIntent.phrase)}">📋 Copiar</button></div>`, text: lastIntent.phrase }
    ], () => renderSuggestions(intentChips(lastIntent).filter(c => c.action !== "phrase")));
  }

  /* ---------- Entrada del usuario ---------- */

  function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    const text = els.input.value.trim();
    if (!text) return;

    addMessage("user", `<p>${escapeHTML(text)}</p>`);
    els.input.value = "";
    autosizeTextarea();
    els.suggestionRow.innerHTML = "";

    const risk = Engine.detectRisk(text);
    if (risk.level !== "none") return handleRisk(risk);
    if (continueFlow(text)) return;
    respond(text);
  }

  function sendPrompt(prompt) {
    if (busy) return;
    addMessage("user", `<p>${escapeHTML(prompt)}</p>`);
    els.suggestionRow.innerHTML = "";
    const risk = Engine.detectRisk(prompt);
    if (risk.level !== "none") return handleRisk(risk);
    if (activeFlow && continueFlow(prompt)) return;
    respond(prompt);
  }

  function autosizeTextarea() {
    els.input.style.height = "auto";
    els.input.style.height = Math.min(140, els.input.scrollHeight) + "px";
  }

  /* ---------- Exportar / limpiar ---------- */

  function exportTextLog() {
    const lines = [
      "PAUSA DE DOS - BITÁCORA DE REPARACIÓN",
      `Exportado: ${new Date().toLocaleString()}`,
      "",
      ...repairLog.flatMap((entry, index) => [
        `#${index + 1} · ${entry.type || "Registro"}`,
        `Fecha: ${entry.createdAt || ""}`,
        `Resumen: ${entry.summary || ""}`,
        `Acuerdo / acción: ${entry.agreement || ""}`,
        `Intensidad: ${entry.heat || ""}`,
        ""
      ])
    ];
    const content = repairLog.length ? lines.join("\n") : "PAUSA DE DOS - BITÁCORA DE REPARACIÓN\nAún no hay acuerdos o reparaciones guardadas.";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bitacora-pausa-de-dos-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportHistory() {
    const payload = {
      app: KB.appName,
      exportedAt: new Date().toISOString(),
      heat: els.heatRange.value,
      history,
      repairLog
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pausa-de-dos-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function clearHistory() {
    const ok = confirm("¿Borrar toda la conversación, contexto, bitácora y preferencias guardadas en este dispositivo?");
    if (!ok) return;
    history = [];
    lastIntent = null;
    APP_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
    conversationContext = {};
    repairLog = [];
    activeFlow = null;
    privateMode = false;
    updatePrivateUI();
    els.messages.innerHTML = "";
    els.menuSheet.close();
    restoreOrStart();
    updateAvatar(Number(els.heatRange.value));
  }

  function setPrivateMode(enabled) {
    privateMode = Boolean(enabled);
    if (privateMode) {
      history = [];
      repairLog = [];
      conversationContext = {};
      APP_STORAGE_KEYS.filter(key => key !== PRIVATE_KEY).forEach(key => localStorage.removeItem(key));
      localStorage.setItem(PRIVATE_KEY, "true");
    } else {
      localStorage.removeItem(PRIVATE_KEY);
    }
    updatePrivateUI();
  }

  function updatePrivateUI() {
    document.body.classList.toggle("private-mode", privateMode);
    els.privateBadge.hidden = !privateMode;
    els.privateModeBtn.setAttribute("aria-checked", String(privateMode));
    els.privateModeBtn.textContent = privateMode ? "🔒 Desactivar modo privado" : "🔓 Activar modo privado";
  }

  /* ---------- Eventos ---------- */

  function closeSheets() {
    [els.modesSheet, els.menuSheet].forEach(sheet => { if (sheet.open) sheet.close(); });
  }

  function bindEvents() {
    els.form.addEventListener("submit", handleSubmit);
    els.input.addEventListener("input", autosizeTextarea);
    els.input.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        els.form.requestSubmit();
      }
    });

    document.body.addEventListener("click", event => {
      const copyBtn = event.target.closest("[data-copy]");
      if (copyBtn) {
        navigator.clipboard?.writeText(copyBtn.getAttribute("data-copy"));
        copyBtn.textContent = "✅ Copiada";
        window.setTimeout(() => { copyBtn.textContent = "📋 Copiar"; }, 1600);
        return;
      }

      const button = event.target.closest("[data-action], [data-prompt]");
      if (!button) return;

      const action = button.getAttribute("data-action");
      if (action === "steps") { showSteps(); return; }
      if (action === "phrase") { showPhrase(); return; }
      if (action === "more") { showMore(); return; }
      if (action === "safety") { els.safetyDialog.showModal(); return; }
      if (action === "privateMode") { setPrivateMode(true); return; }
      if (action === "clearAll") { clearHistory(); return; }
      if (action === "cancelFlow") { activeFlow = null; botSay([{ text: "Listo, cancelé el flujo. Volvemos al modo conversación." }], () => renderSuggestions()); return; }
      if (action === "exportTxt") { exportTextLog(); return; }

      const prompt = button.getAttribute("data-prompt");
      if (!prompt) return;
      if (prompt === "Ver rutas de ayuda") {
        els.safetyDialog.showModal();
        return;
      }
      closeSheets();
      sendPrompt(prompt);
    });

    els.heatBtn.addEventListener("click", () => {
      els.heatPanel.hidden = !els.heatPanel.hidden;
    });

    els.heatRange.addEventListener("input", () => {
      const heat = Number(els.heatRange.value);
      els.heatLabel.textContent = KB.heatLabels[heat];
      updateAvatar(heat);
    });

    els.heatRange.addEventListener("change", () => {
      const heat = Number(els.heatRange.value);
      if (heat >= 5 && !busy) {
        els.heatPanel.hidden = true;
        botSay([
          { text: "Te veo en 5 🔥 Antes de seguir la conversación con tu pareja, bajemos eso un poco." },
          { text: "¿Te guío con una respiración corta? Son 2 minutos." }
        ], () => renderSuggestions([
          { label: "🧘 Sí, guíame", prompt: "Guíame paso a paso para calmarme ahora." },
          { label: "🫧 Frase para pedir pausa", prompt: "Dame una frase corta para pedir pausa sin que suene a abandono." }
        ]));
      }
    });

    els.modesBtn.addEventListener("click", () => els.modesSheet.showModal());
    els.menuBtn.addEventListener("click", () => els.menuSheet.showModal());
    els.profileBtn.addEventListener("click", openProfile);
    els.closeProfileBtn.addEventListener("click", () => els.profileDialog.close());
    els.profileForm.addEventListener("submit", saveProfile);
    els.clearNamesBtn.addEventListener("click", clearNames);
    els.skipProfileBtn.addEventListener("click", skipOnboarding);
    [els.userNameInput, els.partnerNameInput].forEach(input => {
      input.addEventListener("input", () => input.setCustomValidity(""));
    });

    // Cerrar sheets/modal al tocar el fondo
    [els.modesSheet, els.menuSheet, els.safetyDialog, els.profileDialog].forEach(dialog => {
      dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
      });
    });

    els.openSafetyBtn.addEventListener("click", () => els.safetyDialog.showModal());
    els.closeSafetyBtn.addEventListener("click", () => els.safetyDialog.close());
    els.exportBtn.addEventListener("click", exportHistory);
    if (els.exportTxtBtn) els.exportTxtBtn.addEventListener("click", exportTextLog);
    els.clearBtn.addEventListener("click", clearHistory);
    els.privateModeBtn.addEventListener("click", () => setPrivateMode(!privateMode));
    els.privacyNoteBtn.addEventListener("click", () => { setPrivateMode(true); els.privacyNote.hidden = true; });
    els.dismissPrivacyNote.addEventListener("click", () => {
      els.privacyNote.hidden = true;
      if (!privateMode) localStorage.setItem("pausaDeDos.privacyNotice.v1", "dismissed");
    });
  }

  function init() {
    renderModes();
    updatePrivateUI();
    els.privacyNote.hidden = privateMode || localStorage.getItem("pausaDeDos.privacyNotice.v1") === "dismissed";
    updateAvatar(Number(els.heatRange.value));
    bindEvents();
    els.heatLabel.textContent = KB.heatLabels[els.heatRange.value];
    const namesMissing = !conversationContext.userName || !conversationContext.partnerName;
    if (namesMissing) openProfile({ onboarding: true });
    else restoreOrStart();
  }

  init();
})();
