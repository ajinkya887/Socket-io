import React from "react";

const ChatWindow = ({ messages }) => {
  return (
    <div className="border border-gray-200 p-4 h-80 overflow-y-auto rounded-xl bg-gray-50 space-y-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className="w-fit max-w-xs px-4 py-2 bg-blue-100 text-gray-800 rounded-2xl shadow"
        >
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
