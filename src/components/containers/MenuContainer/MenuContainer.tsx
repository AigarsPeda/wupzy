import Drawer from "components/elements/Drawer/Drawer";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";

import { TiThMenu } from "react-icons/ti";
import useRedirect from "../../../hooks/useRedirect";
import { api } from "../../../utils/api";
import removeCookieByName from "../../../utils/removeCookieByName";
import Button from "../../elements/Button/Button";

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
          btnContent={<TiThMenu className="h-6 w-6" />}
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
      <h1>Haaaa</h1>
      <h1>Haaaa</h1>
      <h1>Haaaa</h1>
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
