import type { FC } from "react";
import classNames from "utils/classNames";

interface TournamentProps {
  handleClick: () => void;
  btnTitle: string | number | JSX.Element;
}

const ListButton: FC<TournamentProps> = ({ btnTitle, handleClick }) => {
  return (
    <button
      className={classNames(
        "h-full w-full px-3 py-2 transition-all duration-200 hover:bg-gray-200 "
      )}
      onClick={handleClick}
    >
      {btnTitle}
    </button>
  );
};

export default ListButton;
