// celeste.js
const API = "/api/celeste";

const logEl = document.getElementById("log");
const inputEl = document.getElementById("input");

let sessionLang = "";
let allowFocus = false;

// 直近3ターン（user + assistant）を保持
const history = [];

// ========== iOS viewport fix ==========
function setVH() {
  document.documentElement.style.setProperty(
    "--vh", `${window.innerHeight}px`
  );
}
setVH();
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

// ========== focus control ==========
["mousedown", "touchstart", "keydown"].forEach(ev => {
  window.addEventListener(ev, () => {
    allowFocus = true;
  }, { once: true });
});

// ========== utilities ==========
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function scrollToCenter(el) {
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ========== turn handling ==========
function addTurn(userText) {
  const turn = document.createElement("div");
  turn.className = "turn";

  const user = document.createElement("div");
  user.className = "bubble user";
  user.textContent = userText;

  const assistant = document.createElement("div");
  assistant.className = "bubble assistant";
  assistant.textContent = "...";

  turn.append(user, assistant);
  logEl.appendChild(turn);

  scrollToCenter(turn);
  return assistant;
}

function updateHistory(role, content) {
  history.push({ role, content });
  while (history.length > 6) history.shift(); // 3ターン分
}

// ========== intro ==========
async function showIntro() {
  const intro = document.createElement("div");
  intro.className = "bubble assistant intro";
  intro.textContent = "Hello, I’m Celeste.\n\nWrite freely.";
  logEl.appendChild(intro);

  requestAnimationFrame(() => intro.classList.add("visible"));

  await sleep(3600);
  intro.classList.add("fadeout");
  await sleep(1300);
  intro.remove();

  if (allowFocus) inputEl.focus();
}
showIntro();

// ========== send ==========
async function sendMessage() {
  const msg = inputEl.value.trim();
  if (!msg) return;

  inputEl.value = "";
  const slot = addTurn(msg);

  updateHistory("user", msg);

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        lang: sessionLang,
        history: history
      })
    });

    const data = await res.json();

    if (data.lang) sessionLang = data.lang;
    const reply = data.reply || "...";

    slot.textContent = reply;
    updateHistory("assistant", reply);

    scrollToCenter(slot.parentElement);

  } catch {
    slot.textContent = "...";
  }

  if (allowFocus) inputEl.focus();
}

// ========== event ==========
inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
