import React, { useEffect, useState } from "react";
import {
  GetConnectionById,
  UpdateConnection,
} from "@/lib/firebase/firestore/Connections";
import { ConnectionType } from "@/types/connection";
import { NotificationType } from "@/types/notification";
import ConnectionResponse from "../ConnectionResponse";
import Loader from "../Loader";
import { UserType } from "@/types/user";
import { GetUserById } from "@/lib/firebase/firestore/Users";

type NotificationCardProps = {
  notification: NotificationType;
};

const ConnectionRequestNotification: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const [connection, setConnection] = useState<ConnectionType | null>(null);
  const [requester, setRequester] = useState<UserType | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    GetConnectionById(notification.relatedDocId, setConnection);
  }, [notification.relatedDocId, updateTrigger]);

  useEffect(() => {
    if (connection) {
      GetUserById(connection.userId, setRequester);
    }
  }, [connection]);

  const handleConnectionResponse = (status: string) => {
    UpdateConnection(notification.relatedDocId, { status: status }).then(() => {
      setUpdateTrigger((prev) => prev + 1);
    });
  };

  if (!connection) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex flex-col border-b py-2 mx-2 h-28 justify-center">
        <div className="flex justify-between">
          <div className="flex">
            <div
              className={`h-20 w-20 rounded-full cursor-pointer mr-4 ${
                requester?.displayPhoto ? "bg-cover bg-center" : "bg-green"
              }`}
              style={{
                backgroundImage: requester?.displayPhoto
                  ? `url(${requester?.displayPhoto})`
                  : "none",
              }}
            />
            <div className="flex flex-col justify-center">
              <p>
                <span className="font-semibold">{requester?.displayName}</span>{" "}
                invited you to connect.
              </p>
            </div>
          </div>

          {connection && connection.status === "pending" && (
            <ConnectionResponse
              handleConnectionResponse={handleConnectionResponse}
            />
          )}

          {connection && connection.status === "accepted" && (
            <button>Message</button>
          )}

          {connection && connection.status === "ignored" && (
            <button>Ignored</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequestNotification;
