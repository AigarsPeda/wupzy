import Dropdown from "components/elements/Dropdown/Dropdown";
import EditGroupDropdownItem from "components/elements/EditGroupDropdown/EditGroupDropdownItem";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { HiPlusSm } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

interface EditGroupDropdownProps {
  handleStartAddTeam: () => void;
  handleEditGroupGame: () => void;
}

const EditGroupDropdown: FC<EditGroupDropdownProps> = ({
  handleStartAddTeam,
  handleEditGroupGame,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Dropdown
      dropdownBtn={
        <RoundButton
          btnType="button"
          btnClass="ml-2"
          btnContent={<IoSettingsOutline className="h-4 w-4" />}
          handleClick={() => {
            setIsDropdownOpen((state) => !state);
          }}
        />
      }
      dropdownClass="top-[3rem]"
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={() => {
        setIsDropdownOpen(false);
      }}
    >
      <div>
        <EditGroupDropdownItem
          btnTitle="Add participants"
          handelClick={handleStartAddTeam}
          icon={<HiPlusSm className="h-6 w-6" />}
        />
        <EditGroupDropdownItem
          btnTitle="Edit game order"
          handelClick={handleEditGroupGame}
          icon={<CgArrowsExchangeAltV className="h-6 w-6" />}
        />
      </div>
    </Dropdown>
  );
};

export default EditGroupDropdown;
