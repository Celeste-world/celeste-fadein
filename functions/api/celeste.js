export async function onRequest({ request }) {
  let message = "";

  try {
    const body = await request.json();
    message = (body.message || "").trim();
  } catch {
    message = "";
  }

  // --- 圧力判定（言語・意味・文字種 非依存） ---
  let pressure = 0;

  if (message.length === 0) {
    pressure = 0;
  } else if (message.length < 12) {
    pressure = 1; // 単語・挨拶・記号
  } else if (message.length < 60) {
    pressure = 2; // 短文
  } else {
    pressure = 3; // 展開された文章
  }

  // --- 応答生成（v4.3A思想準拠） ---
  let reply = "";

  switch (pressure) {
    case 0:
    case 1:
      // 沈黙は沈黙として返す
      reply = "";
      break;

    case 2:
      reply = pick([
        "今の言葉は、ここにあります。",
        "急がなくて大丈夫です。"
      ]);
      break;

    case 3:
      reply = pick([
        "ここまでで、十分に書かれています。",
        "一度、ここで区切れそうです。"
      ]);
      break;
  }

  return new Response(
    JSON.stringify({
      reply,
      pressure
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
