import PlayoffBrackets from "components/elements/PlayoffBrackets/PlayoffBrackets";
import type { GamePlayoffType } from "components/elements/PlayoffBrackets/utils/cratePlayoffInputMap";
import cratePlayoffInputMap from "components/elements/PlayoffBrackets/utils/cratePlayoffInputMap";
import Spinner from "components/elements/Spinner/Spinner";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import createPlayoffMap from "utils/createPlayoffMap";

interface SharePlayoffGamesProps {
  shareId: string;
}

const SharePlayoffGames: FC<SharePlayoffGamesProps> = ({ shareId }) => {
  const [brackets, setBrackets] = useState<Map<string, GamePlayoffType[]>>(
    new Map()
  );
  const { data, isFetching } = api.shareLink.getShareTournament.useQuery(
    { shareLinkId: shareId },
    { enabled: !!shareId }
  );

  useEffect(() => {
    if (!data?.shareTournament.tournament.playoffgames) return;

    const gameMap = createPlayoffMap(
      data?.shareTournament.tournament.playoffgames
    );
    const { playoffMap } = cratePlayoffInputMap(gameMap);

    setBrackets(playoffMap);
  }, [data?.shareTournament.tournament.playoffgames]);

  if (isFetching) {
    return <Spinner size="small" />;
  }

  return (
    <PlayoffBrackets
      isShare
      brackets={[...brackets]}
      handleScoreSave={() => {
        return null;
      }}
      isLoading={false}
      handleScoreChange={() => {
        return null;
      }}
    />
  );
};

export default SharePlayoffGames;
