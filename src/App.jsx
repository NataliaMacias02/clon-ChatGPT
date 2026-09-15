import { useForm } from "react-hook-form";

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        type="text"
        placeholder="Nombre"
        {...register("nombre", {
          required: "El nombre es obligatorio"
        })}
      />

      {errors.nombre && <p>{errors.nombre.message}</p>}

      <button type="submit">
        Enviar
      </button>

    </form>
  );
}

export default App;