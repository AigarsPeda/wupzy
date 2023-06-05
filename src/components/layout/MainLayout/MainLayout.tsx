import type { FC, ReactNode } from "react";
import NavBar from "~/components/elements/NavBar/NavBar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  // const router = useRouter();

  // const isIndexPage = () => router.pathname === "/";

  return (
    <div className="max-w-screen-1xl min-h-screen">
      <NavBar />
      <div className="bg-very-light-gray px-4 py-10 md:px-20 md:py-10">
        {children}
      </div>

      {/* {isIndexPage() && <Footer />} */}
    </div>
  );
};

export default MainLayout;
