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
    <div className="flex justify-between">
      <p className="mb-5 text-sm text-gray-400">Group - {group}</p>
      {isMoreThanOneGroup && (
        <p className={classNames("mb-3 text-sm text-gray-400")}>Move to</p>
      )}
    </div>
  );
};

export default EditTournamentHeader;
