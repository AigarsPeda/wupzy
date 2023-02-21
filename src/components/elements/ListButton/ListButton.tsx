import type { FC } from "react";
import { classNames } from "utils/classNames";

interface TournamentProps {
  btnTitle: string;
  handleClick: () => void;
}

const ListButton: FC<TournamentProps> = ({ btnTitle, handleClick }) => {
  return (
    <button
      className={classNames(
        "h-full w-full py-2 px-3 transition-all duration-200 hover:bg-gray-200 "
      )}
      onClick={handleClick}
    >
      {btnTitle}
    </button>
  );
};

export default ListButton;
