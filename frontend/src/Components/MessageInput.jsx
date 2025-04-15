import { useState } from "react";
import { GrSend } from "react-icons/gr";

const MessageInput = ({ onSend }) => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.trim()) {
      onSend(msg);
      setMsg("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-md"
    >
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type your message"
        className="flex-grow px-3 py-2 border-none focus:outline-none text-gray-700"
      />
      <button
        type="submit"
        className="text-black bg-blue-300 hover:bg-blue-200 p-2 rounded-full transition-all"
      >
        <GrSend className="w-6 h-6" />
      </button>
    </form>
  );
};

export default MessageInput;
