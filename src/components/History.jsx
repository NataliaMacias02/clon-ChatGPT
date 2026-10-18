import { useChat } from "../context/ChatContext";

export default function History() {
    const { state, dispatch } = useChat();

    return (
        <aside className="w-64 border-r p-3 flex flex-col gap-2 overflow-y-auto">
            <button
                onClick={() => dispatch({ type: "NEW_CONVERSATION" })}
                className="px-4 py-2 rounded-lg border font-medium"
            >
                + Nueva conversación
            </button>

            <ul className="flex-1">
                {state.conversations.map((c) => (
                    <li
                        key={c.id}
                        onClick={() => dispatch({ type: "SELECT_CONVERSATION", payload: c.id })}
                        className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${c.id === state.activeId ? "font-bold border" : ""
                            }`}
                    >
                        <span className="truncate">{c.title}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch({ type: "DELETE_CONVERSATION", payload: c.id });
                            }}
                            aria-label="Eliminar conversación"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => dispatch({ type: "CLEAR_HISTORY" })}
                className="text-sm underline"
            >
                Borrar todo el historial
            </button>
        </aside>
    );
}