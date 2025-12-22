import moment from "moment";

function MessageMapper({ toMap }) {
  const myUser = localStorage.getItem("username");

  return (
    <div className="flex flex-col ">
      {toMap.map((message) => (
        <div
          key={message.message_id}
          className={`p-4 rounded-2xl mb-3 max-w-[60%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] flex flex-col ${
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
