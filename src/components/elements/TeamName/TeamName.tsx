import { type FC } from "react";
import classNames from "~/utils/classNames";
import Tooltip from "~/components/elements/Tooltip/Tooltip";

interface TeamNameProps {
  name: string;
  isLeftText?: boolean;
}

const TeamName: FC<TeamNameProps> = ({ name, isLeftText }) => {
  return (
    <div className={classNames("col-span-5 w-full text-center")}>
      <Tooltip content={name} isNowrap>
        <p
          className={classNames(
            isLeftText ? "text-left" : "text-right",
            "truncate"
          )}
        >
          {name}
        </p>
      </Tooltip>
    </div>
  );
};

export default TeamName;
