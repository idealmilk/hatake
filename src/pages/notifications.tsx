import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import Loader from "@/components/common/Loader";
import HomeLayout from "@/layouts/HomeLayout";
import { auth } from "@/lib/firebase/config";
import { useCurrentUser } from "@/context/UserContext";
import NotificationsComponent from "@/components/NotificationsComponent";
import { MarkNotificationsAsSeen } from "@/lib/firebase/firestore/Notifications";
import { useNotifications } from "@/context/NotificationsContext";
import { NotificationType } from "@/types/notification";

const Notifications = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { notifications, setNotifications } = useNotifications();

  const originalNotificationsRef = useRef<NotificationType[] | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        router.push("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser && notifications) {
      console.log(notifications);
      originalNotificationsRef.current = notifications;
      MarkNotificationsAsSeen(currentUser?.id);
    }
  }, [currentUser, notifications]);

  const originalNotifications = originalNotificationsRef.current;

  console.log(originalNotifications);

  return loading || !currentUser ? (
    <Loader />
  ) : (
    <HomeLayout>
      <h1>Notifications</h1>
      <NotificationsComponent notifications={originalNotifications} />
    </HomeLayout>
  );
};

export default Notifications;
