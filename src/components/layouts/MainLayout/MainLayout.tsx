import NavBar from "components/elements/NavBar/NavBar";
import type { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-screen-1xl min-h-screen">
      <NavBar />
      <div className="bg-very-light-gray py-4 px-4 md:py-12 md:px-20">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
