export async function onRequest(context) {
  return new Response(
    JSON.stringify({
      reply: "✅ CELESTE API CONNECTED"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
