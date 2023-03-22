import type { FC } from "react";

interface EditGroupDropdownItemProps {
  btnTitle: string;
  icon: JSX.Element;
  isDisabled?: boolean;
  handelClick: () => void;
}

const EditGroupDropdownItem: FC<EditGroupDropdownItemProps> = ({
  icon,
  btnTitle,
  isDisabled,
  handelClick,
}) => {
  return (
    <>
      <button
        disabled={isDisabled}
        onClick={handelClick}
        className="flex w-full items-center justify-between rounded px-3 py-2 transition-all duration-200 hover:bg-gray-800 hover:text-white"
      >
        {btnTitle}
        {icon}
      </button>
    </>
  );
};

export default EditGroupDropdownItem;
