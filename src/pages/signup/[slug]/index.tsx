import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PageHead from "~/components/elements/PageHead/PageHead";
import { api } from "~/utils/api";
import NewKingTournament from "../../../components/elements/NewKingTournament/NewKingTournament";
import NewTeamsTournament from "../../../components/elements/NewTeamsTournament/NewTeamsTournament";
import newTournament from "../../new-tournament";
import useCreateTournament from "../../../hooks/useCreateTournament";
import { NewPlayerType, NewTeamsType } from "../../../types/tournament.types";

const TournamentPage: NextPage = () => {
  const { query } = useRouter();
  const [slug, setSlug] = useState("");
  const { data } = api.signupLink.getSignupLink.useQuery(
    { slug: slug },
    { enabled: Boolean(slug) },
  );

  const {
    newTournament,
    handleAddTeam,
    handleAddPlayer,
    addPlayerToTeam,
    handleSetSelect,
    handleSetRounds,
    updateTeamsTeamName,
    changeTournamentName,
    changeTournamentKind,
    updateKingsPlayerName,
    updateTeamsPlayerName,
  } = useCreateTournament();

  // const getFirstFromArrAndReturnArr =  <T>(arr: T[]) => {
  //   const first = arr[0];
  //   return [first];
  // };

  const firstElementFromArray = <T,>(arr: T[]) => {
    const first = arr[0];
    if (first) {
      return [first];
    }
    return arr;
  };

  useEffect(() => {
    if (query.slug && typeof query.slug === "string") {
      setSlug(query.slug);
    }
  }, [query.slug]);

  return (
    <>
      <PageHead
        title={`Wupzy | ${data?.signupLink?.name || "Share"}`}
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
        tournament tables, save game scores, view real-time results, and share
        them with all participants in just a few clicks."
      />

      {/* <div className="mt-4 flex items-center justify-between rounded py-1 md:mt-0">
        <h1 className="text-2xl font-bold text-gray-900">Sign up</h1>
        <p>{data?.signupLink?.name}</p>

        <div>
          <p>{data?.signupLink?.description}</p>
        </div>
      </div> */}
      <form
        id="signup-form"
        name="signup-form"
        className="mx-auto max-w-lg rounded-md bg-white p-2 shadow md:mt-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative mr-3 overflow-hidden border-b border-gray-900/10 pb-12">
          <NewKingTournament
            // handleAddPlayer={handleAddPlayer}
            isVisible={newTournament.kind === "king"}
            handleKingsPlayerName={updateKingsPlayerName}
            players={firstElementFromArray(newTournament.king.players)}
          />

          <NewTeamsTournament
            // handleAddTeam={handleAddTeam}
            addPlayerToTeam={addPlayerToTeam}
            updateTeamsTeamName={updateTeamsTeamName}
            isVisible={newTournament.kind === "teams"}
            updateTeamsPlayerName={updateTeamsPlayerName}
            teams={firstElementFromArray(newTournament.teams)}
          />
        </div>
      </form>
    </>
  );
};

export default TournamentPage;
