import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import classNames from "utils/classNames";

interface GroupParticipantCard {
  participants: ParticipantType[];
}

const GroupParticipantCard: FC<GroupParticipantCard> = ({ participants }) => {
  return (
    <div className="col-span-3">
      <GroupCardHeader
        label="Participants"
        options={<p className="text-sm">Point overall</p>}
      />
      {participants.map((team, i) => {
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

export default GroupParticipantCard;
