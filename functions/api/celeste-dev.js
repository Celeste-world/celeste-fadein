export async function onRequest({ request }) {
  let message = "";

  try {
    const body = await request.json();
    message = (body.message || "").trim();
  } catch {
    message = "";
  }

  const len = [...message].length; // 全角・絵文字対応

  // --- pressure 判定（最小・非言語依存） ---
  let pressure = 0;
  if (len === 0) {
    pressure = 0;
  } else if (len <= 2) {
    pressure = 1; // 合図・挨拶の種
  } else {
    pressure = 2; // 意図のある入力
  }

  // --- 応答 ---
  let reply = "";

  if (pressure === 1) {
    // 極短入力：単発・軽い返答のみ
    reply = pick([
      "静かな始まりですね。",
      "ここに届いています。",
      "その一言が、ここにあります。"
    ]);
  }

  if (pressure === 2) {
    reply = pick([
      "静かな朝の中にいますね。どんな気配を感じていますか。",
      "今、心に浮かんでいることは何でしょう。",
      "ここに書かれた言葉が、少しずつ形になっています。"
    ]);
  }

  return new Response(
    JSON.stringify({ reply, pressure }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
