import NavBar from "components/elements/NavBar/NavBar";
import dynamic from "next/dynamic";
import type { FC, ReactNode } from "react";

const SubscriptionEndModal = dynamic(
  () => import("components/elements/SubscriptionEndModal/SubscriptionEndModal")
);

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-screen-1xl min-h-screen">
      <NavBar />
      <div className="bg-very-light-gray px-4 py-4 md:px-20 md:py-6">
        {children}
      </div>
      <SubscriptionEndModal />
    </div>
  );
};

export default MainLayout;
