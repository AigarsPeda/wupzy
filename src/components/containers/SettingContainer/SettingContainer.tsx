import Dropdown from "components/elements/Dropdown/Dropdown";
import LogoutButton from "components/elements/LogoutButton/LogoutButton";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const SettingContainer: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Dropdown
      dropdownBtn={
        <RoundButton
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
      <div className="px-2 py-3">
        <LogoutButton />
      </div>
    </Dropdown>
  );
};

export default SettingContainer;
