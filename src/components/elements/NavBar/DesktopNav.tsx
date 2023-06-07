import { useSession } from "next-auth/react";
import { type FC } from "react";
import AuthenticateUser from "~/components/elements/AuthenticateUser/AuthenticateUser";
import NavLink from "~/components/elements/NavBar/NavLink";
import { type LinkType } from "~/types/utils.types";

interface DesktopNavProps {
  links: LinkType[];
}

const DesktopNav: FC<DesktopNavProps> = ({ links }) => {
  const { data: sessionData, status } = useSession();

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full justify-center">
          <NavLink isFlex links={links} sessionData={sessionData} />
        </div>
        <div>
          <AuthenticateUser sessionData={sessionData} status={status} />
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
