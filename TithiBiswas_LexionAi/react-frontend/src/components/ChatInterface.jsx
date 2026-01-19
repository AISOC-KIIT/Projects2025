import { useState, useRef, useEffect } from "react";
import { Send, Loader2, MessageSquare } from "lucide-react";
import axios from "axios";
import Message from "./Message";

const BACKEND_URL = "http://127.0.0.1:8000/";

function ChatInterface({ docId }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I've analyzed your document. Feel free to ask me any questions about it, and I'll answer based only on the content of the document.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/ask`, {
        doc_id: docId,
        question: input,
      });

      const botMessage = {
        role: "assistant",
        content: response.data.answer || "No answer found.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error asking question:", error);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary-100 p-2 rounded-lg">
            <MessageSquare className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Ask Questions</h3>
            <p className="text-xs text-gray-500">
              Answers based on your document
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-custom">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 rounded-full p-2">
              <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
            </div>
            <div className="message-bubble message-bot">
              <p className="text-gray-500">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about your document..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
