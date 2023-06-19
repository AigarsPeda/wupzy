import { type FC } from "react";
import classNames from "~/utils/classNames";
import Tooltip from "~/components/elements/Tooltip/Tooltip";

interface TeamNameProps {
  name: string;
  isTextLeft?: boolean;
}

const TeamName: FC<TeamNameProps> = ({ name, isTextLeft }) => {
  return (
    <div
      className={classNames(
        isTextLeft ? "text-left" : "text-right",
        "col-span-5"
      )}
    >
      <Tooltip isNowrap content={name}>
        {name}
      </Tooltip>
    </div>
  );
};

export default TeamName;
