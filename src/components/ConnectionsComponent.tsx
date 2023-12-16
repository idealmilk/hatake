import { useMemo, useState } from "react";

import { UserType } from "@/types/user";
import { useCurrentUser } from "@/context/UserContext";
import ConnectionCard from "./common/ConnectionCard";
import { CreateConnection } from "@/lib/firebase/firestore/Connections";
import { GetAllUsers } from "@/lib/firebase/firestore/Users";

export default function ConnectionsComponent() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    GetAllUsers(setAllUsers);
  }, []);

  const handleConnectionRequest = (targetId: string) => {
    CreateConnection(currentUser?.id, targetId);
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
