import MenuContainer from "components/containers/MenuContainer/MenuContainer";
import NewGameContainer from "components/containers/NewGameContainer/NewGameContainer";
import Link from "next/link";
import type { FC } from "react";

const NavBar: FC = () => {
  return (
    <nav className="mb-0.5 flex h-20 items-center justify-between bg-white py-4 px-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:py-12 md:px-20">
      <MenuContainer />
      <Link href="/" className="font-koulen text-5xl font-bold tracking-wider">
        Game Tracker
      </Link>
      <NewGameContainer />
    </nav>
  );
};

export default NavBar;
