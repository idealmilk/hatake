import { auth, firestore } from "./config";
import {} from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

type Credentials = {
  displayName?: string;
  email: string;
  password: string;
};

let usersRef = collection(firestore, "users");

export const SignInAPI = (credentials: Credentials) => {
  try {
    let res = signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const SignUpAPI = async (credentials: Credentials) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    const user = createdUser.user;

    const data = {
      authId: user.uid,
      email: credentials.email,
      displayName: credentials.displayName,
    };

    await addDoc(usersRef, data);

    return user;
  } catch (error) {
    // Handle errors
    console.error("Error in SignUpAPI:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const GoogleSignInAPI = async () => {
  try {
    let googleAuthProvider = new GoogleAuthProvider();
    const createdUser = await signInWithPopup(auth, googleAuthProvider);

    const user = createdUser.user;

    const q = query(usersRef, where("email", "==", user.email));
    console.log(q);

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const data = {
        authId: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      await addDoc(usersRef, data);
    }
    return createdUser;
  } catch (err) {
    return err;
  }
};

export const SignOutAPI = () => {
  try {
    let res = auth.signOut();
    localStorage.setItem("userEmail", "");
    return res;
  } catch (err) {
    return err;
  }
};
