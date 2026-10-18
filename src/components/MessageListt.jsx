import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import Message from "./Message";

export default function MessageList() {
    const { state } = useChat();
    const finRef = useRef(null);

    const activa = state.conversations.find((c) => c.id === state.activeId);
    const mensajes = activa?.messages ?? [];

    // Bajar automáticamente al último mensaje
    useEffect(() => {
        finRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    return (
        <section className="flex-1 p-4 overflow-y-auto">
            {mensajes.map((m, index) => (
                <Message key={index} role={m.role} content={m.content} />
            ))}
            {state.isLoading && <p className="text-sm text-gray-500">Pensando...</p>}
            {state.error && <p className="text-red-500">{state.error}</p>}
            <div ref={finRef} />
        </section>
    );
}