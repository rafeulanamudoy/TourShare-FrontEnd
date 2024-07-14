import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { INotification } from "@/src/types/INotification";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { updateNotificationStatus } from "@/src/lib/actions/Server/notifications";
import { clearNotification } from "@/src/redux/features/notifications/notificationsSlice";
import { clearMessage } from "@/src/redux/features/messages/messagesSlice";
import { ENUM_NOTIFICATION_TYPE } from "@/src/enums/notification";
import AllNotificationHistory from "@/src/components/Notifications/AllNotificationHistory";
import UnseenNotificationHistory from "@/src/components/Notifications/UnseenNotificationHistory";
import UseCombinedNotifications from "./UseCombineNotifcations";

interface NotificationModalProps {
  allNotifications: INotification[];

  onClose: () => void;
}

export default function NotificationModal({
  allNotifications,

  onClose,
}: NotificationModalProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showUnseen, setShowUnseen] = useState(false);

  const instantNotifications = useAppSelector(
    (state) => state.notifications.notifications as INotification[]
  );

  const { combinedAllNotifications, combinedUnseenNotifications } =
    UseCombinedNotifications(instantNotifications, allNotifications);

  const handleNotificationClick = async (
    notificationId: string,
    type: string,
    sender: string
  ) => {
    try {
      const result = await updateNotificationStatus(notificationId);
      if (result.success) {
        dispatch(clearNotification());
        dispatch(clearMessage());
      }
    } catch (error) {}
    onClose();
    if (type === ENUM_NOTIFICATION_TYPE.PRIVATEMESSAGE) {
      router.push(`/dashboard/messages/${sender}`);
    } else if (type === ENUM_NOTIFICATION_TYPE.JOINTEAMSTATUSUPDATE) {
      router.push("/dashboard/joinTeam");
    } else if (type === ENUM_NOTIFICATION_TYPE.JOINTEAMREQUESTSTATUS) {
      router.push("/dashboard/team");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-full md:h-4/5 max-h-4/5 overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-red-600 font-bold">
            X
          </button>
        </div>
        <div className="flex justify-between gap-x-3 mt-4 w-full mx-auto">
          <button
            className={`w-1/2 px-2 py-1 2xl:text-xl xl:text-lg lg:text-base text-sm ${
              !showUnseen ? "bg-red-500 text-white" : "bg-gray-300 text-black"
            } rounded-md`}
            onClick={() => setShowUnseen(false)}
          >
            All Notifications
          </button>
          <button
            className={`w-1/2 px-2 py-1  2xl:text-xl xl:text-lg lg:text-base text-sm ${
              showUnseen ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            } rounded-md`}
            onClick={() => setShowUnseen(true)}
          >
            Unseen Notifications
          </button>
        </div>
        <div className="mt-4 max-h-[calc(100%-100px)] overflow-y-auto">
          {!showUnseen ? (
            <AllNotificationHistory
              notifications={combinedAllNotifications}
              onNotificationClick={handleNotificationClick}
            />
          ) : (
            <UnseenNotificationHistory
              notifications={combinedUnseenNotifications}
              onNotificationClick={handleNotificationClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
