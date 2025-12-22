import { EllipsisVertical, Search, Video } from "lucide-react";
import MessageMapper from "./message_mapper.jsx";
import { useState, useEffect, useRef } from "react";
import { httpClient } from "../../../config/http_client";
import { useParams } from "react-router";
import { getSocket, initSocket } from "../../../config/socket.js";

function ChatView() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const id = useParams().id;
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchMessages();
    fetchOtherUser();
  }, [id]);

  useEffect(() => {
    getSocket().on(`chat:${id}`, (newMessage) => {
      console.log("Mensaje recibido:", newMessage);

      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      getSocket().off(`chat:${id}`);
    };
  }, [id]);

  const fetchMessages = async () => {
    try {
      const response = await httpClient.get(`/chat/chats/${id}/messages`);
      setMessages(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchOtherUser = async () => {
    try {
      const response = await httpClient.get(`chat/chats/${id}/otherUser`);
      setOtherUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getSocket().emit("message", { message, chatId: id });
    setMessage("");
  };

  return (
    <section className="flex flex-col h-full min-h-0 bg-gray-100 border-b border-gray-300">
      <header className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-300">
        <div className="flex items-center gap-5">
          <img
            src={otherUser?.other_user_picture}
            alt="Foto contacto"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="font-semibold">{otherUser?.other_username}</h1>
        </div>

        <div className="flex items-center gap-5">
          <Video size={25} />
          <Search size={25} />
          <EllipsisVertical size={25} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 min-h-0">
        <MessageMapper toMap={messages} />
        <div ref={bottomRef} />
      </main>

      <div className="flex items-center bg-white border-t border-gray-300 p-3">
        <form
          className="flex items-center w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Escribe un mensaje"
            className="w-full p-2 rounded-lg outline-none border border-gray-300"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChatView;
