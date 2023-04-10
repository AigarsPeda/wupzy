import Button from "components/elements/Button/Button";
import Dropdown from "components/elements/Dropdown/Dropdown";
import ListButton from "components/elements/ListButton/ListButton";
import type { FC } from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "utils/classNames";

interface PlayoffDropdownProps {
  count: number | null;
  availableLength: number[];
  handleCountClick: (count: number | null) => void;
}

const PlayoffDropdown: FC<PlayoffDropdownProps> = ({
  count,
  availableLength,
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
          btnTitle={
            <span className="flex w-full justify-center">
              {count || "Team count"}
            </span>
          }
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

        {availableLength.map((teamCount, i) => {
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
