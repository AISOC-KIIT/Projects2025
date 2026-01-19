import { User, Bot } from "lucide-react";

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`rounded-full p-2 ${
          isUser ? "bg-primary-600" : "bg-gray-100"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-gray-700" />
        )}
      </div>

      <div
        className={`message-bubble ${isUser ? "message-user" : "message-bot"}`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <p
          className={`text-xs mt-2 ${
            isUser ? "text-primary-100" : "text-gray-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default Message;
