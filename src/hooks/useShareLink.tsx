import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GameSchemaArray } from "~/types/tournament.types";
import { api } from "~/utils/api";
import { PlayoffGameSchema } from "~/types/playoff.types";

const useShareLink = () => {
  const { query } = useRouter();
  const [slug, setSlug] = useState("");
  const [isPlayoffs, setIsPlayoffs] = useState(false);
  const { data, isLoading } = api.shareLink.getTournament.useQuery(
    { slug },
    { enabled: Boolean(slug) }
  );
  const { data: playoffGames } = api.shareLink.getSharePlayoff.useQuery(
    { slug },
    { enabled: Boolean(slug) && isPlayoffs }
  );

  useEffect(() => {
    if (query.slug && typeof query.slug === "string") {
      setSlug(query.slug);
    }
  }, [query.slug]);

  useEffect(() => {
    if (
      query.isplayoffmode &&
      query.isplayoffmode === "true" &&
      typeof query.isplayoffmode === "string"
    ) {
      setIsPlayoffs(true);
    }
  }, [query.isplayoffmode]);

  return {
    isLoading,
    teams: data?.teams || [],
    groups: data?.groups || [],
    players: data?.players || [],
    tournament: data?.tournament,
    isPlayoffs: data?.tournament?.isPlayoffs,
    games: data?.games ? GameSchemaArray.parse(data?.games) : [],
    playoffGames: PlayoffGameSchema.array().parse(
      playoffGames?.playoffGames || []
    ),
  };
};

export default useShareLink;
