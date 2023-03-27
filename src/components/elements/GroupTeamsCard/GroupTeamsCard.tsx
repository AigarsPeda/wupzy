import type { FC } from "react";
import type { TeamType } from "types/team.types";
import classNames from "utils/classNames";
import GroupCardHeader from "../GroupCardHeader/GroupCardHeader";

interface GroupTeamsCardProps {
  teams: TeamType[];
}

const GroupTeamsCard: FC<GroupTeamsCardProps> = ({ teams }) => {
  return (
    <div className="col-span-3">
      <GroupCardHeader label="Teams" />
      {teams.map((team, i) => {
        const isFirstGroup = i === 0;
        return (
          <div
            key={`${i}${team.id}`}
            className={classNames(
              !isFirstGroup && "border-t-2",
              "flex items-center justify-between py-2"
            )}
          >
            <p>{team.name}</p>
            <p>{team.score}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GroupTeamsCard;
