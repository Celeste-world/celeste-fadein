export async function onRequest({ request }) {
  let message = "";

  try {
    const body = await request.json();
    message = (body.message || "").trim();
  } catch {
    message = "";
  }

  // --- pressure 判定（最小変更） ---
  let pressure = 0;
  const len = message.length;

  if (len === 0) {
    pressure = 0;
  } else if (len <= 2) {
    pressure = 1;
  } else if (len < 60) {
    pressure = 2;
  } else {
    pressure = 3;
  }

  // --- 応答 ---
  let reply = "";

  switch (pressure) {
    case 0:
      reply = "";
      break;

    case 1:
      // 単語はそのまま返す（反射）
      reply = message;
      break;

    case 2:
      reply = pick([
        "ここに、言葉が置かれました。",
        "今の言葉は、確かにここにあります。",
        "少し立ち止まってもいいですね。"
      ]);
      break;

    case 3:
      reply = pick([
        "十分に書かれています。",
        "ここで一度、区切れそうです。"
      ]);
      break;
  }

  return new Response(
    JSON.stringify({ reply }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
