import Header from "@/components/common/Header";
import { ReactNode } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
