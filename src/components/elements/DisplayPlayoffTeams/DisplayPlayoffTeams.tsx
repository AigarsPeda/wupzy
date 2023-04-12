import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import classNames from "../../../utils/classNames";

interface DisplayPlayoffTeamsProps {
  teamName: string;
  isWinner: boolean;
  hasWinner: boolean;
  isScoreDisplay: boolean;
  participants: ParticipantType[];
  smallPoints: number | null | undefined;
  handleScoreChange: (n: number) => void;
}

const DisplayPlayoffTeams: FC<DisplayPlayoffTeamsProps> = ({
  isWinner,
  teamName,
  hasWinner,
  smallPoints,
  participants,
  isScoreDisplay,
  handleScoreChange,
}) => {
  return (
    <div>
      <div className="min-h-[2.5rem] truncate">
        <h2 className="min-w-[9rem]">{teamName}</h2>
        <div className="flex w-full max-w-[9rem] space-x-2 overflow-x-auto text-xs text-gray-400">
          {participants.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
        </div>
      </div>

      <div className="flex h-10 justify-between">
        {/* {isScoreDisplay && hasWinner && (
          <p
            className={classNames(
              isWinner ? "text-white" : "text-gray-400",
              "text-3xl "
            )}
          >
            {smallPoints}
          </p>
        )} */}

        {/* {isScoreDisplay && !hasWinner && (
          <NumberInput value={smallPoints || 0} onChange={handleScoreChange} />
        )} */}

        <NumberInput value={smallPoints || 0} onChange={handleScoreChange} />
      </div>
    </div>
  );
};

export default DisplayPlayoffTeams;
