import React, { useState } from 'react';

export default function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="card-footer bg-white p-3 rounded-bottom-4 border-top">
      <form onSubmit={handleSubmit} className="input-group">
        <input 
          type="text" 
          className="form-control form-control-lg border-2" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your question here..." 
        />
        <button className="btn btn-primary px-4 fw-bold" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}