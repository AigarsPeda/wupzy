import type { FC } from "react";

interface TabButtonProps {
  handleClick: () => void;
}

const TabButton: FC<TabButtonProps> = ({ handleClick }) => {
  return (
    <button
      className="h-5 w-20 rounded-b-md bg-green-500 text-xs font-normal tracking-wide text-white"
      onClick={handleClick}
    >
      Settings
    </button>
  );
};

export default TabButton;
