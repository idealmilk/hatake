import { ReactNode } from "react";

import Header from "@/components/common/Header";

type ProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ProfileLayout;
