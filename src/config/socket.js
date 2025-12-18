// src/socket.ts
import { io } from "socket.io-client";

let socket = null;

const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL;

export function initSocket(token) {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: token ? { token } : undefined,
      autoConnect: true,
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
