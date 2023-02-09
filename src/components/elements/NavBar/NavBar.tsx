import MenuContainer from "components/containers/MenuContainer/MenuContainer";
import NewGameContainer from "components/containers/NewGameContainer/NewGameContainer";
import Logo from "components/elements/Logo/Logo";
import RoundLinkButton from "components/elements/RoundLinkButton/RoundLinkButton";
import { useRouter } from "next/router";
import type { FC } from "react";
import { api } from "utils/api";

// const ROUTES_WITHOUT_NAVBAR = ["/login", "/signup", "/"];

const NavBar: FC = () => {
  const router = useRouter();
  const { data } = api.users.getCurrentUser.useQuery();

  const isIndexPage = () => router.pathname === "/";

  return (
    <nav className="mb-0.5 flex h-20 items-center justify-between bg-white py-4 px-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:py-12 md:px-20">
      {isIndexPage() ? (
        <>
          <Logo />
          {data?.user ? (
            <RoundLinkButton href="/games" linkTitle="Games" />
          ) : (
            <RoundLinkButton href="/login" linkTitle="Login" />
          )}
        </>
      ) : (
        <>
          <MenuContainer />
          <Logo />
          <NewGameContainer />
        </>
      )}
    </nav>
  );
};

export default NavBar;
