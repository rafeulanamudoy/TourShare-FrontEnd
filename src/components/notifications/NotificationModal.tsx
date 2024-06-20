import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
import { Notification } from "@/redux/features/notifications/notificationsSlice";

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button onClick={onClose} className="text-red-600 font-bold">
            X
          </button>
        </div>
        <ul className="mt-4">
          {notifications.length === 0 ? (
            <li className="text-gray-600">No notifications</li>
          ) : (
            notifications.map((notification, index) => (
              <li key={index} className="border-b py-2">
                {notification.type ===
                  ENUM_NOTIFICATION_TYPE.PRIVATEMESSAGE && (
                  <>{notification.sender} send you a message</>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
