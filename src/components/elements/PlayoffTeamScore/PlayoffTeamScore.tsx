import { type FC } from "react";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import { type PlayOffTeamType } from "~/types/playoff.types";
import classNames from "~/utils/classNames";

export interface PlayoffTeamScoreProps {
  isLast: boolean;
  isWinner: boolean;
  teamScore: number;
  isBothTeams: boolean;
  team: PlayOffTeamType;
  updateTeamsScore: (teamId: string, score: number) => void;
}

const PlayoffTeamScore: FC<PlayoffTeamScoreProps> = ({
  team,
  isLast,
  isWinner,
  teamScore,
  isBothTeams,
  updateTeamsScore,
}) => {
  // useEffect(() => {
  //   console.log("Running");
  // }, []);

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
            value={team.score}
            onChange={(num) => {
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
