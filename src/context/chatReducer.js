const newConversation = () => ({
  id: crypto.randomUUID(),
  title: "Nueva conversación",
  messages: [],
});

export function createInitialState() {
  const first = newConversation();
  return {
    conversations: [first],
    activeId: first.id,
    isLoading: false,
    error: null,
  };
}

// Aplica una función solo a la conversación activa
const updateActive = (state, fn) =>
  state.conversations.map((c) => (c.id === state.activeId ? fn(c) : c));

export function chatReducer(state, action) {
  switch (action.type) {
    case "NEW_CONVERSATION": {
      const conv = newConversation();
      return {
        ...state,
        conversations: [conv, ...state.conversations],
        activeId: conv.id,
        error: null,
      };
    }

    case "SELECT_CONVERSATION":
      return { ...state, activeId: action.payload, error: null };

    case "DELETE_CONVERSATION": {
      const conversations = state.conversations.filter(
        (c) => c.id !== action.payload,
      );
      if (conversations.length === 0) return createInitialState();
      const activeId =
        state.activeId === action.payload
          ? conversations[0].id
          : state.activeId;
      return { ...state, conversations, activeId };
    }

    case "ADD_MESSAGE":
      return {
        ...state,
        conversations: updateActive(state, (c) => ({
          ...c,
          title:
            c.messages.length === 0 && action.payload.role === "user"
              ? action.payload.content.slice(0, 30)
              : c.title,
          messages: [...c.messages, action.payload],
        })),
      };

    case "APPEND_TO_LAST_MESSAGE":
      return {
        ...state,
        conversations: updateActive(state, (c) => {
          const messages = [...c.messages];
          const last = messages[messages.length - 1];
          messages[messages.length - 1] = {
            ...last,
            content: last.content + action.payload,
          };
          return { ...c, messages };
        }),
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };

    case "CLEAR_HISTORY":
      return createInitialState();

    default:
      return state;
  }
}
