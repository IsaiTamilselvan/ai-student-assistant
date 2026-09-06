import React from 'react';

export default function ChatMessage({ message, loading }) {
  if (loading) {
    return (
      <div className="d-flex justify-content-start mb-3">
        <div className="bg-white text-muted border p-3 rounded-3 fst-italic shadow-sm">
          Thinking locally...
        </div>
      </div>
    );
  }

  const isUser = message.sender === "user";
  return (
    <div className={`d-flex mb-3 ${isUser ? "justify-content-end" : "justify-content-start"}`}>
      <div 
        className={`p-3 rounded-3 shadow-sm ${isUser ? "bg-primary text-white" : "bg-white text-dark border"}`} 
        style={{ maxWidth: "75%" }}
      >
        {message.text}
      </div>
    </div>
  );
}