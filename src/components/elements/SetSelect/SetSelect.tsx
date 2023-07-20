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
      top="3"
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={handleDropdownClose}
      dropdownBtn={
        <button
          type="button"
          onClick={updateState}
          className="flex w-full justify-between rounded-md border-0 px-2 py-1.5 text-gray-900 outline-none outline-1 outline-offset-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
          // className="outline-none ring-2 focus:ring-pink-500"
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
      <div className="m-0.5 space-y-1 rounded">
        {OPTIONS.map((option, i) => {
          return (
            <button
              key={`${option}${i}`}
              className={classNames(
                "flex w-full justify-between rounded-md border-0 px-2 py-1.5 text-gray-900 outline-none outline-1 outline-offset-2 ring-1 ring-inset ring-transparent hover:bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6",
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
      </div>
    </Dropdown>
  );
};

export default SetSelect;
