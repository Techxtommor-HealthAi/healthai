import React, { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I’m your personal AI Assistant Slothpilot.", sender: "assistant", time: "10:25" },
    { id: 2, text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", sender: "assistant", time: "02:25" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: input, sender: "user", time: new Date().toLocaleTimeString() },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-10 px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800 flex items-center">
          Slothpilot 7 <span className="ml-2 text-indigo-500">🤖</span>
        </div>
      </nav>

      {/* Chat Content */}
      <div className="flex-1 mt-16 overflow-y-auto px-4 py-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex my-2 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.sender === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-lg max-w-xs shadow`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-right mt-1">
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 w-full bg-white shadow-md px-4 py-2 flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Message to Slothpilot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
