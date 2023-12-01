import Header from "@/components/common/Header";
import ProfileCard from "@/components/common/ProfileCard";
import { GetCurrentUser } from "@/lib/firebase/firestore";
import { ReactNode, useEffect, useMemo, useState } from "react";

type ProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    GetCurrentUser(setCurrentUser);
  }, []);

  console.log("current user: ", currentUser);

  return (
    <div>
      <Header />
      <ProfileCard currentUser={currentUser} />
    </div>
  );
};

export default ProfileLayout;
