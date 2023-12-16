import { UserType } from "@/types/user";
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { firestore, auth } from "../config";

let usersRef = collection(firestore, "users");

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

export const GetUserById = async (
  userId: string | undefined,
  setSingleUser: Function
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
