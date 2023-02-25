import type { FC } from "react";
import classNames from "utils/classNames";

interface EditTournamentHeaderProps {
  group: string;
  isMoreThanOneGroup: boolean;
}

const EditTournamentHeader: FC<EditTournamentHeaderProps> = ({
  group,
  isMoreThanOneGroup,
}) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <p className=" text-sm text-gray-400">Group - {group}</p>

      {isMoreThanOneGroup && (
        <p className={classNames(" text-sm text-gray-400")}>Move to</p>
      )}

      <p className="text-sm text-gray-400">Options</p>
    </div>
  );
};

export default EditTournamentHeader;
