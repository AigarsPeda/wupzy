import Dropdown from "components/elements/Dropdown/Dropdown";
import RoundButton from "components/elements/RoundButton/RoundButton";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";
import { useState } from "react";
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
          bgColor="gray"
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
      <div className="py-3 px-2">
        <UnderLineButton
          btnClass="mb-4 w-full"
          lineClassNames="-bottom-2"
          btnTitle={<span className=" text-base">Add new team</span>}
          onClick={handleStartAddTeam}
        />
        <UnderLineButton
          btnClass="w-full"
          lineClassNames="-bottom-2"
          btnTitle={<span className=" text-base">Edit game order</span>}
          onClick={handleEditGroupGame}
        />
      </div>
    </Dropdown>
  );
};

export default EditGroupDropdown;
