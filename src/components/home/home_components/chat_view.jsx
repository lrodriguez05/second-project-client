import { EllipsisVertical, Search, Video } from "lucide-react";
import MessageMapper from "./message_mapper.jsx";
import { useState } from "react";
import { httpClient } from "../../../config/http_client";
import { useParams } from "react-router";

function ChatView() {
  const [message, setMessage] = useState("");
  const id = useParams().id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await httpClient.post(
        "/chat/chats/" + id + "/messages",
        {
          content: message,
        }
      );
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section className="flex flex-col h-full min-h-0 bg-gray-100">
      <header className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-300">
        <div className="flex items-center gap-5">
          <img
            src="https://static8.depositphotos.com/1016676/815/i/450/depositphotos_8153880-stock-photo-smiling-cow.jpg"
            alt="Foto contacto"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="font-semibold">Nombre del contacto</h1>
        </div>

        <div className="flex items-center gap-5">
          <Video size={25} />
          <Search size={25} />
          <EllipsisVertical size={25} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 min-h-0">
        <MessageMapper />
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
