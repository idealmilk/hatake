import { NotificationType } from "@/types/notification";
import NotificationCard from "./common/Notifications/ConnectionRequestNotification";
import { useNotifications } from "@/context/NotificationsContext";
import ConnectionRequestNotification from "./common/Notifications/ConnectionRequestNotification";

const NotificationsComponents = () => {
  const { notifications } = useNotifications();

  return (
    <div>
      {notifications?.map((notification: NotificationType, index) => {
        if (notification.relatedDocType === "connectionRequest") {
          return (
            <ConnectionRequestNotification
              key={index}
              notification={notification}
            />
          );
        }
      })}
    </div>
  );
};

export default NotificationsComponents;
