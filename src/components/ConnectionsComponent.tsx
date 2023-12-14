import { useMemo, useState } from "react";

import { CreateConnectionRequest, GetAllUsers } from "@/lib/firebase/firestore";
import { UserType } from "@/types/user";
import { useCurrentUser } from "@/context/UserContext";

export default function ConnectionsComponent() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    GetAllUsers(setAllUsers);
  }, []);

  const handleConnectionRequest = (targetId: string) => {
    CreateConnectionRequest(currentUser?.id, targetId);
  };

  return (
    <div>
      <h1>Connections</h1>
      {allUsers.map((user: UserType, index) => {
        return (
          <div
            key={index}
            className="flex flex-col border-b py-2 mx-2 h-28 justify-center"
          >
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

              <button onClick={() => handleConnectionRequest(user.id)}>
                Connect
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
