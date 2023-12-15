import { useMemo, useState } from "react";

import {
  CreateConnectionRequest,
  CreateNotification,
  GetAllUsers,
} from "@/lib/firebase/firestore";
import { UserType } from "@/types/user";
import { useCurrentUser } from "@/context/UserContext";
import ConnectionCard from "./common/ConnectionCard";

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
          <ConnectionCard
            user={user}
            key={index}
            handleConnectionRequest={handleConnectionRequest}
          />
        );
      })}
    </div>
  );
}
