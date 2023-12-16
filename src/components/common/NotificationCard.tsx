import { NotificationType } from "@/types/notification";

type NotificationCardProps = {
  notification: NotificationType;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  return <div>{notification.relatedDocType}</div>;
};

export default NotificationCard;
