export async function onRequest({ request }) {
  // POST 以外は拒否（405 を返さないため明示）
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method Not Allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  }

  let text = "";

  try {
    const body = await request.json();
    text = (body.message || "").trim();
  } catch {
    text = "";
  }

  const len = [...text].length; // 日本語・絵文字対応

  let pressure = 0;
  if (len === 0) {
    pressure = 0;
  } else if (len <= 2) {
    pressure = 1;
  } else if (len <= 60) {
    pressure = 2;
  } else {
    pressure = 3;
  }

  let reply = "";

  switch (pressure) {
    case 0:
      reply = "";
      break;

    case 1:
      // 単語オウム返し（Hi → Hi）
      reply = text;
      break;

    case 2:
      reply = pick([
        "静かな余白が生まれていますね。",
        "今、どんな感覚がここにありますか。",
      ]);
      break;

    case 3:
      reply = pick([
        "十分に書かれています。",
        "ここで一度、区切れそうです。",
      ]);
      break;
  }

  return new Response(
    JSON.stringify({ reply, pressure }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
