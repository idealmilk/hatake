import HomeLayout from "@/layouts/HomeLayout";
import PostForm from "@/components/common/PostForm";
import Posts from "@/components/Posts";
import Loader from "@/components/common/Loader";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Home = () => {
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
    <HomeLayout>
      <PostForm />
      <Posts />
    </HomeLayout>
  );
};

export default Home;
