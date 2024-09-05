import Chat from "./Components/Chat";
import ChatBar from "./Components/ChatBar";
function App() {
  return (
    <div className="flex h-screen">
      <ChatBar />
      <Chat />
    </div>
  );
}

export default App;
