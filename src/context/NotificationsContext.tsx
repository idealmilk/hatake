import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
} from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/config"; // Import your Firebase auth configuration
import { NotificationType } from "@/types/notification";
import { GetNotificationsByUser } from "@/lib/firebase/firestore/Notifications";
import { useCurrentUser } from "./UserContext";

interface NotificationsContextType {
  notifications: NotificationType[] | [];
  setNotifications: React.Dispatch<SetStateAction<NotificationType[]>>;
}

const NotificationsContext = createContext<NotificationsContextType | null>(
  null
);

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { currentUser, setCurrentUser } = useCurrentUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        GetNotificationsByUser(currentUser?.id, setNotifications);
      } else {
        setNotifications([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};
