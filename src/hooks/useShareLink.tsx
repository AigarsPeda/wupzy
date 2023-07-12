import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { GameSchemaArray } from "../types/tournament.types";

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
    groups: data?.groups,
    tournament: data?.tournament,
    games: data?.games ? GameSchemaArray.parse(data?.games) : undefined,
  };
};

export default useShareLink;
