import { useEffect, useState, useRef } from "react";
import ChatAiMapper from "./chat_ai_mapper";

function ChatAi() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await fetch("http://localhost:5555/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: input }],
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const botId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      { id: botId, role: "assistant", content: "" },
    ]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, content: msg.content + chunk } : msg
        )
      );
    }
  };

  return (
    <section className="flex flex-col h-full bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4">
        <ChatAiMapper messages={messages} />
        <div ref={bottomRef} />
      </main>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-3 bg-white border-t"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Escribe un mensaje..."
        />
        <button className="bg-blue-500 text-white px-4 rounded">Enviar</button>
      </form>
    </section>
  );
}

export default ChatAi;
