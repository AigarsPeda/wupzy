import Dropdown from "components/elements/Dropdown/Dropdown";
import RoundButton from "components/elements/RoundButton/RoundButton";
import useRedirect from "hooks/useRedirect";
import type { FC } from "react";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { api } from "utils/api";
import removeCookieByName from "utils/removeCookieByName";
import Button from "../../elements/Button/Button";

const SettingContainer: FC = () => {
  const { redirectToPath } = useRedirect();
  const { mutate } = api.users.logoutUser.useMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Dropdown
      dropdownBtn={
        <RoundButton
          bgColor="gray"
          btnType="button"
          btnClass="ml-2"
          btnContent={<IoSettingsOutline className="h-7 w-7" />}
          handleClick={() => {
            setIsDropdownOpen((state) => !state);
          }}
        />
      }
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={() => {
        setIsDropdownOpen(false);
      }}
    >
      <div className="py-3 px-2">
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
      </div>
    </Dropdown>
  );
};

export default SettingContainer;
