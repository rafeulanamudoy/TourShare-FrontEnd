import { useEffect, useState } from "react";
import { ENUM_NOTIFICATION_STATUS } from "@/src/enums/notification";
import { INotification } from "@/src/types/INotification";
export default function UseCombinedNotifications(
  instantNotifications: INotification[],
  fetchedNotifications: INotification[]
) {
  const [combinedAllNotifications, setCombinedAllNotifications] = useState<
    INotification[]
  >([]);
  const [combinedUnseenNotifications, setCombinedUnseenNotifications] =
    useState<INotification[]>([]);

  useEffect(() => {
    const removeDuplicates = (notifications: INotification[]) => {
      const uniqueNotifications: { [key: string]: INotification } = {};
      notifications.forEach((notification) => {
        uniqueNotifications[notification._id] = notification;
      });
      return Object.values(uniqueNotifications);
    };

    const sortByTimestampDesc = (notifications: INotification[]) =>
      notifications.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const allNotifications = removeDuplicates([
      ...instantNotifications,
      ...fetchedNotifications,
    ]);
    const unseenNotifications = allNotifications.filter(
      (n) => n.status === ENUM_NOTIFICATION_STATUS.UNSEEN
    );

    setCombinedAllNotifications(sortByTimestampDesc(allNotifications));
    setCombinedUnseenNotifications(sortByTimestampDesc(unseenNotifications));
  }, [instantNotifications, fetchedNotifications]);

  return {
    combinedAllNotifications,
    combinedUnseenNotifications,
  };
}
