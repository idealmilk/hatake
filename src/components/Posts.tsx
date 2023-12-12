import { useMemo, useState } from "react";

import PostCard from "@/components/common/PostCard";
import { GetPosts } from "@/lib/firebase/firestore";

const Posts = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);

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
};

export default Posts;
