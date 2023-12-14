import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import Loader from "@/components/common/Loader";
import ProfileLayout from "@/layouts/ProfileLayout";
import ProfileCard from "@/components/common/ProfileCard";
import { auth } from "@/lib/firebase/config";
import Posts from "@/components/Posts";
import { useCurrentUser } from "@/context/UserContext";

const Profile = () => {
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
      <ProfileCard />

      <Posts userId={currentUser?.id} />
    </ProfileLayout>
  );
};

export default Profile;
