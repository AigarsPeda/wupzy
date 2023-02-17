import Button from "components/elements/Button/Button";
import Drawer from "components/elements/Drawer/Drawer";
import useRedirect from "hooks/useRedirect";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { api } from "utils/api";
import removeCookieByName from "utils/removeCookieByName";

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
  const router = useRouter();
  const { mutate } = api.users.logoutUser.useMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { goBack, getCurrentPath, redirectToPath } = useRedirect();

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
      {MENU_ITEMS.map((menuItem, i) => (
        <Button
          btnColor="outline"
          btnTitle={menuItem.title}
          key={`${menuItem.title}${i}`}
          onClick={() => {
            redirectToPath(menuItem.path);
            setIsDrawerOpen(false);
          }}
        />
      ))}
      <Button
        type="button"
        btnSize="full"
        btnTitle="Log out"
        onClick={() => {
          mutate();
          removeCookieByName("token");
          redirectToPath("/login", window.location.pathname);
        }}
      />
    </Drawer>
  );
};

export default MenuContainer;
