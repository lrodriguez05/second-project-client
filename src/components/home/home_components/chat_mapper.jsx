import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { NavLink } from "react-router";
import { ChatContext } from "./aside";

function ChatMapper() {
  const maxLength = 20;
  const { chats } = useContext(ChatContext);

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <section className="flex flex-col gap-1">
      {chats.map((chat) => (
        <NavLink
          key={chat.chat_id}
          to={`/chats/${chat.chat_id}`}
          className="flex items-center gap-2 justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <img
              src={chat.other_user_picture}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {chat.other_username}
              </span>
              <span className="text-xs text-gray-400">
                {chat.last_message
                  ? chat.last_message.length > maxLength
                    ? chat.last_message.slice(0, maxLength) + "..."
                    : chat.last_message
                  : "No hay mensajes"}
              </span>
            </div>
          </div>

          <span className="text-xs text-gray-400">
            {chat.last_message_at
              ? moment.utc(chat.last_message_at).local().format("HH:mm")
              : ""}
          </span>
        </NavLink>
      ))}
    </section>
  );
}

export default ChatMapper;
