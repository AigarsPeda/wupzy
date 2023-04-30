import Logo from "components/elements/Logo/Logo";
import PageHead from "components/elements/PageHead/PageHead";
import SharePlayoffGames from "components/elements/SharePlayoffGames/SharePlayoffGames";
import ShareRegularGames from "components/elements/ShareRegularGames/ShareRegularGames";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";

const Share: NextPage = () => {
  const { query } = useRouter();
  const [shareId, setShareId] = useState("");
  const { data } = api.shareLink.getShareTournament.useQuery(
    { shareLinkId: shareId },
    { enabled: !!shareId }
  );

  useEffect(() => {
    if (!query.id || typeof query.id !== "string") return;

    setShareId(query.id);
  }, [query.id]);

  return (
    <>
      <PageHead
        title="Wupzy | Share"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <div className="mb-5 transition-all md:mb-10">
        <Logo />
      </div>
      {data?.shareTournament.tournament.isPlayoff ? (
        <SharePlayoffGames shareId={shareId} />
      ) : (
        <ShareRegularGames shareId={shareId} />
      )}
    </>
  );
};

export default Share;
