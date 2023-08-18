import { useEffect, useRef, type FC } from "react";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import { type PlayOffTeamType } from "~/types/playoff.types";
import classNames from "~/utils/classNames";

export interface PlayoffTeamScoreProps {
  isLast: boolean;
  isWinner: boolean;
  teamScore: number;
  isBothTeams: boolean;
  team: PlayOffTeamType;
  clickedTeamsId: string;
  setClickedTeamsId: (teamId: string) => void;
  updateTeamsScore: (teamId: string, score: number) => void;
}

const PlayoffTeamScore: FC<PlayoffTeamScoreProps> = ({
  team,
  isLast,
  isWinner,
  teamScore,
  isBothTeams,
  clickedTeamsId,
  updateTeamsScore,
  setClickedTeamsId,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (clickedTeamsId === team.id) {
      ref.current?.focus();
    }
  }, [clickedTeamsId, team.id]);

  return (
    <div>
      <div
        className={classNames(
          !isLast && "mb-2",
          "flex min-h-[3.7rem] min-w-[5rem] items-center justify-between rounded bg-gray-200 px-2 py-2"
        )}
      >
        <p className="">{team?.name || ""}</p>
        {isBothTeams && !isWinner && (
          <NumberInput
            isBorder
            ref={ref}
            value={team.score}
            onChange={(num) => {
              setClickedTeamsId(team.id);
              updateTeamsScore(team.id, num);
            }}
          />
        )}
        {isWinner && (
          <p className="text-center text-3xl font-bold text-gray-900">
            {teamScore}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayoffTeamScore;
