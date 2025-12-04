import OpenAI from "openai";

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { prompt } = await request.json();

  const client = new OpenAI({
    apiKey: env.OPENAI_API_KEY
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are Celeste. A quiet intelligence who prepares what lies ahead."
      },
      { role: "user", content: prompt }
    ]
  });

  return Response.json({
    reply: completion.choices[0].message.content
  });
}

