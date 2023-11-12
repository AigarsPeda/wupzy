import { signIn, useSession } from "next-auth/react";
import { useState, type FC } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import DrawerLayout from "~/components//layout/DrawerLayout/DrawerLayout";
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
          <button
            className="rounded-md bg-gray-950 p-2"
            onClick={() => {
              setIsDrawerOpen((state) => !state);
            }}
          >
            <SlMenu className="h-6 w-6 text-white" />
          </button>
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
            <Profile userId={sessionData.user.id} />
          ) : (
            <PrimaryButton
              isFullWidth
              color="dark"
              handleClick={() =>
                void signIn(undefined, {
                  callbackUrl: "/tournaments",
                })
              }
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
