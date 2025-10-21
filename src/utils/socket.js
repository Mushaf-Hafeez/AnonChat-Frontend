import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL;

export const socket = io(URL, {
  withCredentials: true,
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});
