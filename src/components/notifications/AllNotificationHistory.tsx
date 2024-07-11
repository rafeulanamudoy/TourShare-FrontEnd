import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
import { INotification } from "@/types/INotification";
import { formatTimeDifference } from "@/utilities/TimeFormat";
import React from "react";
interface NotificationHistoryProps {
  notifications: INotification[];
  onNotificationClick: (
    notificationId: string,
    type: string,
    sender: string
  ) => void;
}
export default function AllNotificationHistory({
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
            <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
              {notification.sender} send you a message
            </span>
          )}
          {notification.type ===
            ENUM_NOTIFICATION_TYPE.JOINTEAMSTATUSUPDATE && (
            <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
              {notification.message}
            </span>
          )}
          {notification.type ===
            ENUM_NOTIFICATION_TYPE.JOINTEAMREQUESTSTATUS && (
            <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
              {notification.message}
            </span>
          )}
          {notification.type === ENUM_NOTIFICATION_TYPE.UPDATECREATETEAM && (
            <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
              {notification.message}
            </span>
          )}
          {notification.type === ENUM_NOTIFICATION_TYPE.DELETECREATETEAM && (
            <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
              {notification.message}
            </span>
          )}

          <span className="2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px] text-blue-700">
            {formatTimeDifference(notification.createdAt)}
          </span>
        </div>
      ))}
    </div>
  );
}
