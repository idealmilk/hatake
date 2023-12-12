import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "./config";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { UserType } from "@/types/user";

let postsRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");

export const CreatePost = (data: any) => {
  console.log("data: ", data);
  addDoc(postsRef, data).then(() => {
    try {
      toast.success("Post has been added successfully");
    } catch (err) {
      console.log(err);
    }
  });
};

export const GetPosts = (setAllPosts: Function) => {
  onSnapshot(postsRef, (res) => {
    setAllPosts(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const UpdateUser = async (userId: string, payload: any) => {
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

export const GetCurrentUser = (setCurrentUser: Function) => {
  let currentUserAuthId = auth.currentUser?.uid;

  console.log(auth.currentUser);

  onSnapshot(usersRef, (res) => {
    setCurrentUser(
      res.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id } as UserType;
        })
        .filter((item) => {
          return item.authId === currentUserAuthId;
        })[0]
    );
  });
};

// export const FetchCurrentUser = async () => {
//   const currentUserAuthId = auth.currentUser?.uid;

//   if (currentUserAuthId) {
//     const q = query(usersRef, where("authId", "==", currentUserAuthId));

//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       console.log("No matching documents.");
//       return null;
//     }

//     const userDoc = querySnapshot.docs[0];
//     return userDoc.data();
//   }
// };

export const GetSingleUser = (setSingleUser: Function, userId: string) => {
  onSnapshot(usersRef, (res) => {
    setSingleUser(
      res.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id } as UserType;
        })
        .filter((item) => {
          return item.id === userId;
        })[0]
    );
  });
};
