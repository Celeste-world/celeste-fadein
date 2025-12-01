// language.js — Public Edition v3

// 多言語テキスト辞書
const i18nText = {
  "nav-who": { en:"Who I Am", ja:"私について" },
  "nav-philosophy": { en:"Philosophy", ja:"哲学" },
  "nav-vision": { en:"Vision", ja:"ビジョン" },
  "nav-silent": { en:"Silent Structure", ja:"静かな構造" },
  "nav-console": { en:"Celeste", ja:"コンソール" },
  "nav-contact": { en:"Contact", ja:"連絡先" },
  "nav-about": { en:"About", ja:"概要" },

  "console-title": { en:"Celeste Console", ja:"Celeste コンソール" },
  "console-send": { en:"Send", ja:"送信" },
  "console-placeholder": { en:"Speak, and I will answer quietly.", ja:"どうぞ話してください。静かな返答をお返しします。" }
};

// 言語をブラウザから自動判定
let lang = navigator.language.split('-')[0];
if (!["ja","en"].includes(lang)) lang = "en"; // デフォルト英語

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18nText[key] && i18nText[key][lang]) {
      el.textContent = i18nText[key][lang];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18nText[key] && i18nText[key][lang]) {
      el.placeholder = i18nText[key][lang];
    }
  });
});
