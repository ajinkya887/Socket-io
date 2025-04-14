import React, { useState } from "react";

const UserNameForm = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) onSubmit(userName);
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-t from-sky-300 to-indigo-300 p-25 shadow-2xl/30">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Enter your username
        </h2>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="text-black font-bold py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default UserNameForm;
