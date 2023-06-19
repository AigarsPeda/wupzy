import { useSession } from "next-auth/react";
import { useState, type FC } from "react";
import { TiThMenu } from "react-icons/ti";
import DrawerLayout from "~/components//layout/DrawerLayout/DrawerLayout";
import AuthenticateUser from "~/components/elements/AuthenticateUser/AuthenticateUser";
import Button from "~/components/elements/Button/Button";
import NavLink from "~/components/elements/NavBar/NavLink";
import { type LinkType } from "~/types/utils.types";
import { IoCloseSharp } from "react-icons/io5";

interface MobileNavProps {
  links: LinkType[];
}

const MobileNav: FC<MobileNavProps> = ({ links }) => {
  const { data: sessionData, status } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <DrawerLayout
      drawerSide="right"
      isDrawerOpen={isDrawerOpen}
      handleDropdownClose={() => {
        setIsDrawerOpen(false);
      }}
      drawerBtn={
        <div className="flex w-full justify-end">
          <Button
            size="sm"
            title={<TiThMenu className="h-6 w-6" />}
            handleClick={() => {
              setIsDrawerOpen((state) => !state);
            }}
          />
        </div>
      }
      header={
        <button
          className="flex h-10 w-10 items-center"
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        >
          <IoCloseSharp className="h-10 w-10 text-gray-900" />
        </button>
      }
    >
      <div className="px-5">
        <NavLink
          isSpaceY
          links={links}
          sessionData={sessionData}
          onLinkClick={() => {
            setIsDrawerOpen(false);
          }}
        />

        <div className="mt-10">
          <AuthenticateUser sessionData={sessionData} status={status} />
        </div>
      </div>
    </DrawerLayout>
  );
};

export default MobileNav;
