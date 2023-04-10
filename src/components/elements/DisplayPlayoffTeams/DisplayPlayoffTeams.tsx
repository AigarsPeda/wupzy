import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";

interface DisplayPlayoffTeamsProps {
  teamName: string;
  smallPoints: number;
  participants: ParticipantType[];
}

const DisplayPlayoffTeams: FC<DisplayPlayoffTeamsProps> = ({
  teamName,
  smallPoints,
  participants,
}) => {
  return (
    <div>
      <div className="min-h-[2.5rem]">
        <h2>{teamName}</h2>
        <div className="flex w-full space-x-2 text-xs text-gray-300">
          {participants.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
        </div>
      </div>
      <NumberInput
        value={smallPoints}
        onChange={(n) => {
          console.log(n);
        }}
      />
    </div>
  );
};

export default DisplayPlayoffTeams;
