import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatWindow from "./Components/ChatWindow";
import MessageInput from "./Components/MessageInput";
import UsernameForm from "./Components/UserNameForm";
import { APIUrl } from "../utils";

const socket = io(APIUrl);

let typingTimeout;

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chat history", (history) => {
      setMessages(history);
    });

    socket.on("typing", (user) => {
      if (user !== username) {
        setTypingUser(user);
      }
    });

    socket.on("stop typing", (user) => {
      if (user === typingUser) {
        setTypingUser("");
      }
    });

    return () => {
      socket.off("chat message");
      socket.off("chat history");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [username, typingUser]);

  const handleJoin = (name) => {
    setUsername(name);
    socket.emit("join", name);
  };

  const handleSend = (msg) => {
    socket.emit("chat message", msg);
    setMessage("");
    socket.emit("stop typing", username);
  };

  const handleTyping = (e) => {
    const val = e.target.value;
    setMessage(val);
    socket.emit("typing", username);

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stop typing", username);
    }, 1000);
  };

  if (!username) return <UsernameForm onSubmit={handleJoin} />;

  return (
    <div className="h-screen w-screen overflow-scroll bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Socket.io Implementation
        </h2>
        <h2 className="text-lg text-center text-gray-600">
          Welcome,{" "}
          <span className="font-semibold text-indigo-600">{username}</span>
        </h2>

        <ChatWindow
          messages={messages}
          currentUser={username}
          typingUser={typingUser}
        />

        <MessageInput
          value={message}
          onChange={handleTyping}
          onSend={handleSend}
        />
        <div className="flex justify-center">
          <a
            href={`${APIUrl}/download-chats`}
            className="bg-indigo-200 hover:bg-indigo-300 text-blue-600 px-4 py-2 rounded-lg shadow-md transition-all"
            download
          >
            Download Chat History
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
