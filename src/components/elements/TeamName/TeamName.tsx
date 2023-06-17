import { type FC } from "react";
import classNames from "../../../utils/classNames";

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
      <p className="truncate whitespace-nowrap font-primary text-lg font-medium tracking-wider text-gray-900">
        {name}
      </p>
    </div>
  );
};

export default TeamName;
