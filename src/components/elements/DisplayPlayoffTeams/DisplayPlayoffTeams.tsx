import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";

interface DisplayPlayoffTeamsProps {
  wonSets: number;
  teamName: string;
  hasWinner: boolean;
  isBothTeams: boolean;
  isScoreDisplay: boolean;
  participants: ParticipantType[];
  smallPoints: number | null | undefined;
  handleScoreChange: (n: number) => void;
}

const DisplayPlayoffTeams: FC<DisplayPlayoffTeamsProps> = ({
  wonSets,
  teamName,
  hasWinner,
  isBothTeams,
  smallPoints,
  participants,
  handleScoreChange,
}) => {
  return (
    <div>
      <div className="min-h-[2.5rem] w-full truncate">
        <h2 className="">{teamName}</h2>
        <div className="flex w-full max-w-[9rem] space-x-2 overflow-x-auto text-xs text-gray-400">
          {participants.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
        </div>
      </div>

      {!hasWinner && isBothTeams && (
        <div className="flex h-10 w-full justify-between">
          <NumberInput value={smallPoints || 0} onChange={handleScoreChange} />
        </div>
      )}
      <div className="flex h-10 w-full justify-between">
        <p className="text-2xl font-normal text-white">{wonSets}</p>
      </div>
    </div>
  );
};

export default DisplayPlayoffTeams;
