import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, type ReactNode } from "react";
import LoginModal from "~/components/elements/LoginModal/LoginModal";
import NavBar from "~/components/elements/NavBar/NavBar";
import Spinner from "~/components/elements/Spinner/Spinner";
import isPrivatePage from "~/utils/isPrivatePage";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { status } = useSession();
  const { pathname } = useRouter();

  const isIndexPage = () => pathname === "/";

  const isSpinnerVisible = () => !isIndexPage() && status === "loading";

  const isLoginModalVisible = () =>
    isPrivatePage(pathname) && status === "unauthenticated";

  return (
    <div className="max-w-screen-1xl min-h-screen bg-gray-50">
      <NavBar />
      <div className="px-4 py-4 md:px-12 md:py-4">
        {isSpinnerVisible() ? <Spinner size="small" /> : children}

        {isLoginModalVisible() && <LoginModal />}
      </div>

      {/* {isIndexPage() && <Footer />} */}
    </div>
  );
};

export default MainLayout;
