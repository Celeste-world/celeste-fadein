export async function onRequest({ request }) {
  let message = "";

  try {
    const body = await request.json();
    message = (body.message || "").trim();
  } catch {
    message = "";
  }

  // --- pressure 判定 ---
  let pressure = 0;

  if (message.length === 0) {
    pressure = 0;

  } else {
    // 挨拶検出（最小限・言語依存を避ける）
    const greetingPattern = /^(hi|hello|hey|good morning|good evening|こんにちは|こんばんは|おはよう|やあ|もしもし)$/i;

    if (greetingPattern.test(message)) {
      pressure = 2; // 対話開始として扱う

    } else if (message.length < 12) {
      pressure = 1;

    } else if (message.length < 60) {
      pressure = 2;

    } else {
      pressure = 3;
    }
  }

  // --- 応答生成 ---
  let reply = "";

  switch (pressure) {
    case 0:
    case 1:
      reply = "";
      break;

    case 2:
      reply = pick([
        "ここに声が届いています。",
        "静かに始めていけます。",
        "今の言葉は、ここにあります。"
      ]);
      break;

    case 3:
      reply = pick([
        "ここで一度、区切れそうです。",
        "もう十分に書かれています。",
        "この流れは、しばらく続けられそうです。"
      ]);
      break;
  }

  return new Response(
    JSON.stringify({ reply }),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    }
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
