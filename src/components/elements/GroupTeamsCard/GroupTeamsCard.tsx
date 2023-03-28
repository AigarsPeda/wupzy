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
      <GroupCardHeader
        label="Teams"
        options={<p className="text-sm">Point overall</p>}
      />
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
            <div>
              <p>{team.name}</p>
              <div className="flex space-x-2">
                {team.participants.map((participant) => (
                  <p key={participant.id} className="text-sm text-gray-400">
                    {participant.name}
                  </p>
                ))}
              </div>
            </div>
            <p>{team.score}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GroupTeamsCard;
