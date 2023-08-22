import { type FC } from "react";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import classNames from "~/utils/classNames";

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
            "truncate font-alumni text-2xl font-medium text-gray-800"
          )}
        >
          {name}
        </p>
      </Tooltip>
    </div>
  );
};

export default TeamName;
