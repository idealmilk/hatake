import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { GetPosts } from "@/lib/firebase/firestore";
import PostCard from "@/components/common/PostCard";

export default function Posts() {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const idToken = await user?.getIdToken();
    });
  }, []);

  useMemo(() => {
    GetPosts(setAllPosts);
  }, []);

  return (
    <div>
      {allPosts.map((post, index) => {
        return <PostCard {...post} key={index} />;
      })}
    </div>
  );
}
