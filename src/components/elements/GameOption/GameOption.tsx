import { useState, type FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Dropdown from "~/components/elements/Dropdown/Dropdown";

const GameOption: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  return (
    <Dropdown
      width="20"
      dropdownClass="top-[2.2rem]"
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={handleDropdownClose}
      dropdownBtn={
        <button
          type="button"
          onClick={updateState}
          className="flex w-full justify-end rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <BsThreeDotsVertical />
        </button>
      }
    >
      <div className="w-28 px-2">
        <button className="my-2 flex w-full items-center justify-between rounded bg-[#FF9119] px-4 py-1 font-primary text-sm text-gray-50 transition-all hover:bg-[#FF9119]/80 focus:ring-[#FF9119]/50">
          Edit <FiEdit2 />
        </button>
      </div>
    </Dropdown>
  );
};

export default GameOption;
