export async function onRequestPost() {
  return new Response(
    "HELLO FROM CELESTE API",
    { headers: { "Content-Type": "text/plain" } }
  );
}
