import { FIELD_OPTIONS } from "hardcoded";
import { useState, type FC } from "react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import { type KeyNewPlayerType } from "~/types/tournament.types";
import classNames from "~/utils/classNames";

interface FieldsDropdownProps {
  objectKeys: string[];
  handleOptionClick: (option: KeyNewPlayerType) => void;
}

const FieldsDropdown: FC<FieldsDropdownProps> = ({
  objectKeys,
  handleOptionClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = FIELD_OPTIONS.filter(
    (option) => !objectKeys.includes(option.label),
  );

  return (
    <>
      <Dropdown
        top="5.1"
        width="auto"
        isDropdownOpen={isDropdownOpen}
        dropdownBtn={
          <button
            type="button"
            disabled={filteredOptions.length === 0}
            onClick={() => {
              setIsDropdownOpen((state) => !state);
            }}
            className={classNames(
              filteredOptions.length === 0
                ? "cursor-not-allowed"
                : "hover:bg-gray-200",
              "ml-2 mt-8 flex h-[2.5rem] items-center justify-between rounded-md bg-gray-100 px-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800",
            )}
          >
            <HiOutlineViewGridAdd className="h-6 w-6" />
          </button>
        }
        handleDropdownClose={() => {
          setIsDropdownOpen(false);
        }}
      >
        <div className="relative z-[999] w-40">
          {filteredOptions.map((option) => {
            const isLast =
              filteredOptions.indexOf(option) === filteredOptions.length - 1;

            return (
              <div
                key={option.label}
                className={classNames(
                  !isLast && "border-b border-gray-200",
                  "w-full",
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    handleOptionClick(option.label);
                    setIsDropdownOpen(false);
                  }}
                  className="h-full w-full px-2 py-1.5 text-left text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
                >
                  {option.label}
                </button>
              </div>
            );
          })}
        </div>
      </Dropdown>
    </>
  );
};

export default FieldsDropdown;
