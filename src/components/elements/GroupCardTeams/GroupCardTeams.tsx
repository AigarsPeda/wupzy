import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import classNames from "utils/classNames";

interface GroupCardTeamsProps {
  teams: ParticipantType[];
}

const GroupCardTeams: FC<GroupCardTeamsProps> = ({ teams }) => {
  return (
    <div className="col-span-3">
      <GroupCardHeader label="Participants" />
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

export default GroupCardTeams;
