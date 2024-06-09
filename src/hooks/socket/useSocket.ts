import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (email: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance: Socket = io("http://localhost:5000"); // Ensure this matches your server URL
    setSocket(socketInstance);

    if (socketInstance.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      socketInstance.emit("register", email);
      setTransport(socketInstance.io.engine.transport.name);

      socketInstance.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
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

  const sendPrivateMessage = (toEmail: string, message: string) => {
    if (socket) {
      socket.emit("privateMessage", { toEmail, message });
    }
  };
  return { socket, isConnected, transport, sendPrivateMessage };
};

// MessagePage component remains unchanged from the previous update
