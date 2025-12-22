import { Modal } from "antd";
import { useState, useContext } from "react";
import { MessageSquarePlus } from "lucide-react";
import UserMapper from "./user_mapper.jsx";
import { httpClient } from "../../../config/http_client";
import { ChatContext } from "./aside";

function NewChat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const { fetchChats } = useContext(ChatContext);

  const handleSelectedUser = (username) => {
    setSelectedUser(username);
  };

  const handleCreateChat = async () => {
    if (!selectedUser) return;
    try {
      const response = await httpClient.post("/chat/chats", {
        otherUsername: selectedUser,
      });
      fetchChats();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <MessageSquarePlus onClick={() => setIsModalOpen(true)} size={25} />
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText="Iniciar chat"
        onOk={handleCreateChat}
        cancelText="Cancelar"
      >
        <p className="text-xl font-semibold text-center">
          Selecciona un usuario para iniciar un chat
        </p>
        <div className="border rounded-lg border-gray-300 bg-gray-100 overflow-hidden overflow-y-scroll h-95">
          <UserMapper onSelectedUser={handleSelectedUser} />
        </div>
      </Modal>
    </>
  );
}

export default NewChat;
