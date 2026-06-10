(function () {
  const KB = window.COUPLES_KB;
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
    clearBtn: document.getElementById("clearBtn"),
    leftEye: document.getElementById("leftEye"),
    rightEye: document.getElementById("rightEye"),
    mouth: document.getElementById("mouth"),
    avatarAura: document.getElementById("avatarAura"),
    avatarStatus: document.getElementById("avatarStatus")
  };

  const STORAGE_KEY = "pausaDeDos.history.v2";
  let history = loadHistory();
  let lastIntent = null; // para "ver pasos" / "frase lista"
  let busy = false;

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-120)));
  }

  function restoreOrStart() {
    if (history.length) {
      history.forEach(item => addMessage(item.role, item.html, { persist: false, tone: item.tone }));
      renderSuggestions();
      return;
    }
    botSay(KB.opening.map(text => ({ text })), () => renderSuggestions(KB.openingChips));
  }

  /* ---------- Chips y modos ---------- */

  function renderModes() {
    els.modeGrid.innerHTML = KB.modes.map(mode => `
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
    els.suggestionRow.innerHTML = chips.slice(0, 6).map(chipHTML).join("");
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

  function hasCrisis(clean) {
    return KB.crisis.keywords.some(keyword => clean.includes(normalize(keyword)));
  }

  function detectAbsolutes(clean) {
    return ["siempre", "nunca", "todo", "nada", "jamas"].filter(word => clean.includes(word));
  }

  function detectFeeling(clean) {
    return KB.feelingWords.find(word => clean.includes(normalize(word))) || "";
  }

  function chooseIntent(text, heat) {
    const clean = normalize(text);
    if (hasCrisis(clean)) return { type: "crisis", data: KB.crisis.response };

    const ranked = KB.intents
      .map(intent => ({ intent, score: scoreIntent(intent, clean) }))
      .sort((a, b) => b.score - a.score);

    let chosen = ranked[0]?.score > 1.5 ? ranked[0].intent : KB.fallback;

    if (Number(heat) >= 5 && chosen.id !== "repair" && chosen.id !== "calmGuide") {
      chosen = KB.intents.find(intent => intent.id === "pause") || chosen;
    }

    return { type: "intent", data: chosen };
  }

  // Pequeña validación empática previa, basada en lo que escribió la persona.
  function makeReflection(text) {
    const clean = normalize(text);
    const feeling = detectFeeling(clean);
    const absolutes = detectAbsolutes(clean);
    const notes = [];
    if (feeling) notes.push(`Leo bastante ${feeling} en lo que escribes, y tiene sentido sentirla.`);
    if (absolutes.length) notes.push(`Ojo con palabras como ${absolutes.map(w => `"${w}"`).join(", ")}: suelen subir la defensa del otro lado y bajar la escucha.`);
    return notes;
  }

  /* ---------- Respuesta ---------- */

  function intentChips(intent) {
    const chips = [];
    if (intent.steps?.length) chips.push({ label: "👣 Ver pasos", action: "steps" });
    if (intent.phrase) chips.push({ label: "✍️ Frase lista", action: "phrase" });
    (intent.actions || []).forEach(action => chips.push({ label: action.label, prompt: action.prompt }));
    return chips.slice(0, 6);
  }

  function respond(text) {
    const heat = Number(els.heatRange.value);
    const result = chooseIntent(text, heat);

    if (result.type === "crisis") {
      const data = result.data;
      lastIntent = data;
      const parts = [
        { html: `<strong>${escapeHTML(data.title)}</strong>`, tone: "danger", text: data.title },
        ...data.bubbles.map(b => ({ text: b, tone: "danger" })),
        { html: `<div class="response-card danger"><strong>Ahora mismo</strong>${listHTML(data.steps)}</div>`, text: data.steps.join(" ") }
      ];
      botSay(parts, () => {
        renderSuggestions([
          { label: "🆘 Ver rutas de ayuda", action: "safety" },
          "Necesito estar a salvo ahora",
          "Quiero escribirle a alguien de confianza"
        ]);
      });
      return;
    }

    const intent = result.data;
    lastIntent = intent;

    const reflection = makeReflection(text)
      .filter(note => intent.id !== "fallback" || note) // siempre válidas
      .map(note => ({ text: note }));

    const parts = [
      ...(intent.id === "fallback" ? [] : reflection.slice(0, 1)),
      ...intent.bubbles.map(b => ({ text: b }))
    ];

    botSay(parts, () => renderSuggestions(intentChips(intent)));
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

    const clean = normalize(text);
    if (hasCrisis(clean)) updateAvatar(5);

    respond(text);
  }

  function sendPrompt(prompt) {
    if (busy) return;
    addMessage("user", `<p>${escapeHTML(prompt)}</p>`);
    els.suggestionRow.innerHTML = "";
    respond(prompt);
  }

  function autosizeTextarea() {
    els.input.style.height = "auto";
    els.input.style.height = Math.min(140, els.input.scrollHeight) + "px";
  }

  /* ---------- Exportar / limpiar ---------- */

  function exportHistory() {
    const payload = {
      app: KB.appName,
      exportedAt: new Date().toISOString(),
      heat: els.heatRange.value,
      history
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
    const ok = confirm("¿Borrar la conversación? Solo está guardada en este navegador.");
    if (!ok) return;
    history = [];
    lastIntent = null;
    localStorage.removeItem(STORAGE_KEY);
    els.messages.innerHTML = "";
    els.menuSheet.close();
    restoreOrStart();
    updateAvatar(Number(els.heatRange.value));
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
      if (action === "safety") { els.safetyDialog.showModal(); return; }

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

    // Cerrar sheets/modal al tocar el fondo
    [els.modesSheet, els.menuSheet, els.safetyDialog].forEach(dialog => {
      dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
      });
    });

    els.openSafetyBtn.addEventListener("click", () => els.safetyDialog.showModal());
    els.closeSafetyBtn.addEventListener("click", () => els.safetyDialog.close());
    els.exportBtn.addEventListener("click", exportHistory);
    els.clearBtn.addEventListener("click", clearHistory);
  }

  function init() {
    renderModes();
    updateAvatar(Number(els.heatRange.value));
    restoreOrStart();
    bindEvents();
    els.heatLabel.textContent = KB.heatLabels[els.heatRange.value];
  }

  init();
})();
