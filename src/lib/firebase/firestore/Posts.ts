import {
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { firestore } from "../config";

let postsRef = collection(firestore, "posts");

export const CreatePost = (data: any) => {
  addDoc(postsRef, data).then(() => {
    try {
      toast.success("Post has been added successfully");
    } catch (err) {
      console.log(err);
    }
  });
};

export const GetAllPosts = (
  setAllPosts: Function,
  userId?: string | undefined
) => {
  let postsQuery;

  if (userId) {
    postsQuery = query(
      postsRef,
      where("userId", "==", userId),
      orderBy("timeStamp", "desc")
    );
  } else {
    postsQuery = query(postsRef, orderBy("timeStamp", "desc"));
  }

  onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setAllPosts(posts);
  });
};
