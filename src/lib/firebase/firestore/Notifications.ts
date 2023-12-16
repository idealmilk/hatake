import {
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
  collection,
} from "firebase/firestore";

import { getCurrentTimeStamp } from "@/helpers/useMoment";
import { NotificationType } from "@/types/notification";

import { firestore } from "../config";

let notificationsRef = collection(firestore, "notifications");

export const CreateNotification = (
  userId: string | undefined,
  relatedDocType: string | undefined,
  relatedDocId: string | undefined
) => {
  try {
    let notificationToCreate = doc(
      notificationsRef,
      `${userId}_${relatedDocId}`
    );
    setDoc(notificationToCreate, {
      userId,
      relatedDocType,
      relatedDocId,
      seen: false,
      timeStamp: getCurrentTimeStamp(),
    });
  } catch (err) {
    console.log(err);
  }
};

export const GetNotificationsByUser = (
  userId: string | undefined,
  setNotifications: Function
) => {
  try {
    const notificationsQuery = query(
      notificationsRef,
      where("userId", "==", userId)
    );

    onSnapshot(notificationsQuery, (res) => {
      const notifications = res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id } as NotificationType;
      });

      setNotifications(notifications);
    });
  } catch (err) {}
};
