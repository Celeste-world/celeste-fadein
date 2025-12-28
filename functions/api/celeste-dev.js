export async function onRequestPost({ request }) {
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
      // 単語そのまま返す（Hi → Hi）
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

// OPTIONS（CORS / 405 回避）
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
