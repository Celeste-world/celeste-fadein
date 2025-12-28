<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Celeste Console – Dev</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>
  body {
    margin: 0;
    height: 100vh;
    background: radial-gradient(circle at top, #0b1530, #03060f);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    color: #e8ebef;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .console {
    width: 720px;
    max-width: 92%;
    padding: 28px;
    border-radius: 16px;
    background: rgba(10, 18, 40, 0.55);
    backdrop-filter: blur(18px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
  }

  .log {
    min-height: 120px;
    white-space: pre-wrap;
    line-height: 1.6;
    font-size: 15px;
  }

  .input {
    margin-top: 18px;
    width: 100%;
    padding: 14px 16px;
    border-radius: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: #e8ebef;
    outline: none;
    font-size: 15px;
  }

  .input::placeholder {
    color: rgba(255,255,255,0.35);
  }

  .footer {
    margin-top: 10px;
    text-align: right;
    font-size: 11px;
    opacity: 0.4;
  }

  .error {
    color: #ff6b6b;
    margin-top: 8px;
    font-size: 14px;
  }
</style>
</head>

<body>
  <div class="console">
    <div id="log" class="log"></div>
    <input
      id="input"
      class="input"
      placeholder="Write freely."
      autocomplete="off"
    />
    <div id="error" class="error"></div>
    <div class="footer">CELESTE v4.4-dev</div>
  </div>

<script>
const log = document.getElementById("log");
const input = document.getElementById("input");
const errorBox = document.getElementById("error");

input.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  errorBox.textContent = "";

  log.textContent += `\n${text}\n`;

  try {
    const res = await fetch("/functions/api/celeste-dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error("Non-JSON response");
    }

    const data = await res.json();

    if (data.reply) {
      log.textContent += `${data.reply}\n`;
    }

  } catch (err) {
    errorBox.textContent = "[API error]";
  }
});
</script>
</body>
</html>
