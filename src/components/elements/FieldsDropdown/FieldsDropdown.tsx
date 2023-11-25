import { FC, useState } from "react";
import { IoIosOptions } from "react-icons/io";
import Dropdown from "~/components/elements/Dropdown/Dropdown";

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
            className="ml-2 mt-8 flex h-[2.5rem] w-[2.6rem] items-center justify-center rounded-md bg-gray-100 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
          >
            <IoIosOptions className="h-full w-full p-1" />
          </button>
        }
        handleDropdownClose={() => {
          setIsDropdownOpen(false);
        }}
      >
        <div className="h-40 w-40 bg-slate-300">Ha</div>
      </Dropdown>
    </>
  );
};

export default FieldsDropdown;
