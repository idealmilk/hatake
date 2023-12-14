import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "./config";
import { toast } from "react-toastify";
import { UserType } from "@/types/user";
import { getCurrentTimeStamp } from "@/helpers/useMoment";

let postsRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");
let likesRef = collection(firestore, "likes");
let connectionsRef = collection(firestore, "connections");

export const CreatePost = (data: any) => {
  addDoc(postsRef, data).then(() => {
    try {
      toast.success("Post has been added successfully");
    } catch (err) {
      console.log(err);
    }
  });
};

export const GetPosts = (
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

export const UpdateUser = async (userId: string | undefined, payload: any) => {
  try {
    const userToEdit = doc(usersRef, userId);
    if (userToEdit) {
      await updateDoc(userToEdit, payload);
    } else {
      await addDoc(usersRef, payload);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const GetAllUsers = (setAllUsers: Function) => {
  let currentUserAuthId = auth.currentUser?.uid;

  const usersQuery = query(usersRef, where("authId", "!=", currentUserAuthId));

  onSnapshot(usersQuery, (res) => {
    setAllUsers(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id } as UserType;
      })
    );
  });
};

export const GetCurrentUser = (setCurrentUser: Function) => {
  let currentUserAuthId = auth.currentUser?.uid;

  const userQuery = query(usersRef, where("authId", "==", currentUserAuthId));

  onSnapshot(userQuery, (res) => {
    setCurrentUser(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id } as UserType;
      })[0]
    );
  });
};

export const GetSingleUser = async (
  setSingleUser: Function,
  userId: string | undefined
) => {
  try {
    const docRef = doc(usersRef, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSingleUser(docSnap.data());
    } else {
      console.log("No such document");
      return null;
    }
  } catch (err) {
    console.error("Error fetching single user:", err);
  }
};

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

export const CreateConnectionRequest = (
  userId: string | undefined,
  targetId: string | undefined
) => {
  try {
    let connectionToCreate = doc(connectionsRef, `${userId}_${targetId}`);
    setDoc(connectionToCreate, {
      userId,
      targetId,
      status: "pending",
      requestedTimeStamp: getCurrentTimeStamp(),
    });
  } catch (err) {
    console.log(err);
  }
};

export const GetSingleConnection = (
  userId: string | undefined,
  targetId: string | undefined,
  setConnection: Function
) => {
  try {
    const connectionQuery = query(
      connectionsRef,
      where("userId", "==", userId),
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionQuery, (res) => {
      setConnection(
        res.docs.map((docs) => {
          return { ...docs.data(), id: docs.id } as UserType;
        })[0]
      );
    });
  } catch (err) {
    console.log(err);
  }
};
