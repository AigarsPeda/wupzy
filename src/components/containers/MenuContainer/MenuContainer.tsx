import Button from "components/elements/Button/Button";
import Drawer from "components/elements/Drawer/Drawer";
import LogoutButton from "components/elements/LogoutButton/LogoutButton";
import useRedirect from "hooks/useRedirect";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { CgClose } from "react-icons/cg";

const MENU_ITEMS = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Tournaments",
    path: "/tournaments",
  },
];

const MenuContainer: FC = () => {
  const { goBack, getCurrentPath } = useRedirect();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isBackButtonDisabled = () => {
    const path = getCurrentPath();
    // don't show back button on home page and tournaments page
    return path !== "/" && path !== "/tournaments";
  };

  return (
    <Drawer
      drawerSide="left"
      isDrawerOpen={isDrawerOpen}
      handleDropdownClose={() => {
        setIsDrawerOpen(false);
      }}
      drawerBtn={
        <div className="flex">
          <Button
            btnSize="square"
            btnTitle={<TiThMenu className="h-6 w-6" />}
            onClick={() => {
              setIsDrawerOpen((state) => !state);
            }}
          />

          <div className="ml-2 w-6">
            {isBackButtonDisabled() && (
              <Button
                btnSize="square"
                btnColor="outline"
                btnTitle={<IoIosArrowBack className="h-6 w-6" />}
                onClick={goBack}
              />
            )}
          </div>
        </div>
      }
    >
      <div className="flex w-full justify-end">
        <Button
          btnSize="square"
          btnColor="outline"
          btnTitle={<CgClose className="h-6 w-6" />}
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        />
      </div>
      {MENU_ITEMS.map((menuItem, i) => (
        <Link
          href={menuItem.path}
          key={`${menuItem.title}${i}`}
          className="rounded px-4 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200"
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        >
          {menuItem.title}
        </Link>
      ))}
      <LogoutButton />
    </Drawer>
  );
};

export default MenuContainer;
