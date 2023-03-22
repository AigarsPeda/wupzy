import Button from "components/elements/Button/Button";
import Dropdown from "components/elements/Dropdown/Dropdown";
import ListButton from "components/elements/ListButton/ListButton";
import { AVAILABLE_GROUPS } from "hardcoded";
import type { FC } from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "utils/classNames";
import useWindowSize from "hooks/useWindowSize";
import { HiPlusSm } from "react-icons/hi";

interface GroupDropdownProps {
  alreadyCreatedGroups: string[];
  handleGroupClick: (group: string) => void;
}

const GroupDropdown: FC<GroupDropdownProps> = ({
  alreadyCreatedGroups,
  handleGroupClick,
}) => {
  const { windowSize } = useWindowSize();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  const availableGroups = (createdGroups: string[]) => {
    return AVAILABLE_GROUPS.filter((group) => !createdGroups.includes(group));
  };

  return (
    <Dropdown
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={handleDropdownClose}
      dropdownBtn={
        <Button
          btnTitle={
            windowSize.width < 400 ? (
              <HiPlusSm className="h-5 w-5" />
            ) : (
              "Add new group"
            )
          }
          onClick={updateState}
          icon={
            <IoIosArrowDown
              className={classNames(
                isDropdownOpen ? "-rotate-180" : "-rotate-0",
                "ml-3 h-6 w-6 transform-gpu text-white transition-all duration-300 ease-in-out"
              )}
            />
          }
        />
      }
    >
      <ul>
        {availableGroups(alreadyCreatedGroups).map((group, i) => (
          <li key={`${group}${i}`} className="border-b-2 border-gray-100">
            <ListButton
              btnTitle={group}
              handleClick={() => {
                handleDropdownClose();
                handleGroupClick(group);
              }}
            />
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default GroupDropdown;
