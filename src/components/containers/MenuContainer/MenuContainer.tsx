import Button from "components/elements/Button/Button";
import Drawer from "components/elements/Drawer/Drawer";
import RoundButton from "components/elements/RoundButton/RoundButton";
import useRedirect from "hooks/useRedirect";
import type { FC } from "react";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { api } from "utils/api";
import removeCookieByName from "utils/removeCookieByName";

const MenuContainer: FC = () => {
  const { redirectToPath } = useRedirect();
  const { mutate } = api.users.logoutUser.useMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer
      drawerSide="left"
      drawerBtn={
        <RoundButton
          bgColor="gray"
          btnType="button"
          btnContent={<TiThMenu className="h-6 w-10" />}
          handleClick={() => {
            setIsDrawerOpen((state) => !state);
          }}
        />
      }
      isDrawerOpen={isDrawerOpen}
      handleDropdownClose={() => {
        setIsDrawerOpen(false);
      }}
    >
      <h1>Firs Item</h1>
      <h1>Second Item</h1>
      <h1>Third Item</h1>
      <Button
        type="button"
        btnSize="full"
        btnTitle="Log out"
        onClick={() => {
          mutate();
          removeCookieByName("token");
          redirectToPath("/login", true);
        }}
      />
    </Drawer>
  );
};

export default MenuContainer;
