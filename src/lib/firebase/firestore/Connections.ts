import { getCurrentTimeStamp } from "@/helpers/useMoment";
import { UserType } from "@/types/user";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../config";
import { CreateNotification } from "./Notifications";

let connectionsRef = collection(firestore, "connections");

export const CreateConnection = async (
  userId: string | undefined,
  targetId: string | undefined
) => {
  try {
    if (!userId || !targetId) {
      throw new Error("User ID and Target ID are required");
    }

    // Check for existing connection in both directions
    const query1 = query(
      connectionsRef,
      where("userId", "==", userId),
      where("targetId", "==", targetId)
    );
    const query2 = query(
      connectionsRef,
      where("userId", "==", targetId),
      where("targetId", "==", userId)
    );

    const existingConnection = (await getDocs(query1)).docs.concat(
      (await getDocs(query2)).docs
    );

    if (existingConnection.length === 0) {
      // No existing connection, create a new one
      const connectionId = `${userId}_${targetId}`;
      let connectionToCreate = doc(connectionsRef, connectionId);

      await setDoc(connectionToCreate, {
        userId,
        targetId,
        status: "pending",
        requestedTimeStamp: getCurrentTimeStamp(),
      });

      await CreateNotification(targetId, "connectionRequest", connectionId);
    } else {
      // Existing connection found, update its status to "pending"
      const connectionId = existingConnection[0].id;
      await UpdateConnection(connectionId, { status: "pending" });
    }
  } catch (err) {
    console.error(err);
  }
};

export const GetConnection = (
  userId: string | undefined,
  targetId: string | undefined,
  setConnection: Function
) => {
  try {
    if (!userId || !targetId) {
      throw new Error("User ID and Target ID are required");
    }

    const query1 = query(
      connectionsRef,
      where("userId", "==", userId),
      where("targetId", "==", targetId)
    );

    const query2 = query(
      connectionsRef,
      where("userId", "==", targetId),
      where("targetId", "==", userId)
    );

    const processQueryResults = (res: any) => {
      const connections = res.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id } as UserType;
      });
      if (connections.length > 0) {
        setConnection(connections[0]);
      }
    };

    onSnapshot(query1, processQueryResults);
    onSnapshot(query2, processQueryResults);
  } catch (err) {
    console.log(err);
  }
};

export const UpdateConnection = async (
  connectionId: string | undefined,
  payload: any
) => {
  try {
    const connectionToEdit = doc(connectionsRef, connectionId);

    await updateDoc(connectionToEdit, payload);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
