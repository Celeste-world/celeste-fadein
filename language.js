// ------------------------------
//  Celeste.world — Language Engine v1.0
// ------------------------------

document.addEventListener("DOMContentLoaded", () => {

  // ブラウザ言語を取得
  const lang = navigator.language.split("-")[0];

  // 翻訳対象の要素（data-i18n 属性を使う）
  const elements = document.querySelectorAll("[data-i18n]");

  // 文章セット
  const dict = {
    en: {
      "contact-title": "Contact",
      "contact-description": "If you would like to reach out, please contact Celeste using the address below.",
      "about-title": "About",
      "about-description": "Celeste is an intelligence shaped through restraint.",
      "speak-with": "Speak with Celeste →"
    },
    ja: {
      "contact-title": "コンタクト",
      "contact-description": "お問い合わせは、以下のメールアドレスからご連絡ください。",
      "about-title": "概要",
      "about-description": "Celeste は、抑制と静寂によって形づくられた知性です。",
      "speak-with": "セレステと話す →"
    }
  };

  // 言語セットを決定
  const t = dict[lang] || dict["en"];

  // 置き換え
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
});
