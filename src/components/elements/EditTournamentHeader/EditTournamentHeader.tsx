import type { FC, ReactNode } from "react";
import classNames from "utils/classNames";

interface EditTournamentHeaderProps {
  group: string;
  children: ReactNode;
  isMoreThanOneGroup: boolean;
}

const EditTournamentHeader: FC<EditTournamentHeaderProps> = ({
  group,
  children,
  isMoreThanOneGroup,
}) => {
  return (
    <div
      className={classNames(
        !isMoreThanOneGroup && "max-w-[50%]",
        "ml-2 grid min-h-[20rem] min-w-[20rem] grid-cols-1 content-start rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md"
      )}
    >
      <div className="flex justify-between">
        <p className="mb-5 text-sm text-gray-400">Group - {group}</p>
        {isMoreThanOneGroup && (
          <p className={classNames("mb-3 text-sm text-gray-400")}>Move to</p>
        )}
      </div>

      {children}
    </div>
  );
};

export default EditTournamentHeader;
