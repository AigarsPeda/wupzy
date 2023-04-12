import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import classNames from "utils/classNames";

interface DisplayTeamsProps {
  teamName?: string;
  infoScore?: number;
  isWinner?: boolean;
  teamsScore?: number;
  isCurrentGame?: boolean;
  team: ParticipantType[];
  handleScoreChange?: (n: number) => void;
}

const DisplayTeams: FC<DisplayTeamsProps> = ({
  team,
  teamName,
  isWinner,
  infoScore,
  teamsScore,
  isCurrentGame,
  handleScoreChange,
}) => {
  return (
    <>
      {teamName && (
        <p
          className={classNames(
            isCurrentGame ? "text-white" : "text-gray-800",
            "truncate"
          )}
        >
          {teamName}
        </p>
      )}
      <div
        className={classNames(
          "flex w-full max-w-[10rem] items-center overflow-x-auto"
        )}
      >
        {team.map((t) => (
          <p key={t.id} className={classNames(teamName && "text-xs", "mr-2")}>
            {t.name}
          </p>
        ))}
      </div>

      {isCurrentGame && handleScoreChange && (
        <NumberInput value={teamsScore ?? 0} onChange={handleScoreChange} />
      )}
      {!isCurrentGame && infoScore && (
        <p
          className={classNames(
            isWinner ? "font-bold text-gray-800" : "font-normal text-gray-400",
            "text-2xl"
          )}
        >
          {infoScore}
        </p>
      )}
    </>
  );
};

export default DisplayTeams;
