import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { httpClient } from "../../../config/http_client";
import moment from "moment";

function MessageMapper() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const myUser = localStorage.getItem("username");
  const id = useParams().id;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get("/chat/chats/" + id + "/messages");
      setMessages(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col ">
      {messages.map((message) => (
        <div
          key={message.message_id}
          className={`p-4 rounded-2xl mb-3 max-w-[60%] flex flex-col ${
            message.sender_username === myUser
              ? "bg-blue-500 text-white ml-auto"
              : "bg-white text-black mr-auto"
          }`}
        >
          <p className="break-all whitespace-pre-wrap">{message.content}</p>

          <span
            className={`text-xs mt-1 self-end whitespace-nowrap ${
              message.sender_username === myUser
                ? "text-white/80"
                : "text-gray-500"
            }`}
          >
            {moment.utc(message.created_at).local().format("HH:mm")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MessageMapper;
