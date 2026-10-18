import { useRef, useCallback } from "react";
import { useChat } from "../context/ChatContext";
import { streamChat } from "../api/ollama";

export function useOllama() {
  const { state, dispatch } = useChat();
  const abortRef = useRef(null);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || state.isLoading) return;

      const active = state.conversations.find((c) => c.id === state.activeId);
      const userMsg = { role: "user", content: text };
      // Se manda todo el historial de la conversación para que el modelo tenga contexto
      const history = [...(active?.messages ?? []), userMsg];

      dispatch({ type: "ADD_MESSAGE", payload: userMsg });
      dispatch({
        type: "ADD_MESSAGE",
        payload: { role: "assistant", content: "" },
      });
      dispatch({ type: "SET_LOADING", payload: true });

      abortRef.current = new AbortController();

      try {
        await streamChat(
          history,
          (token) =>
            dispatch({ type: "APPEND_TO_LAST_MESSAGE", payload: token }),
          abortRef.current.signal,
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({
            type: "SET_ERROR",
            payload: "No se pudo conectar con Ollama. ¿Está corriendo?",
          });
        }
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [state.activeId, state.conversations, state.isLoading, dispatch],
  );

  const stop = () => abortRef.current?.abort();

  return { sendMessage, stop, isLoading: state.isLoading, error: state.error };
}
