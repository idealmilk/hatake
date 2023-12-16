import { useMemo, useState } from "react";

import { useCurrentUser } from "@/context/UserContext";
import { ConnectionType } from "@/types/connection";
import { UserType } from "@/types/user";
import {
  GetConnection,
  UpdateConnection,
} from "@/lib/firebase/firestore/Connections";

import ConnectionResponse from "./ConnectionResponse";

type ConnectionCardProps = {
  user: UserType;
  handleConnectionRequest: any;
};

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  user,
  handleConnectionRequest,
}) => {
  const [connection, setConnection] = useState<ConnectionType | null>(null);
  const { currentUser, setCurrentUser } = useCurrentUser();

  useMemo(() => {
    GetConnection(currentUser?.id, user.id, setConnection);
  }, []);

  const handleConnectionResponse = (status: string) => {
    UpdateConnection(connection?.id, { status: status });
  };

  return (
    <div>
      <div className="flex flex-col border-b py-2 mx-2 h-28 justify-center">
        <div className="flex justify-between">
          <div className="flex">
            <div
              className={`h-20 w-20 rounded-full cursor-pointer mr-4 ${
                user.displayPhoto ? "bg-cover bg-center" : "bg-green"
              }`}
              style={{
                backgroundImage: user.displayPhoto
                  ? `url(${user.displayPhoto})`
                  : "none",
              }}
            />
            <div className="flex flex-col justify-center">
              {user.displayName && (
                <p className="font-semibold">{user.displayName}</p>
              )}
              {user.location && <p>{user.location}</p>}
            </div>
          </div>

          {connection &&
            connection.status === "pending" &&
            connection.userId === currentUser?.id && <button>Requested</button>}

          {connection && connection.status === "accepted" && (
            <button>Message</button>
          )}

          {connection &&
            connection.status === "pending" &&
            connection.userId != currentUser?.id && (
              <ConnectionResponse
                handleConnectionResponse={handleConnectionResponse}
              />
            )}

          {(!connection || connection.status === "ignored") && (
            <button onClick={() => handleConnectionRequest(user.id)}>
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
