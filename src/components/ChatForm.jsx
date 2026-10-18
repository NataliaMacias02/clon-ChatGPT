import { useForm } from "react-hook-form";
import { useOllama } from "../hooks/useOllama";

export default function ChatForm() {
    const { sendMessage, stop, isLoading } = useOllama();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        sendMessage(data.mensaje);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t flex gap-2">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    {...register("mensaje", { required: "El mensaje no puede estar vacío" })}
                    className="w-full border rounded-lg px-4 py-2"
                />
                {errors.mensaje && (
                    <p className="text-red-500 text-sm">{errors.mensaje.message}</p>
                )}
            </div>

            {isLoading ? (
                <button type="button" onClick={stop} className="px-4 py-2 rounded-lg font-medium border">
                    Detener
                </button>
            ) : (
                <button type="submit" className="px-4 py-2 rounded-lg font-medium border">
                    Enviar
                </button>
            )}
        </form>
    );
}