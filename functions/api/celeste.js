export async function onRequest() {
  return new Response(
    "CELESTE API OK",
    { headers: { "Content-Type": "text/plain" } }
  );
}
