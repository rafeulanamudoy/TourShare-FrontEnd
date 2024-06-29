import React, { useState, useEffect } from "react";
import {
  ENUM_NOTIFICATION_TYPE,
  ENUM_NOTIFICATION_STATUS,
} from "@/enums/notification";
import {
  clearNotification,
  markAsRead,
} from "@/redux/features/notifications/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import AllNotificationHistory from "./AllNotificationHistory";
import UnseenNotificationHistory from "./UnseenNotificationHistory";
import { INotification } from "@/types/INotification";
import { updateNotificationStatus } from "@/lib/actions/Server/notifications";
import useCombinedNotifications from "@/hooks/notifications/useCombinedNotification";
import { clearMessage } from "@/redux/features/messages/messagesSlice";

interface NotificationModalProps {
  allNotifications: INotification[];
  unseenNotifications: INotification[];
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  allNotifications,
  unseenNotifications,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [tempAllNotifications, setTempAllNotifications] = useState<
    INotification[]
  >([]);
  const [tempUnseenNotifications, setTempUnseenNotifications] = useState<
    INotification[]
  >([]);
  const [showUnseen, setShowUnseen] = useState(false);

  const instantNotifications = useAppSelector(
    (state) => state.notifications.notifications as INotification[]
  );
  console.log(instantNotifications, "instant notification");

  // const { combinedAllNotifications, combinedUnseenNotifications } =
  //   useCombinedNotifications(instantNotifications, allNotifications);
  const handleNotificationClick = async (
    notificationId: string,
    type: string,
    sender: string
  ) => {
    // dispatch(markAsRead(notificationId));
    try {
      const result = await updateNotificationStatus(notificationId);
      if (result.success) {
        dispatch(clearNotification());
        dispatch(clearMessage());
      }
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
    onClose();
    if (type === ENUM_NOTIFICATION_TYPE.PRIVATEMESSAGE) {
      console.log(notificationId, "check notificationid");
      router.push(`/dashboard/messages/${sender}`);
    } else if (type === ENUM_NOTIFICATION_TYPE.JOINTEAMSTATUSUPDATE) {
      router.push("/dashboard/joinTeam");
    } else if (type === ENUM_NOTIFICATION_TYPE.JOINTEAMWITHDRAWAL) {
      router.push("/dashboard/team");
    }
  };

  return (
    <div className="fixed  inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 h-4/5 max-h-4/5 overflow-y-auto">
        <div className="flex float-right">
          <button onClick={onClose} className="text-red-600 font-bold">
            X
          </button>
        </div>
        <div className="flex justify-between mt-4 w-4/5 mx-auto">
          <button
            className={`flex-1 w-1/2 2xl:text-sm  xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px] font-semibold rounded-md leading-10 mx-1 ${
              !showUnseen ? "bg-red-500" : "bg-gray-300"
            }`}
            onClick={() => setShowUnseen(false)}
          >
            All Notifications
          </button>
          <button
            className={`flex-1 w-1/2 2xl:text-sm  xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]   font-semibold rounded-md leading-10 mx-1 ${
              showUnseen ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setShowUnseen(true)}
          >
            Unseen Notifications
          </button>
        </div>
        <div className="mt-4 max-h-[calc(100%-100px)] overflow-y-auto">
          {!showUnseen ? (
            <AllNotificationHistory
              notifications={allNotifications}
              onNotificationClick={handleNotificationClick}
            />
          ) : (
            <UnseenNotificationHistory
              notifications={unseenNotifications}
              onNotificationClick={handleNotificationClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
