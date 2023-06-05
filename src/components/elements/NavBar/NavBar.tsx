import type { FC } from "react";
import AuthenticateUser from "~/components/elements/AuthenticateUser/AuthenticateUser";
import Logo from "~/components/elements/Logo/Logo";

const NavBar: FC = () => {
  return (
    <>
      <nav className="relative z-20 flex items-center justify-between bg-slate-50 px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
        <Logo />
        {/* <AuthenticateUser /> */}
      </nav>
    </>
  );
};

export default NavBar;
