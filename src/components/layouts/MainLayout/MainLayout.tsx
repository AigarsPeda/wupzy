import NavBar from "components/elements/NavBar/NavBar";
import dynamic from "next/dynamic";
import type { FC, ReactNode } from "react";
import Footer from "../../elements/Footer/Footer";
import { useRouter } from "next/router";

const SubscriptionEndModal = dynamic(
  () => import("components/elements/SubscriptionEndModal/SubscriptionEndModal")
);

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();

  const isIndexPage = () => router.pathname === "/";

  return (
    <div className="max-w-screen-1xl min-h-screen">
      <NavBar />
      <div className="bg-very-light-gray px-4 py-4 md:px-20 md:py-6">
        {children}
      </div>
      <SubscriptionEndModal />

      {isIndexPage() && <Footer />}
    </div>
  );
};

export default MainLayout;
