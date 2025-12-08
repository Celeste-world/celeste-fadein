export async function onRequest({ request }) {
  const text = await request.text();

  // --- 圧力判定（言語非依存） ---
  const trimmed = text.trim();
  let pressure = 0;

  if (trimmed.length === 0) {
    pressure = 0;
  } else if (trimmed.length < 12) {
    pressure = 1;
  } else if (trimmed.length < 60) {
    pressure = 2;
  } else {
    pressure = 3;
  }

  // --- 応答生成（干渉しない） ---
  let response = "";

  switch (pressure) {
    case 0:
      response = "";
      break;
    case 1:
      response = pick([
        "ここに置かれました。",
        "受け取っています。",
        "そのままで大丈夫です。"
      ]);
      break;
    case 2:
      response = pick([
        "今の言葉は、ここにあります。",
        "続けても、止めても構いません。",
        "急がなくて大丈夫です。"
      ]);
      break;
    case 3:
      response = pick([
        "もう十分に書かれています。",
        "少し置いておいてもいいですね。",
        "ここで区切っても大丈夫です。"
      ]);
      break;
  }

  return new Response(response, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}

// --- ランダム選択 ---
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
