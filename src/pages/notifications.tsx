import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import Loader from "@/components/common/Loader";
import HomeLayout from "@/layouts/HomeLayout";
import { auth } from "@/lib/firebase/config";
import { useCurrentUser } from "@/context/UserContext";
import NotificationsComponent from "@/components/NotificationsComponent";

const Notifications = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useCurrentUser();

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

  return loading || !currentUser ? (
    <Loader />
  ) : (
    <HomeLayout>
      <h1>Notifications</h1>
      <NotificationsComponent />
    </HomeLayout>
  );
};

export default Notifications;
