import Posts from "@/components/Posts";
import ProfileCard from "@/components/common/ProfileCard";
import Loader from "@/components/common/Loader";
import PostForm from "@/components/common/PostForm";
import HomeLayout from "@/layouts/HomeLayout";
import ProfileLayout from "@/layouts/ProfileLayout";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Profile() {
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
      <ProfileCard />
    </ProfileLayout>
  );
}
