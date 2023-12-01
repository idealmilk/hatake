import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "./config";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

let postsRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");

let user = auth.currentUser;

export const CreatePost = (data: any) => {
  addDoc(postsRef, data).then((res) => {
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

export const UpdateUser = (userId: any, payload: any) => {
  try {
    let userToEdit = doc(usersRef, userId);
    console.log(userToEdit);

    if (userToEdit) {
      console.log("tyring edit");
      updateDoc(userToEdit, payload);
    } else {
      console.log("tyring add");
      addDoc(usersRef, payload);
    }
  } catch (err) {
    console.log(err);
  }
};

export const GetCurrentUser = (setCurrentUser: Function) => {
  let currentUserEmail = auth.currentUser?.email;

  onSnapshot(usersRef, (res) => {
    setCurrentUser(
      res.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === currentUserEmail;
        })[0]
    );
  });
};
