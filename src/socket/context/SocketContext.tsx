"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  transport: string;
  sendPrivateMessage: (
    toEmail: string,
    message: string,
    timestamp: string
  ) => void;
  sendUserNotification: (toEmail: string, message: string) => void;
}

interface SocketProviderProps {
  email: string;
  children: ReactNode; // Add this line to type the children prop
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({
  email,
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance: Socket = io("http://localhost:5000", {
      transports: ["polling", "websocket"],
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
    });

    setSocket(socketInstance);

    function onConnect() {
      setIsConnected(true);
      socketInstance.emit("register", email);
      setTransport(socketInstance.io.engine.transport.name);
    }

    function onDisconnect(reason: string) {
      console.error(`Socket disconnected: ${reason}`);
      setIsConnected(false);
      setTransport("N/A");
    }

    function onError(error: any) {
      console.error("Socket Error:", error);
    }

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);
    socketInstance.on("error", onError);
    socketInstance.on("connect_error", onError);
    socketInstance.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnect attempt ${attempt}`);
    });
    socketInstance.on("reconnect_failed", () => {
      console.error("Reconnection failed");
    });
    socketInstance.on("reconnect_error", (error) => {
      console.error("Reconnection error:", error);
    });

    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
      socketInstance.off("error", onError);
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

  const sendUserNotification = (toEmail: string, message: string) => {
    if (socket) {
      socket.emit("messageNotification", { toEmail, message });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        transport,
        sendPrivateMessage,
        sendUserNotification,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
