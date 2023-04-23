import MenuContainer from "components/containers/MenuContainer/MenuContainer";
import NewTournamentContainer from "components/containers/NewGameContainer/NewGameContainer";
import Logo from "components/elements/Logo/Logo";
import RoundLinkButton from "components/elements/RoundLinkButton/RoundLinkButton";
import { ROUTES_WITHOUT_NAVBAR } from "hardcoded";
import { useRouter } from "next/router";
import type { FC } from "react";
import { api } from "utils/api";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

const NavBar: FC = () => {
  const router = useRouter();
  const { data } = api.users.getCurrentUser.useQuery();

  const isIndexPage = () => router.pathname === "/";

  if (ROUTES_WITHOUT_NAVBAR.includes(router.pathname)) return null;

  return (
    <nav className="px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
      {isIndexPage() ? (
        <div className="mb-0.5 flex items-center justify-between">
          <Logo />
          {data?.user ? (
            <RoundLinkButton href="/tournaments" linkTitle="Tournaments" />
          ) : (
            <RoundLinkButton href="/login" linkTitle="Login" />
          )}
        </div>
      ) : (
        <div className="mb-0.5 flex items-center justify-between">
          <MenuContainer />
          <Logo />
          <div className="flex">
            <NewTournamentContainer />
            <ProfileDropdown />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
