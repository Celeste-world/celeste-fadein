export async function onRequest({ request }) {
  const text = await request.text();
  const t = text.trim();

  // --- 圧力判定（言語・意味 非依存） ---
  let pressure = 0;
  if (t.length === 0) {
    pressure = 0;
  } else if (t.length < 12) {
    pressure = 1;   // 短語・名詞・挨拶
  } else if (t.length < 60) {
    pressure = 2;   // 短文
  } else {
    pressure = 3;   // 展開・複文
  }

  // --- 応答生成（v4.3A互換） ---
  let response = "";

  switch (pressure) {
    case 0:
    case 1:
      response = ""; // 沈黙
      break;

    case 2:
      response = pick([
        "今の言葉は、ここにあります。",
        "少し間を置いても構いません。"
      ]);
      break;

    case 3:
      response = pick([
        "ここで一度、区切れそうです。",
        "もう十分に書かれています。"
      ]);
      break;
  }

  // --- JSON で返す（後方互換） ---
  return new Response(
    JSON.stringify({
      response,   // v4.3A 用
      pressure    // v5.0A 用
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
