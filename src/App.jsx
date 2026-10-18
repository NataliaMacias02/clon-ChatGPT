import Header from "./components/Header";
import History from "./components/History";
import MessageList from "./components/MessageListt";
import ChatForm from "./components/ChatForm";

function App() {
  return (
    <div className="min-h-screen flex">
      <History />
      <main className="flex-1 flex flex-col">
        <Header />
        <MessageList />
        <ChatForm />
      </main>
    </div>
  );
}

export default App;