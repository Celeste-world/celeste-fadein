export async function onRequest({ request }) {
  // CORS（devなので広め。必要なら絞ってOK）
  const cors = {
    "Access-Control-Allow-Origin": "https://celeste.world",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ reply: "" }), { status: 405, headers: cors });
  }

  let message = "";
  try {
    const body = await request.json();
    message = (body.message || "").trim();
  } catch {
    message = "";
  }

  // --- 圧力判定（言語・意味・文字種 非依存） ---
  // 「？」単体でも “短語” 扱いで沈黙に寄せられる（英語に傾かない）
  let pressure = 0;
  const len = message.length;

  if (len === 0) {
    pressure = 0;
  } else if (len < 12) {
    pressure = 1; // 短語・名詞・挨拶・記号
  } else if (len < 60) {
    pressure = 2; // 短文
  } else {
    pressure = 3; // 展開・複文
  }

  // --- 応答生成（v5.0A方針：沈黙は沈黙で返さず、必要な時だけ短く） ---
  // ※ここは日本語固定。後で「モデルに同言語生成」へ差し替える前提。
  let reply = "";

  if (pressure === 0 || pressure === 1) {
    reply = ""; // “態度はUIで返す”ので、APIは沈黙
  } else if (pressure === 2) {
    reply = pick([
      "今の言葉は、ここにあります。",
      "少し間を置いても構いません。",
      "ゆっくりで大丈夫です。"
    ]);
  } else {
    reply = pick([
      "ここで一度、区切れそうです。",
      "もう十分に書かれています。",
      "言葉はもう、形になっています。"
    ]);
  }

  return new Response(JSON.stringify({ reply }), { headers: cors });
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
