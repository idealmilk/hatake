import { useMemo, useState } from "react";

import PostCard from "@/components/common/PostCard";
import { GetAllPosts } from "@/lib/firebase/firestore/Posts";

type PostProps = {
  userId?: string | undefined;
};

const Posts: React.FC<PostProps> = ({ userId }) => {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  useMemo(() => {
    GetAllPosts(setAllPosts, userId);
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
