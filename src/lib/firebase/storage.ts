import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "./config";
import { UpdateUser } from "./firestore";

export const UploadImage = (file: any, userId: string | undefined) => {
  const displayPicsRef = ref(storage, `displayPics/${file.name}`);
  const uploadTask = uploadBytesResumable(displayPicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progress);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        UpdateUser(userId, { displayPicURL: res });
      });
    }
  );
};
