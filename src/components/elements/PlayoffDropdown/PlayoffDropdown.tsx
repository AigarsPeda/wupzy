import Button from "components/elements/Button/Button";
import Dropdown from "components/elements/Dropdown/Dropdown";
import ListButton from "components/elements/ListButton/ListButton";
import type { FC } from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "utils/classNames";

const TEAM_COUNT = [2, 4, 8];

interface PlayoffDropdownProps {
  count: number | null;
  handleCountClick: (count: number | null) => void;
}

const PlayoffDropdown: FC<PlayoffDropdownProps> = ({
  count,
  handleCountClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  return (
    <Dropdown
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={handleDropdownClose}
      dropdownBtn={
        <Button
          onClick={updateState}
          btnClass="w-48"
          btnTitle={count || "Select team count"}
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
        {count && (
          <li className="border-b-2 border-gray-100">
            <ListButton
              btnTitle="Remove"
              handleClick={() => {
                handleDropdownClose();
                handleCountClick(null);
              }}
            />
          </li>
        )}

        {TEAM_COUNT.map((teamCount, i) => {
          return (
            <li key={`${teamCount}${i}`} className="border-b-2 border-gray-100">
              <ListButton
                btnTitle={teamCount}
                handleClick={() => {
                  handleDropdownClose();
                  handleCountClick(teamCount);
                }}
              />
            </li>
          );
        })}
      </ul>
    </Dropdown>
  );
};

export default PlayoffDropdown;
