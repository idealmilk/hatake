import { NotificationType } from "@/types/notification";

type NotificationCardProps = {
  notification: NotificationType;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  return (
    <div>
      <p>{notification.relatedDocType}</p>
      <p>{notification.seen.toString()}</p>
    </div>
  );
};

export default NotificationCard;
