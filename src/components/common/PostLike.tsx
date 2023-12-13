import { useCurrentUser } from "@/context/UserContext";
import { GetLikesByUser, LikePost } from "@/lib/firebase/firestore";
import { useMemo, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

type PostLikeProps = {
  userId: string | undefined;
  postId: string;
};

const PostLike: React.FC<PostLikeProps> = ({ userId, postId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { currentUser } = useCurrentUser();

  console.log("LikesCount: ", likesCount);
  console.log("isLiked: ", isLiked);

  useMemo(() => {
    GetLikesByUser(userId, postId, setLikesCount, setIsLiked);
  }, [userId, postId]);

  const handleLike = () => {
    LikePost(userId, postId, isLiked);
  };

  return (
    <div>
      {currentUser && (
        <div
          className="flex items-center gap-2 px-1 py-2 cursor-pointer"
          onClick={handleLike}
        >
          <AiOutlineLike size={20} />
          <p>{isLiked ? "Unlike" : "Like"}</p>
        </div>
      )}
      <div className="text-gray-500 text-xs flex items-center mt-3">
        <img
          className="mr-0.5"
          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
        />

        <span className="ml-1">{likesCount} • 26 comments</span>
      </div>
    </div>
  );
};

export default PostLike;
