export async function onRequestPost(context) {
  return new Response(
    JSON.stringify({
      reply: "受け取りました。どの部分から整理しますか。"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
