import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (email: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance: Socket = io("http://localhost:5000", {
      transports: ["websocket"], // Prefer websocket transport
      reconnectionAttempts: 5, // Number of reconnection attempts before giving up
      reconnectionDelay: 2000, // Time in ms between reconnection attempts
    });

    setSocket(socketInstance);

    function onConnect() {
      setIsConnected(true);
      socketInstance.emit("register", email);
      setTransport(socketInstance.io.engine.transport.name);

      socketInstance.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect(reason: string) {
      console.error(`Socket disconnected: ${reason}`);
      setIsConnected(false);
      setTransport("N/A");
    }

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);

    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
      socketInstance.disconnect();
    };
  }, [email]);

  const sendPrivateMessage = (
    toEmail: string,
    message: string,
    timestamp: string
  ) => {
    if (socket) {
      socket.emit("privateMessage", { toEmail, message, timestamp });
    }
  };

  return { socket, isConnected, transport, sendPrivateMessage };
};
