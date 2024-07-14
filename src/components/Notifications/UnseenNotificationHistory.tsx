import { ENUM_NOTIFICATION_TYPE } from "@/src/enums/notification";
import { INotification } from "@/src/types/INotification";
import { formatTimeDifference } from "@/src/utilities/TimeFormat";
import React from "react";
interface NotificationHistoryProps {
  notifications: INotification[];
  onNotificationClick: (
    notificationId: string,
    type: string,
    sender: string
  ) => void;
}
export default function UnseenNotificationHistory({
  notifications,
  onNotificationClick,
}: NotificationHistoryProps) {
  return (
    <div className="">
      {notifications?.map((notification) => (
        <div
          key={notification._id}
          className={`cursor-pointer`}
          onClick={() =>
            onNotificationClick(
              notification._id,
              notification.type,
              notification.sender
            )
          }
        >
          {notification.type === ENUM_NOTIFICATION_TYPE.PRIVATEMESSAGE && (
            <span className="block  2xl:text-xl xl:text-lg lg:text-base text-sm">
              {notification.sender} send you a message
            </span>
          )}
          {notification.type ===
            ENUM_NOTIFICATION_TYPE.JOINTEAMSTATUSUPDATE && (
            <span className="block  2xl:text-xl xl:text-lg lg:text-base text-sm">
              {notification.message}
            </span>
          )}
          {notification.type ===
            ENUM_NOTIFICATION_TYPE.JOINTEAMREQUESTSTATUS && (
            <span className="block  2xl:text-xl xl:text-lg lg:text-base text-sm">
              {notification.message}
            </span>
          )}
          {notification.type === ENUM_NOTIFICATION_TYPE.UPDATECREATETEAM && (
            <span className="block  2xl:text-xl xl:text-lg lg:text-base text-sm">
              {notification.message}
            </span>
          )}
          {notification.type === ENUM_NOTIFICATION_TYPE.DELETECREATETEAM && (
            <span className="block  2xl:text-xl xl:text-lg lg:text-base text-sm">
              {notification.message}
            </span>
          )}
          <span className=" 2xl:text-xl xl:text-lg lg:text-base text-sm text-blue-700">
            {formatTimeDifference(notification.createdAt)}
          </span>
        </div>
      ))}
    </div>
  );
}
