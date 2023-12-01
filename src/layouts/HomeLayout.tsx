import Header from "@/components/common/Header";
import { ReactNode, useMemo, useState } from "react";
import { GetCurrentUser } from "@/lib/firebase/firestore";

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    GetCurrentUser(setCurrentUser);
  }, []);

  console.log(currentUser);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
