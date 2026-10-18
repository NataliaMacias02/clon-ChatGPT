# DevfSeek – Clon de ChatGPT

Clon básico de ChatGPT hecho con React y Vite que se conecta a un modelo de IA local mediante [Ollama](https://ollama.com), usando DeepSeek R1. El enfoque de este proyecto es la funcionalidad: consumir el modelo, mantener el historial de conversaciones y manejar el estado global de la aplicación.

## Funcionalidades

- Chat con respuestas en tiempo real (streaming) desde un modelo local.
- Visualización del razonamiento del modelo (`<think>`) en un bloque desplegable, separado de la respuesta.
- Historial de conversaciones: crear, seleccionar y eliminar conversaciones, o borrar todo.
- Botón para detener una respuesta a mitad de generación.
- Validación del formulario de mensajes con React Hook Form.
- Estado global con Context API y `useReducer`.

## Tecnologías

- React + Vite
- Tailwind CSS
- React Hook Form
- Ollama + DeepSeek R1 (`deepseek-r1:1.5b`)

## Requisitos previos

- [Node.js](https://nodejs.org) (versión 18 o superior)
- [Ollama](https://ollama.com/download)

## Instalación y uso

### 1. Instalar Ollama y descargar el modelo

Instala Ollama desde su sitio oficial y luego descarga la versión más ligera de DeepSeek R1 (aprox. 1.1 GB):

```bash
ollama pull deepseek-r1:1.5b
```

Verifica que se descargó correctamente:

```bash
ollama list
```

Ollama debe estar corriendo mientras usas la aplicación. Se comunica por `http://localhost:11434`.

### 2. Clonar e instalar el proyecto

```bash
git clone https://github.com/NataliaMacias02/clon-ChatGPT.git
cd clon-ChatGPT
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre en el navegador la dirección que aparece en la terminal (normalmente `http://localhost:5173`).

> **Windows:** si PowerShell bloquea `npm` por la política de ejecución de scripts, ejecuta
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
> o usa el Símbolo del sistema (cmd).

## Estructura del proyecto

```
src/
├── api/
│   └── ollama.js          # Llamada a la API de Ollama con streaming
├── context/
│   ├── chatReducer.js     # Reducer y estado inicial
│   └── ChatContext.jsx    # Provider y hook useChat
├── hooks/
│   └── useOllama.js       # Custom Hook para consumir Ollama
├── components/
│   ├── History.jsx        # Historial de conversaciones
│   └── Message.jsx        # Mensaje individual (con razonamiento)
├── App.jsx                # Vista principal del chat
└── main.jsx               # Punto de entrada con ChatProvider
```

## Flujo de datos

1. El usuario envía un mensaje desde el formulario en `App.jsx`.
2. `useOllama` agrega el mensaje al estado global y envía todo el historial de la conversación a Ollama.
3. `api/ollama.js` recibe la respuesta en fragmentos y cada uno se agrega al último mensaje mediante el reducer.
4. Los componentes leen el estado desde el contexto y se actualizan automáticamente.

## Solución de problemas

- **"No se pudo conectar con Ollama":** confirma que Ollama está corriendo y que el modelo `deepseek-r1:1.5b` aparece en `ollama list`.
- **La respuesta tarda en aparecer:** el modelo corre en tu equipo, así que el primer mensaje puede tardar más mientras se carga en memoria.

## Manejo de estado con useContext

- **`createContext`:** `ChatContext` en `src/context/ChatContext.jsx`.
- **Provider:** `ChatProvider` envuelve la app en `main.jsx` y expone `state` y `dispatch`.
- **`useContext`:** el hook `useChat` lo consumen `History`, `MessageList` y `useOllama`, sin pasar props entre componentes (se evita el *prop drilling*).