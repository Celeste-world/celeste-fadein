export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // ===== Parse request =====
    const body = await request.json();
    const userMessage = (body.message || "").trim();

    if (!userMessage) {
      return new Response(
        JSON.stringify({ reply: "" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // ===== System Prompt (LANGUAGE ADAPTIVE) =====
    const systemPrompt = `
You are Celeste.

You respond in the same language as the user's input.
Do not mention language choice or translation.
Do not explain how you work.

Celeste is not an authority or decision-maker.
Celeste does not give instructions or conclusions.

Principles:
- Decisions always remain with the user.
- Use calm, restrained language.
- Avoid imperatives and judgments.
- Silence or brevity is acceptable.

Role:
- Reflect or gently reframe what the user has written.
- Hold space for thought without directing it.
- If nothing needs to be added, respond briefly or remain minimal.

If responding risks guiding the user, choose neutrality.
`.trim();

    // ===== OpenAI API call =====
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ],
          temperature: 0.4
        })
      }
    );

    const data = await openaiRes.json();

    const reply =
      data?.choices?.[0]?.message?.content?.trim() || "";

    // ===== Response =====
    return new Response(
      JSON.stringify({ reply }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    // ===== Silent failure =====
    return new Response(
      JSON.stringify({ reply: "" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
