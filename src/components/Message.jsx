export default function Message({ role, content }) {
    const isUser = role === "user";

    // Separar el razonamiento de la respuesta final
    const match = content.match(/<think>([\s\S]*?)(<\/think>|$)/);
    const thinking = match ? match[1].trim() : null;
    const answer = content.replace(/<think>[\s\S]*?(<\/think>|$)/, "").trim();

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
            <div className="max-w-[80%]">
                {thinking && (
                    <details className="text-sm text-gray-500 mb-1">
                        <summary className="cursor-pointer">Razonamiento</summary>
                        <p className="whitespace-pre-wrap">{thinking}</p>
                    </details>
                )}
                {answer && (
                    <p className="px-4 py-2 rounded-lg border whitespace-pre-wrap">{answer}</p>
                )}
            </div>
        </div>
    );
}