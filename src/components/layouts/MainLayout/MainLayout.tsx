import NavBar from "components/elements/NavBar/NavBar";
import type { FC, ReactNode } from "react";
import { api } from "utils/api";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data } = api.users.getCurrentUser.useQuery();

  return (
    <div className="max-w-screen-1xl min-h-screen">
      {console.log(data)}
      <NavBar />
      <div className="bg-very-light-gray px-4 py-4 md:px-20 md:py-6">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
