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
    pressure = 1;
  } else if (message.length < 60) {
    pressure = 2;
  } else {
    pressure = 3;
  }

  let reply = "";

  switch (pressure) {
    case 0:
    case 1:
      reply = ""; // 沈黙
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

  return new Response(
    JSON.stringify({ reply }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
