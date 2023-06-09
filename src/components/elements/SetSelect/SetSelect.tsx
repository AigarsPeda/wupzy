import { useState, type FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import classNames from "~/utils/classNames";

const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface SetSelectProps {
  selectedSetCount: number;
  handleSetSelect: (setCount: number) => void;
}

const SetSelect: FC<SetSelectProps> = ({
  handleSetSelect,
  selectedSetCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  return (
    <Dropdown
      dropdownClass="top-[2.8rem]"
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={handleDropdownClose}
      dropdownBtn={
        <button
          type="button"
          onClick={updateState}
          className="flex w-full justify-between rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <span className="block truncate">{selectedSetCount}</span>
          <IoIosArrowDown
            className={classNames(
              isDropdownOpen ? "-rotate-180" : "-rotate-0",
              "ml-3 h-6 w-6 transform-gpu text-gray-900 transition-all duration-300 ease-in-out"
            )}
          />
        </button>
      }
    >
      {OPTIONS.map((option, i) => {
        return (
          <button
            key={`${option}${i}`}
            className={classNames(
              "block w-full cursor-pointer px-2 py-1.5 text-left text-sm text-gray-900 transition-all duration-150 hover:bg-gray-100",
              option === selectedSetCount && "bg-gray-100"
            )}
            onClick={() => {
              handleSetSelect(option);
              handleDropdownClose();
            }}
          >
            {option}
          </button>
        );
      })}
    </Dropdown>
  );
};

export default SetSelect;
