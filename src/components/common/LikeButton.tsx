import { useCurrentUser } from "@/context/UserContext";
import { GetLikesByUser, LikePost } from "@/lib/firebase/firestore";
import { useMemo, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

type LikeButtonProps = {
  userId: string | undefined;
  postId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ userId, postId }) => {
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
          <p>Like</p>
        </div>
      )}
      <p>Likes Count: {likesCount}</p>
      <p>{isLiked ? "Current User Liked" : "Current User Not Liked"}</p>
    </div>
  );
};

export default LikeButton;
