import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import Loader from "@/components/common/Loader";
import HomeLayout from "@/layouts/HomeLayout";
import { auth } from "@/lib/firebase/config";
import { useCurrentUser } from "@/context/UserContext";
import NotificationsComponent from "@/components/NotificationsComponent";
import { MarkNotificationsAsSeen } from "@/lib/firebase/firestore/Notifications";

const Notifications = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(!user);
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check if notifications are loaded and set the ref
    if (currentUser) {
      MarkNotificationsAsSeen(currentUser.id);
    }
  }, [currentUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <HomeLayout>
      <h1>Notifications</h1>
      <NotificationsComponent />
    </HomeLayout>
  );
};

export default Notifications;
