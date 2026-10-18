const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "deepseek-r1:1.5b";

export async function streamChat(messages, onToken, signal) {
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages, stream: true }),
    signal,
  });

  if (!res.ok) throw new Error(`Ollama respondió con estado ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop(); // la última línea puede venir incompleta

    for (const line of lines) {
      if (!line.trim()) continue;
      const json = JSON.parse(line);
      if (json.message?.content) onToken(json.message.content);
    }
  }
}
