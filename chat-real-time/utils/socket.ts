// /src/utils/socket.ts
import { io, Socket } from "socket.io-client";
import { env } from "@/constants/environment";

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(env.SERVER, {
      transports: ["websocket"],
      autoConnect: true,
    });
  }
  return socketInstance;
};
