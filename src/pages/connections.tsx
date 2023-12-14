import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import Loader from "@/components/common/Loader";
import ProfileLayout from "@/layouts/ProfileLayout";
import { auth } from "@/lib/firebase/config";
import { useCurrentUser } from "@/context/UserContext";
import ConnectionsComponent from "@/components/ConnectionsComponent";

const Connections = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useCurrentUser();

  console.log("userIdProfile: ", currentUser?.id);

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
    <ProfileLayout>
      <ConnectionsComponent />
    </ProfileLayout>
  );
};

export default Connections;
