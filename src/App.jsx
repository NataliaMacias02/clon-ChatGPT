import { useForm } from "react-hook-form";
import { useChat } from "./context/ChatContext";
import { useOllama } from "./hooks/useOllama";
import History from "./components/History";
import Message from "./components/Message";

function App() {
  const { state } = useChat();
  const { sendMessage, stop, isLoading, error } = useOllama();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const activa = state.conversations.find((c) => c.id === state.activeId);
  const mensajes = activa?.messages ?? [];

  const onSubmit = (data) => {
    sendMessage(data.mensaje);
    reset();
  };

  return (
    <div className="min-h-screen flex">
      <History />

      <main className="flex-1 flex flex-col">
        <header className="p-4 border-b">
          <h1 className="text-xl font-bold">DevfSeek</h1>
        </header>

        {/* Mostrar los mensajes en el chat */}
        <section className="flex-1 p-4 overflow-y-auto">
          {mensajes.map((m, index) => (
            <Message key={index} role={m.role} content={m.content} />
          ))}
          {isLoading && <p className="text-sm text-gray-500">Pensando...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              {...register("mensaje", {
                required: "El mensaje no puede estar vacío",
              })}
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.mensaje && (
              <p className="text-red-500 text-sm">{errors.mensaje.message}</p>
            )}
          </div>

          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="px-4 py-2 rounded-lg font-medium border"
            >
              Detener
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 rounded-lg font-medium border">
              Enviar
            </button>
          )}
        </form>
      </main>
    </div>
  );
}

export default App;