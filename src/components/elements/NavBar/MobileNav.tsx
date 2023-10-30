import { signIn, useSession } from "next-auth/react";
import { useState, type FC } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import DrawerLayout from "~/components//layout/DrawerLayout/DrawerLayout";
import Button from "~/components/elements/Button/Button";
import NavLink from "~/components/elements/NavBar/NavLink";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import Profile from "~/components/elements/Profile/Profile";
import { type LinkType } from "~/types/utils.types";

interface MobileNavProps {
  links: LinkType[];
}

const MobileNav: FC<MobileNavProps> = ({ links }) => {
  const { data: sessionData } = useSession();
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
          <div className="w-20">
            <Button
              size="sm"
              title={<TiThMenu className="h-6 w-6" />}
              handleClick={() => {
                setIsDrawerOpen((state) => !state);
              }}
            />
          </div>
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

        <div className="mt-10 space-y-3">
          {sessionData ? (
            <Profile />
          ) : (
            <PrimaryButton
              isFullWidth
              color="dark"
              handleClick={() => void signIn()}
            >
              Sign in
            </PrimaryButton>
          )}
        </div>
      </div>
    </DrawerLayout>
  );
};

export default MobileNav;
