export async function onRequest(context) {
  const request = context.request;

  // POST以外は拒否（console専用）
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await request.json();
  const userText = (body.text || "").trim();

  // --- 言語検出（超軽量・v3.4互換） ---
  const lang = detectLanguage(userText);

  // --- 応答タイプ決定 ---
  const response = generateResponse(userText, lang);

  return new Response(
    JSON.stringify({ reply: response }),
    { headers: { "Content-Type": "application/json" } }
  );
}

/* ===========================
   応答生成（問いゼロ）
=========================== */
function generateResponse(text, lang) {
  const variants = RESPONSE_SET[lang] || RESPONSE_SET["ja"];

  // 入力が短い／挨拶のみ
  if (text.length <= 3) {
    return pick(variants.position);
  }

  // 文として成立している
  if (text.length > 3) {
    // 70% 位置調整 / 30% 終了許可
    return Math.random() < 0.7
      ? pick(variants.structure)
      : pick(variants.close);
  }

  return pick(variants.position);
}

/* ===========================
   言語判定（簡易）
=========================== */
function detectLanguage(text) {
  if (/[ぁ-んァ-ン一-龥]/.test(text)) return "ja";
  if (/[a-zA-Z]/.test(text)) return "en";
  if (/[ก-๙]/.test(text)) return "th";
  if (/[àâçéèêëîïôûùüÿñæœ]/i.test(text)) return "fr";
  return "en";
}

/* ===========================
   応答文言セット（問いゼロ）
=========================== */
const RESPONSE_SET = {
  ja: {
    position: [
      "ここまで、ちゃんと届いています。",
      "今の言葉は、この場所に置かれました。",
      "無理に続けなくても、大丈夫なところです。"
    ],
    structure: [
      "この一文は、始まりとして置けそうです。",
      "今の流れは、ここで一度区切れます。",
      "言葉としては、十分な重さがあります。"
    ],
    close: [
      "今日はここで終えても問題ありません。",
      "このまま閉じてしまっても、大丈夫です。",
      "続きは、また別の時間でも構いません。"
    ]
  },

  en: {
    position: [
      "Your words have arrived here.",
      "This thought can rest here for now.",
      "There’s no need to continue immediately."
    ],
    structure: [
      "This line can stand as a beginning.",
      "What you’ve written feels complete enough.",
      "The flow can pause here."
    ],
    close: [
      "It’s okay to stop here.",
      "You can return to this another time.",
      "Leaving it here is also a choice."
    ]
  },

  fr: {
    position: [
      "Ces mots sont bien arrivés ici.",
      "Ils peuvent rester ici, pour l’instant.",
      "Il n’est pas nécessaire de continuer."
    ],
    structure: [
      "Cette phrase peut servir de point de départ.",
      "Ce que vous avez écrit est suffisant.",
      "Le fil peut s’arrêter ici."
    ],
    close: [
      "Vous pouvez vous arrêter ici.",
      "Ce sera possible d’y revenir plus tard.",
      "Laisser cela ainsi est acceptable."
    ]
  },

  th: {
    position: [
      "ข้อความนี้มาถึงที่นี่แล้ว",
      "คุณสามารถวางมันไว้ตรงนี้ได้",
      "ไม่จำเป็นต้องเขียนต่อในตอนนี้"
    ],
    structure: [
      "ประโยคนี้สามารถเป็นจุดเริ่มต้นได้",
      "สิ่งที่เขียนมามีน้ำหนักพอแล้ว",
      "สามารถหยุดไว้ตรงนี้ได้"
    ],
    close: [
      "หยุดตรงนี้ก็ได้",
      "คุณค่อยกลับมาใหม่ภายหลังก็ได้",
      "ปล่อยให้มันอยู่แบบนี้ก็ไม่ผิด"
    ]
  }
};

/* ===========================
   ユーティリティ
=========================== */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
