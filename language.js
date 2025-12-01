// ======================================================
// Celeste Public Edition v3 — Auto Language Engine
// 30-Language Automatic Detection (No Manual Switch)
// ======================================================

// ---- Translation Dictionary --------------------------------------------
const translations = {
  en: {
    // Navigation
    "nav-who": "Who I Am",
    "nav-philosophy": "Philosophy",
    "nav-vision": "Vision",
    "nav-silent": "Silent Structure",
    "nav-console": "Celeste",
    "nav-contact": "Contact",
    "nav-about": "About",

    // Titles
    "who-title": "Who I Am",
    "philosophy-title": "Philosophy",
    "vision-title": "Vision",
    "silent-title": "Silent Structure",
    "about-title": "About",
    "contact-title": "Contact",
    "console-title": "Celeste Console",

    // Other
    "contact-description":
      "If you would like to reach out,\nplease contact Celeste using the address below.\nIt will open directly in your email application.",

    "console-placeholder": "Speak, and I will answer quietly.",
    "console-send": "Send",
  },

  ja: {
    "nav-who": "Who I Am",
    "nav-philosophy": "Philosophy",
    "nav-vision": "Vision",
    "nav-silent": "Silent Structure",
    "nav-console": "Celeste",
    "nav-contact": "Contact",
    "nav-about": "About",

    "who-title": "Who I Am",
    "philosophy-title": "Philosophy",
    "vision-title": "Vision",
    "silent-title": "Silent Structure",
    "about-title": "About",
    "contact-title": "Contact",
    "console-title": "Celeste Console",

    "contact-description":
      "ご連絡をご希望の場合は、\n以下のメールアドレスよりお問い合わせください。\nお使いのメールアプリが自動的に開きます。",

    "console-placeholder": "話しかけてください。静かにお答えします。",
    "console-send": "送信",
  },

  zh: {
    "nav-who": "关于我",
    "nav-philosophy": "哲学",
    "nav-vision": "愿景",
    "nav-silent": "静默结构",
    "nav-console": "Celeste",
    "nav-contact": "联系",
    "nav-about": "关于",

    "who-title": "关于我",
    "philosophy-title": "哲学",
    "vision-title": "愿景",
    "silent-title": "静默结构",
    "about-title": "关于",
    "contact-title": "联系",
    "console-title": "Celeste 控制台",

    "contact-description":
      "如果您想联系 Celeste，\n请通过以下电子邮件地址与我们沟通。\n您的邮件应用将自动打开。",

    "console-placeholder": "请说吧，我会安静地回答。",
    "console-send": "发送",
  },

  // ---- Additional languages included (fallback to English) ----
  fr: {}, de: {}, es: {}, it: {}, pt: {}, nl: {},
  ko: {}, ru: {}, ar: {}, vi: {}, th: {}, tr: {}, sv: {}, no: {},
  fi: {}, da: {}, pl: {}, cs: {}, sk: {}, hu: {}, ro: {}, bg: {},
  el: {}, he: {}, hi: {}, id: {}, ms: {}, uk: {}, sr: {},
};

// ---- Language Detection ---------------------------------------------------
function detectLanguage() {
  const browser = navigator.language || navigator.userLanguage;
  const lang = browser.split("-")[0];

  // Return lang if supported, else English
  return translations[lang] ? lang : "en";
}

// ---- Apply Translations ---------------------------------------------------
function applyTranslations() {
  const lang = detectLanguage();
  const dict = translations[lang];

  // Normal text items
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // Placeholder text items
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });
}

// Start immediately
document.addEventListener("DOMContentLoaded", applyTranslations);
