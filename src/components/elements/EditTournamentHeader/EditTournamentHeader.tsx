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
    <div className="mb-2 flex items-center justify-between">
      <p className="text-3xl font-bold text-gray-800">{group}</p>

      {isMoreThanOneGroup && (
        <p className={classNames(" text-sm text-gray-400")}>Move to</p>
      )}

      <p className="text-sm text-gray-400">Options</p>
    </div>
  );
};

export default EditTournamentHeader;
