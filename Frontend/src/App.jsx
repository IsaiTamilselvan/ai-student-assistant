import React, { useState, useEffect } from 'react';import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { sendMessageToAPI } from './services/api';

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (text) => {
    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const answer = await sendMessageToAPI(text);
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat_messages');
  };

  return (
    <div className="container py-5" style={{ maxWidth: "900px", maxHeight: "300px" }}>
      <div className="card shadow border-0 rounded-4">
        <ChatHeader />
        
        <div className="card-body p-4" style={{ height: "350px", overflowY: "auto", background: "#f8f9fa" }}>
          {messages.length === 0 && (
            <div className="text-center text-muted my-auto py-5">
              <p className="mb-1">Ask me anything about college schedules, rules, or courses!</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          
          {loading && <ChatMessage loading={true} />}
        </div>

        <div className="px-3 pt-2 bg-white d-flex justify-content-end">
          {messages.length > 0 && (
            <button onClick={clearChat} className="btn btn-sm btn-outline-danger">
              Clear History
            </button>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;