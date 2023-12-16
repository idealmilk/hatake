import { useMemo, useState } from "react";

import { UserType } from "@/types/user";
import { useCurrentUser } from "@/context/UserContext";
import ConnectionCard from "./common/ConnectionCard";
import { CreateConnection } from "@/lib/firebase/firestore/Connections";
import { GetAllUsers } from "@/lib/firebase/firestore/Users";
import { useNotifications } from "@/context/NotificationsContext";
import { NotificationType } from "@/types/notification";
import NotificationCard from "./common/NotificationCard";

export default function NotificationsComponent() {
  const { currentUser } = useCurrentUser();

  const { notifications, setNotifications } = useNotifications();

  return (
    <div>
      {notifications.map((notification: NotificationType, index) => {
        return <NotificationCard key={index} notification={notification} />;
      })}
    </div>
  );
}
