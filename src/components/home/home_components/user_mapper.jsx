import { useEffect, useState } from "react";
import { httpClient } from "../../../config/http_client";

function UserMapper({ onSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const defaultClass =
    "flex gap-3 items-center hover:bg-gray-200 p-3 rounded-lg cursor-pointer";
  const activeClass =
    "flex gap-3 items-center bg-gray-200 p-3 rounded-lg cursor-pointer";

  const fetchUsers = async () => {
    try {
      const response = await httpClient.get("/chat/chats/users");
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-3 p-3 flex-wrap">
      {users.map((user) => {
        const isActive = user.username === selectedUser;
        return (
          <div
            className={`
        ${defaultClass}
        ${isActive ? activeClass : "hover:bg-gray-200"}
      `}
            key={user.username}
            onClick={(e) => {
              e.preventDefault();
              setSelectedUser(user.username);
              onSelectedUser(user.username);
            }}
          >
            <img src={user.picture} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-medium text-xl">{user.username}</p>
              <span className="text-sm opacity-70">{user.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserMapper;
