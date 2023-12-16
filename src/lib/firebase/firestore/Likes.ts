import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./../config";

let likesRef = collection(firestore, "likes");

export const LikePost = (
  userId: string | undefined,
  postId: string,
  isLiked: boolean
) => {
  try {
    let docToLike = doc(likesRef, `${userId}_${postId}`);
    if (isLiked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const GetLikesByUser = (
  userId: string | undefined,
  postId: string,
  setLikesCount: Function,
  setIsLiked: Function
) => {
  try {
    const likeQuery = query(likesRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (res) => {
      const likes = res.docs.map((doc) => doc.data());
      const likesCount = likes.length;
      setLikesCount(likesCount);

      const isLiked = likes.some((like) => like.userId === userId);
      setIsLiked(isLiked);
    });
  } catch (err) {}
};
