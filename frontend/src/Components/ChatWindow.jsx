import React from "react";

const ChatWindow = ({ messages, currentUser }) => {
  return (
    <div className="border border-gray-200 p-4 h-80 overflow-y-auto rounded-xl bg-gray-50 space-y-2">
      {messages.map((msg, idx) => {
        const isOwnMessage = msg.user === currentUser;
        return (
          <div
            key={idx}
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 w-auto rounded-2xl  shadow ${
                isOwnMessage
                  ? "bg-green-100 text-right text-gray-800"
                  : "bg-blue-100 text-left text-gray-800"
              }`}
            >
              <strong>{msg.user}:</strong> {msg.text}
              <span className="block text-[10px] text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatWindow;
