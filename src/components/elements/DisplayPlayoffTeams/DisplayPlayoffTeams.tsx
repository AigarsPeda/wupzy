import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";

interface DisplayPlayoffTeamsProps {
  teamName: string;
  smallPoints: number;
  isScoreDisplay: boolean;
  participants: ParticipantType[];
  handleScoreChange: (n: number) => void;
}

const DisplayPlayoffTeams: FC<DisplayPlayoffTeamsProps> = ({
  teamName,
  smallPoints,
  participants,
  isScoreDisplay,
  handleScoreChange,
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
      <div className="flex h-10">
        {isScoreDisplay && (
          <NumberInput value={smallPoints} onChange={handleScoreChange} />
        )}
      </div>
    </div>
  );
};

export default DisplayPlayoffTeams;
