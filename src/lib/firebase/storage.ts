import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "./config";
import { UpdateUser } from "./firestore/Users";

export const UploadImage = (
  file: any,
  folder: string,
  userId: string | undefined,
  setModalOpen: Function,
  setCurrentImage: Function,
  setUploadProgress: Function
) => {
  const displayPicsRef = ref(storage, `${folder}/${file.name}`);
  const uploadTask = uploadBytesResumable(displayPicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setUploadProgress(progress);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        if (folder === "displayPhoto") {
          UpdateUser(userId, { displayPhoto: res });
        } else if (folder === "coverPhoto") {
          UpdateUser(userId, { coverPhoto: res });
        }
        setModalOpen(false);
        setCurrentImage({});
        setUploadProgress(0);
      });
    }
  );
};
