"use client";

import { IJoinTeamStatus } from "@/src/types/ICreateTeam";
import { INotificationType } from "@/src/types/INotification";
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
  sendUserNotification: (
    toEmail: string,
    message: string,
    type: INotificationType,
    timestamp: string,
    _id: string
  ) => void;
  sendTeamRequest: (
    toEmail: string,
    message: string,
    type: INotificationType,
    status: IJoinTeamStatus,
    timestamp: string
  ) => void;
  sendJoinTeamRequest: (
    toEmail: string,
    message: string,
    type: INotificationType,
    timestamp: string
  ) => void;
  sendUpdateCreateTeamNotify: (
    toEmails: string[],
    message: string,
    type: INotificationType,
    timestamp: string
  ) => void;
  sendDeleteCreateTeamNotifiy: (
    toEmails: string[],
    message: string,
    type: INotificationType,
    timestamp: string
  ) => void;
}

interface SocketProviderProps {
  email: string;
  children: ReactNode;
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
    const socketInstance: Socket = io(`${process.env.NEXT_PUBLIC_URL}`, {
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

    function onDisconnect(_reason: string) {
      setIsConnected(false);
      setTransport("N/A");
    }

    function onError(_error: any) {}

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);
    socketInstance.on("error", onError);
    socketInstance.on("connect_error", onError);
    socketInstance.on("reconnect_attempt", (_attempt) => {});
    socketInstance.on("reconnect_failed", () => {});
    socketInstance.on("reconnect_error", (_error) => {});

    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
      socketInstance.off("error", onError);
      socketInstance.disconnect();
    };
  }, [email]);

  const sendPrivateMessage = async (
    toEmail: string,
    message: string,
    timestamp: string
  ) => {
    if (socket) {
      socket.emit("privateMessage", { toEmail, message, timestamp });
    }
  };

  const sendUserNotification = async (
    toEmail: string,
    message: string,
    type: INotificationType,
    timestamp: string,
    _id: string
  ) => {
    if (socket) {
      socket.emit("notification", { toEmail, message, timestamp, _id, type });
    }
  };
  const sendTeamRequest = async (
    toEmail: string,
    message: string,
    type: INotificationType,

    status: IJoinTeamStatus,
    timestamp: string
  ) => {
    if (socket) {
      socket.emit("teamRequest", { toEmail, message, status, type, timestamp });
    }
  };
  const sendJoinTeamRequest = async (
    toEmail: string,
    message: string,
    type: INotificationType,
    timestamp: string
  ) => {
    if (socket) {
      socket.emit("JoinTeamRequest", { toEmail, message, type, timestamp });
    }
  };
  const sendUpdateCreateTeamNotify = async (
    toEmails: string[],
    message: string,
    type: INotificationType,
    timestamp: string
  ) => {
    if (socket) {
      socket.emit("updateCreateTeam", {
        toEmails,
        message,
        type,
        timestamp,
      });
    }
  };
  const sendDeleteCreateTeamNotifiy = async (
    toEmails: string[],
    message: string,
    type: INotificationType,
    timestamp: string
  ) => {
    if (socket) {
      socket.emit("deleteCreateTeam", {
        toEmails,
        message,
        type,
        timestamp,
      });
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
        sendTeamRequest,
        sendJoinTeamRequest,
        sendUpdateCreateTeamNotify,
        sendDeleteCreateTeamNotifiy,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
