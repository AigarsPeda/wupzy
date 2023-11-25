import { useState, type FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import classNames from "~/utils/classNames";

interface SetSelectProps {
  options: number[];
  selectedSetCount: number;
  handleSetSelect: (setCount: number) => void;
}

const SetSelect: FC<SetSelectProps> = ({
  options,
  handleSetSelect,
  selectedSetCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  return (
    <Dropdown
      top="3"
      width="40"
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={handleDropdownClose}
      dropdownBtn={
        <button
          type="button"
          onClick={updateState}
          className="flex w-full justify-between rounded-md border-0 bg-white px-2 py-1.5 text-gray-900 outline-none outline-1 outline-offset-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <span className="block truncate">{selectedSetCount}</span>
          <IoIosArrowDown
            className={classNames(
              isDropdownOpen ? "-rotate-180" : "-rotate-0",
              "ml-3 h-6 w-6 transform-gpu text-gray-900 transition-all duration-300 ease-in-out",
            )}
          />
        </button>
      }
    >
      <div className="rounded">
        {options.map((option, i) => {
          const isLast = options.indexOf(option) === options.length - 1;
          return (
            <button
              key={`${option}${i}`}
              className={classNames(
                !isLast && "border-b border-gray-200",
                "flex w-full justify-between border-0 px-2 py-1.5 text-gray-900 outline-none outline-1 outline-offset-2 ring-1 ring-inset ring-transparent transition-all duration-300 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6",
                option === selectedSetCount && "bg-gray-100",
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
