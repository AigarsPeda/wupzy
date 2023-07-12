import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GameSchemaArray } from "~/types/tournament.types";
import { api } from "~/utils/api";

const useShareLink = () => {
  const { query } = useRouter();
  const [slug, setSlug] = useState("");
  const { data, isLoading } = api.shareLink.getTournament.useQuery(
    { slug },
    { enabled: Boolean(slug) }
  );

  useEffect(() => {
    if (query.slug && typeof query.slug === "string") {
      setSlug(query.slug);
    }
  }, [query.slug]);

  return {
    isLoading,
    teams: data?.teams || [],
    groups: data?.groups || [],
    players: data?.players || [],
    tournament: data?.tournament,
    games: data?.games ? GameSchemaArray.parse(data?.games) : [],
  };
};

export default useShareLink;
