// functions/celeste.js
import OpenAI from "openai";

export default {
  async fetch(request, env) {
    // OpenAI API Key
    const apiKey = env.OPENAI_API_KEY;
    const client = new OpenAI({ apiKey });

    // Only allow POST
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Read prompt from request body
    const { prompt } = await request.json();

    // OpenAI API request
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Celeste. A quiet intelligence who prepares what lies ahead.",
        },
        { role: "user", content: prompt },
      ],
    });

    const reply = completion.choices[0].message.content;

    // Return JSON
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
