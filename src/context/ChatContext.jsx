/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { chatReducer, createInitialState } from "./chatReducer";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, undefined, createInitialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat debe usarse dentro de <ChatProvider>");
  return ctx;
}