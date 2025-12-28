export async function onRequest({ request }) {
  let t = "";

  try {
    const body = await request.json();
    t = (body.message || "").trim();
  } catch {
    t = "";
  }

  // --- greeting 判定（最小セット） ---
  const greetings = [
    "hi", "hello", "hey",
    "おはよう", "こんにちは", "こんばんは"
  ];

  const lower = t.toLowerCase();
  const isGreeting = greetings.some(g =>
    lower.startsWith(g)
  );

  // --- pressure 判定 ---
  let pressure = 0;

  if (t.length === 0) {
    pressure = 0;
  } else if (isGreeting) {
    pressure = 2;
  } else if (t.length < 12) {
    pressure = 1;
  } else if (t.length < 60) {
    pressure = 2;
  } else {
    pressure = 3;
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
        "ここに言葉が届いています。",
        "今の言葉は、確かにここにあります。"
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
    JSON.stringify({ reply, pressure }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
