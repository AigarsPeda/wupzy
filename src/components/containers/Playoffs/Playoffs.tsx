import changeTeamsScore from "components/containers/Playoffs/utils/changeTeamsScore";
import BracketsInput from "components/elements/BracketsInput/BracketsInput";
import type { GamePlayoffType } from "components/elements/BracketsInput/utils/cratePlayoffInputMap";
import cratePlayoffInputMap from "components/elements/BracketsInput/utils/cratePlayoffInputMap";
import Spinner from "components/elements/Spinner/Spinner";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useRedirect from "hooks/useRedirect";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import createPlayoffMap from "utils/createPlayoffMap";
import { GameSets } from "../../../types/game.types";
import getWinsPerTeam from "../../elements/GroupCard/utils/getWinsPerTeam";

interface PlayoffsProps {
  tournamentId: string;
}

const Playoffs: FC<PlayoffsProps> = ({ tournamentId }) => {
  const { redirectToPath } = useRedirect();
  const [brackets, setBrackets] = useState<Map<string, GamePlayoffType[]>>(
    new Map()
  );

  const { data, error, isFetching, isLoading, refetch } =
    api.teamsTournaments.getPlayoffGames.useQuery(
      { tournamentId },
      {
        suspense: false,
        retry: 2,
      }
    );

  const { mutate: updatePlayoffGame } =
    api.teamsTournaments.updatePlayoffGame.useMutation({
      onSuccess: async () => {
        await refetch();
      },
    });

  const handleScoreSave = (game: GamePlayoffType) => {
    const nextStage = parseInt(game.stage) / 2;
    const nextBracketNum = Math.floor(game.bracketNum / 2);
    const winnerIds: {
      id: string;
    }[] = [];

    const currentSet = game.gameSet;
    const nasserSetsToWin = game.setsInGame;
    let winnerTeamId: string | undefined = undefined;
    const fistTeamScore = game.team1?.team1Score || 0;
    const secondTeamScore = game.team2?.team2Score || 0;

    const finishedGames = GameSets.parse(game.gameSets);

    const { firstTeamWins, secondTeamWins } = getWinsPerTeam(
      finishedGames,
      fistTeamScore,
      secondTeamScore
    );

    if (parseInt(firstTeamWins) >= nasserSetsToWin) {
      console.log("first team wins");
      winnerTeamId = game.team1?.team1.id;
      game.team1?.team1.participants.forEach((p) => {
        winnerIds.push({ id: p.id });
      });
    }

    if (parseInt(secondTeamWins) >= nasserSetsToWin) {
      console.log("second team wins");
      winnerTeamId = game.team2?.team2.id;
      game.team2?.team2.participants.forEach((p) => {
        winnerIds.push({ id: p.id });
      });
    }

    const setResults = {
      ...finishedGames,
      [currentSet.toString()]: {
        firstTeam: fistTeamScore,
        secondTeam: secondTeamScore,
      },
    };

    updatePlayoffGame({
      winnerIds,
      setResults,
      tournamentId,
      winnerTeamId,
      nextBracketNum,
      gameId: game.gameId,
      team1Score: fistTeamScore,
      team2Score: secondTeamScore,
      nextStage: nextStage.toString(),
    });
  };

  useEffect(() => {
    if (!isLoading && error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", window.location.pathname);
    }
  }, [redirectToPath, error?.data?.code, isLoading]);

  useEffect(() => {
    if (!data?.games) return;

    const gameMap = createPlayoffMap(data.games);
    const { playoffMap } = cratePlayoffInputMap(gameMap);

    setBrackets(playoffMap);
  }, [data]);

  if (isFetching) {
    return <Spinner size="small" />;
  }

  return (
    <GridLayout minWith="320" isGap>
      <BracketsInput
        brackets={[...brackets]}
        handleScoreSave={handleScoreSave}
        handleScoreChange={(num, team, stage) => {
          const newMap = changeTeamsScore(num, team, stage, brackets);
          setBrackets(newMap);
        }}
      />
    </GridLayout>
  );
};

export default Playoffs;
