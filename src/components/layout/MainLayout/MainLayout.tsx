import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, type FC, type ReactNode } from "react";
import NavBar from "~/components/elements/NavBar/NavBar";
import Spinner from "~/components/elements/Spinner/Spinner";
import useRedirect from "~/hooks/useRedirect";
import isPrivatePage from "~/utils/isPrivatePage";
import LoginModal from "../../elements/LoginModal/LoginModal";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  const { redirectToPath } = useRedirect();

  const isIndexPage = () => router.pathname === "/";

  // useEffect(() => {
  //   if (status === "unauthenticated" && isPrivatePage(router.pathname)) {
  //     // redirectToPath("/");
  //   }
  // }, [redirectToPath, router.pathname, status]);

  return (
    <div className="max-w-screen-1xl min-h-screen bg-gray-50">
      <NavBar />
      <div className="px-4 py-4 md:px-12 md:py-4">
        {!isIndexPage() && status === "loading" ? (
          <Spinner size="small" />
        ) : (
          children
        )}
        {status === "unauthenticated" && isPrivatePage(router.pathname) && (
          <LoginModal />
        )}
      </div>

      {/* {isIndexPage() && <Footer />} */}
    </div>
  );
};

export default MainLayout;
