import ProfileCard from "@/components/common/ProfileCard";
import Loader from "@/components/common/Loader";
import ProfileLayout from "@/layouts/ProfileLayout";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type currentUserProps = {
  currentUser: {
    displayName: string;
    email: string;
    headline?: string;
    id: string;
    location?: string;
  };
};

const Profile: React.FC<currentUserProps> = ({ currentUser }) => {
  console.log(currentUser);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const idToken = await user?.getIdToken();
      if (!idToken) {
        router.push("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <ProfileLayout>
      <ProfileCard currentUser={currentUser} />
    </ProfileLayout>
  );
};

export default Profile;
