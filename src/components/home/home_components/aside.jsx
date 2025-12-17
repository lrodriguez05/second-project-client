import { EllipsisVertical, MessageSquarePlus, Search } from "lucide-react";
import ChatMapper from "./chat_mapper.jsx";
import NewChat from "./new_chat.jsx";
import { useState, createContext, useEffect } from "react";
import { httpClient } from "../../../config/http_client";

export const ChatContext = createContext();

function Aside() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    try {
      const response = await httpClient.get("/chat/chats");
      setChats(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  return (
    <ChatContext.Provider value={{ chats, fetchChats }}>
      <section className="flex flex-col justify-start border-r bg-white border-gray-300 h-screen min-w-90">
        <header className="flex justify-between items-center px-4 py-3">
          <span className="font-bold text-xl">TestChat</span>
          <div className="flex gap-1">
            <NewChat size={25} />
            <EllipsisVertical size={25} />
          </div>
        </header>
        <div className="p-4">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full focus-within:ring-2 ring-blue-500">
            <Search size={25} />
            <input
              type="text"
              placeholder="Search"
              className="pl-2 w-full outline-none"
            />
          </div>
        </div>
        <div className="flex gap-3 px-4 pb-3">
          <button className="bg-white rounded-full px-2 py-1 border border-gray-300">
            Todos
          </button>
          <button className="bg-white rounded-full px-2 py-1 border border-gray-300">
            Sin leer
          </button>
          <button className="bg-white rounded-full px-2 py-1 border border-gray-300">
            Favoritos
          </button>
          <button className="bg-white rounded-full px-2 py-1 border border-gray-300">
            Grupos
          </button>
        </div>
        <div className="flex flex-col gap-2 p-4 overflow-y-scroll">
          <ChatMapper />
        </div>
      </section>
    </ChatContext.Provider>
  );
}

export default Aside;
