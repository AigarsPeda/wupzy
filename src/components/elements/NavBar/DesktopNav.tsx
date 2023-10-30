import { useSession } from "next-auth/react";
import { type FC } from "react";
import NavLink from "~/components/elements/NavBar/NavLink";
import ProfileDropdown from "~/components/elements/ProfileDropdown/ProfileDropdown";
import { type LinkType } from "~/types/utils.types";

interface DesktopNavProps {
  links: LinkType[];
}

const DesktopNav: FC<DesktopNavProps> = ({ links }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="ml-8">
          <NavLink isFlex links={links} sessionData={sessionData} />
        </div>
        <div>
          <ProfileDropdown />
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
