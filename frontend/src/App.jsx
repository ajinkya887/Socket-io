import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatWindow from "./Components/ChatWindow";
import MessageInput from "./Components/MessageInput";
import UsernameForm from "./Components/UserNameForm";

const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleJoin = (name) => {
    setUsername(name);
    socket.emit("join", name);
  };

  const handleSend = (msg) => {
    socket.emit("chat message", msg);
  };

  if (!username) return <UsernameForm onSubmit={handleJoin} />;

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Socket.io Implementation
        </h2>
        <h2 className="text-lg text-center text-gray-600">
          Welcome,{" "}
          <span className="font-semibold text-indigo-600">{username}</span>
        </h2>

        <div>
          <ChatWindow messages={messages} />
        </div>

        <div className="mt-4">
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;
