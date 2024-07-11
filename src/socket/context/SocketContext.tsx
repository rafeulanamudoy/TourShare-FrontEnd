"use client";
import { createMessage } from "@/lib/actions/Server/messages";
import { createUserNotification } from "@/lib/actions/Server/notifications";
import { useAppSelector } from "@/redux/hooks";
import { ENUM_JOIN_TEAM_STATUS, IJoinTeamStatus } from "@/types/ICreateTeam";
import { INotificationStatus, INotificationType } from "@/types/INotification";
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
  const user = useAppSelector((state) => state.auth.user);

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

    function onDisconnect(reason: string) {
      setIsConnected(false);
      setTransport("N/A");
    }

    function onError(error: any) {}

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);
    socketInstance.on("error", onError);
    socketInstance.on("connect_error", onError);
    socketInstance.on("reconnect_attempt", (attempt) => {});
    socketInstance.on("reconnect_failed", () => {});
    socketInstance.on("reconnect_error", (error) => {});

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
