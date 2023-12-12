import { useMemo, useState } from "react";

import PostCard from "@/components/common/PostCard";
import { GetPosts } from "@/lib/firebase/firestore";

type PostProps = {
  userId: string | undefined;
};

const Posts: React.FC<PostProps> = ({ userId }) => {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  console.log("Posts: ", userId);

  useMemo(() => {
    GetPosts(setAllPosts, userId);
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
