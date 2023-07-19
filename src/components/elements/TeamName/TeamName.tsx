import { type FC } from "react";
import classNames from "~/utils/classNames";
import Tooltip from "~/components/elements/Tooltip/Tooltip";

interface TeamNameProps {
  name: string;
}

const TeamName: FC<TeamNameProps> = ({ name }) => {
  return (
    <div className={classNames("col-span-5 w-full text-center")}>
      <Tooltip content={name} placement="bottom">
        <div className="truncate">{name}</div>
      </Tooltip>
    </div>
  );
};

export default TeamName;
