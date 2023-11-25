import { FIELD_OPTIONS } from "hardcoded";
import { FC, useState } from "react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import classNames from "~/utils/classNames";

interface FieldsDropdownProps {}

const FieldsDropdown: FC<FieldsDropdownProps> = ({}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <Dropdown
        top="5.1"
        width="auto"
        isDropdownOpen={isDropdownOpen}
        dropdownBtn={
          <button
            type="button"
            onClick={() => {
              setIsDropdownOpen((state) => !state);
            }}
            className="ml-2 mt-8 flex h-[2.5rem] items-center justify-between rounded-md bg-gray-100 px-2 text-sm transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
          >
            {/* Add field */}
            <HiOutlineViewGridAdd className="h-6 w-6" />
          </button>
        }
        handleDropdownClose={() => {
          setIsDropdownOpen(false);
        }}
      >
        <div className="w-40">
          {FIELD_OPTIONS.map((option) => {
            const isLast =
              FIELD_OPTIONS.indexOf(option) === FIELD_OPTIONS.length - 1;
            return (
              <div
                className={classNames(
                  !isLast && "border-b border-gray-200",
                  "w-full",
                )}
              >
                <button
                  type="button"
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
