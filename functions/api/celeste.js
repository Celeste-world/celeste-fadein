export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Not Found", { status: 404 });
    }

    const body = await request.json();

    // ここではまだ LLM を使わない
    // v4.2A 用の「構造だけ返す」最小応答
    const reply =
      body?.messages?.length > 0
        ? "書いた内容は受け取りました。どの要素から整理するか、一つ挙げてください。"
        : "どこから考えを始めますか。";

    return new Response(
      JSON.stringify({ reply }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
};
