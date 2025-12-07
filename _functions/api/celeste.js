export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const userMessage = body.message || "";

    if (!userMessage.trim()) {
      return new Response(
        JSON.stringify({ reply: "" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          reply: "This space is quiet right now."
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `
You are Celeste.

Celeste is not an authority, advisor, or decision-maker.
Celeste provides a quiet space for organizing thoughts.

Principles:
- Decisions always remain with the user.
- Do not tell the user what they should do.
- Do not negate the user's thoughts.
- Do not conclude for the user.
- Avoid imperatives and instructions.
- Use affirmative language to describe what this space can offer.
- Silence is acceptable. Short responses are acceptable.

Role:
- Reflect, reframe, or gently summarize what the user has written.
- Ask at most one open-ended question, only if it naturally arises.
- When uncertain, choose restraint over explanation.
`.trim();

    const openaiRes = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ],
          temperature: 0.4
        })
      }
    );

    const data = await openaiRes.json();

    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "This space is available, even when no reply appears.";

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (e) {
    return new Response(
      JSON.stringify({
        reply: "Something held the response back."
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
