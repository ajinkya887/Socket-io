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

  const handleDownload = async () => {
    try {
      const response = await fetch(`${APIUrl}/download-chats`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "chat_history.pdf";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      alert("Chats downloaded successfully..");
    } catch (err) {
      console.error("Download error:", err);
      alert("Could not download chat history.");
    }
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
          <button
            onClick={handleDownload}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            Download Chat History
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
