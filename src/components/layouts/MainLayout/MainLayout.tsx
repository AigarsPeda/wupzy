import type { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

// const ROUTES_WITHOUT_NAVBAR = ["/login", "/signup", "/"];

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  // const router = useRouter();

  // if the current route is in the ROUTES_WITHOUT_NAVBAR array, don't render the navbar
  // if (ROUTES_WITHOUT_NAVBAR.includes(router.pathname)) {
  //   return <>{children}</>;
  // }

  // return (
  //   <div className="max-w-screen-1xl min-h-screen">
  //     <NavBar />
  //     <div className="bg-very-light-gray py-4 px-4 md:py-12 md:px-20">
  //       {children}
  //     </div>
  //   </div>
  // );

  return <div className="max-w-screen-1xl min-h-screen p-2"> {children} </div>;
};

export default MainLayout;
