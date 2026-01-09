import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { mapperStyle } from "./chat_ai_mapper_components";

function ChatAiMapper({ messages }) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] rounded-xl px-4 py-2 whitespace-pre-wrap
              ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-900 border"
              }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mapperStyle({ node: msg })}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatAiMapper;
