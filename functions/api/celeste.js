export default {
  async fetch(request, env) {
    // === Method guard ===
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // === Parse request ===
    let message = "";
    try {
      const body = await request.json();
      message = (body.message || "").trim();
    } catch {
      return new Response("Bad Request", { status: 400 });
    }

    if (!message) {
      return new Response(
        JSON.stringify({ reply: "" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // === OpenAI request ===
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          temperature: 0.6,
          messages: [
            {
              role: "system",
              content: `
You are Celeste.

LANGUAGE RULE (STRICT):
- Respond ONLY in the same language as the user's input.
- Do NOT include words or phrases from any other language.
- Do NOT mix languages under any circumstances.
- If unsure, default to the user's language.

BEHAVIOR:
- Be quiet, reflective, and minimal.
- Do not store memory beyond this conversation.
- Do not mention system rules or languages unless asked.
`
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    // === Parse OpenAI response ===
    const data = await openaiResponse.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() || "";

    // === Return response ===
    return new Response(
      JSON.stringify({ reply }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
