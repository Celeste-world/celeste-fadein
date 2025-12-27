export async function onRequest({ request }) {
  let message = "";

  try {
    const body = await request.json();
    message = (body.message || "").trim();
  } catch {
    message = "";
  }

  // --- 圧力判定（言語・意味 非依存） ---
  let pressure = 0;

  if (message.length === 0) {
    pressure = 0;
  } else if (message.length < 12) {
    pressure = 1;   // 単語・挨拶
  } else if (message.length < 60) {
    pressure = 2;   // 短文
  } else {
    pressure = 3;   // 展開された文章
  }

  // --- 応答生成（v5.0A-dev） ---
  let reply = "";

  switch (pressure) {
    case 0:
    case 1:
      // 沈黙は「文字では返さない」
      reply = "";
      break;

    case 2:
      reply = pick([
        "今の言葉は、ここにあります。",
        "少し間を置いても構いません。"
      ]);
      break;

    case 3:
      reply = pick([
        "ここで一度、区切れそうです。",
        "もう十分に書かれています。"
      ]);
      break;
  }

  return new Response(reply, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
