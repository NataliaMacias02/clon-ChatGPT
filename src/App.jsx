import { useForm } from "react-hook-form";
import { useState } from "react";

function App() {
  const [mensajes, setMensajes] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // reset: reestablecer el valor inicial del formulario

  const onSubmit = (data) => {
    setMensajes([...mensajes, data.mensaje]);
    reset();
  };

  return (
    <main className="min-h-screen flex flex-col">

      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">
          DevfSeek
        </h1>
      </header>

      {/* Mostrar los mensajes en el chat */}
      <section className="flex-1 p-4">
        {mensajes.map((mensaje, index) => (
          <div
            key={index}
            className="flex justify-end"
          >
            <p className="px-4 py-2 rounded-lg">
              {mensaje}
            </p>
          </div>
        ))}
      </section>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            {...register("mensaje", {
              required: "El mensaje no puede estar vacío"
            })}
            className="w-full border rounded-lg px-4 py-2"
          />

          {errors.mensaje && (
            <p>{errors.mensaje.message}</p>
          )}

          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium"
          >
            Enviar
          </button>
        </div>
      </form>

    </main>
  );
}

export default App;