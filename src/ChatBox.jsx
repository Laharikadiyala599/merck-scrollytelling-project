import { useState } from "react";

export default function ChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
  };

  return (
    <div className={`chatbox ${isOpen ? "open" : ""}`}>
      
      <div className="chat-header">
        <span>Assistant</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}