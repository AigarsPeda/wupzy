import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import Button from "~/components/elements/Button/Button";
import NewKingTournament from "~/components/elements/NewKingTournament/NewKingTournament";
import NewTeamsTournament from "~/components/elements/NewTeamsTournament/NewTeamsTournament";
import PageHead from "~/components/elements/PageHead/PageHead";
import useCreateTournament from "~/hooks/useCreateTournament";
import { api } from "~/utils/api";

const TournamentPage: NextPage = () => {
  const { query } = useRouter();
  const [slug, setSlug] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const { data } = api.signupLink.getSignupLink.useQuery(
    { slug: slug },
    { enabled: Boolean(slug) },
  );

  const { mutate, isSuccess, isPending } =
    api.signupLink.postPlayerToSignupLink.useMutation();

  const {
    newTournament,
    addPlayerToTeam,
    updateTeamsTeamName,
    updateKingsPlayerName,
    updateTeamsPlayerName,
  } = useCreateTournament();

  const firstElementFromArray = <T,>(arr: T[]) => {
    const first = arr[0];
    if (first) {
      return [first];
    }
    return arr;
  };

  useEffect(() => {
    if (data?.signupLink?.type === "king") {
      for (const player of newTournament.king.players) {
        if (player.name.trim() !== "") {
          setIsButtonEnabled(true);
          return;
        }

        setIsButtonEnabled(false);
      }
    }

    if (data?.signupLink?.type === "teams") {
      for (const team of newTournament.teams) {
        if (team.name?.trim() === "") {
          setIsButtonEnabled(false);
          return;
        }

        for (const player of team.players) {
          if (player.name.trim() !== "") {
            setIsButtonEnabled(true);
            return;
          }
        }
      }

      setIsButtonEnabled(false);
    }
  }, [newTournament, data?.signupLink?.type]);

  useEffect(() => {
    if (query.slug && typeof query.slug === "string") {
      setSlug(query.slug);
    }
  }, [query.slug]);

  if (!data?.signupLink?.isActive) {
    return (
      <div className="mt-40 flex h-screen flex-col items-center md:mt-72">
        <p className="text-2xl font-bold text-gray-900">
          Signup for this tournament is finished.
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="mt-40 flex h-screen flex-col items-center md:mt-72">
        <BsCheckCircle className="mb-4 text-green-500" size={70} />
        <p className="text-2xl font-bold text-gray-900">
          You have successfully signed up for the tournament. Thank you!
        </p>
      </div>
    );
  }

  return (
    <>
      <PageHead
        title={`Wupzy | ${data?.signupLink?.name || "Share"}`}
        descriptionShort={
          data.signupLink.description ||
          `Platform that lets you effortlessly create tournament tables.`
        }
        descriptionLong={
          data.signupLink.description ||
          `Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks.`
        }
      />
      <form
        id="signup-form"
        name="signup-form"
        className="mx-auto max-w-lg rounded-md bg-white p-2 shadow md:mt-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mt-4 border-b border-gray-900/10 pb-10">
          <fieldset className="mt-4">
            <legend className="text-sm leading-7 text-gray-500">Kind</legend>
            <p className="mt-1 text-base capitalize leading-6 text-gray-900">
              {data?.signupLink?.type === "king" ? "King" : "Regular"}
            </p>
          </fieldset>
          <fieldset className="mt-4">
            <legend className="text-sm leading-7 text-gray-500">
              Description
            </legend>
            <div
              className="mt-1 text-base leading-6 text-gray-900"
              dangerouslySetInnerHTML={{
                __html: data?.signupLink?.description,
              }}
            />
          </fieldset>
        </div>
        <div className="flex items-center">
          <div className="relative mt-[1.09rem] w-full overflow-hidden pb-4">
            <NewKingTournament
              playerNameVisible="Your name"
              isVisible={data?.signupLink?.type === "king"}
              handleKingsPlayerName={updateKingsPlayerName}
              players={firstElementFromArray(newTournament.king.players)}
            />

            <NewTeamsTournament
              teamsNameVisible="Team name"
              addPlayerToTeam={addPlayerToTeam}
              updateTeamsTeamName={updateTeamsTeamName}
              isVisible={data?.signupLink?.type === "teams"}
              updateTeamsPlayerName={updateTeamsPlayerName}
              teams={firstElementFromArray(newTournament.teams)}
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-x-6 pb-5">
          <div className="w-20">
            <Button
              size="sm"
              title="Join"
              type="button"
              isLoading={isPending}
              isDisabled={isPending || !isButtonEnabled}
              handleClick={() => {
                if (!data?.signupLink) {
                  return;
                }
                void mutate({
                  signupLinkId: data.signupLink.id,
                  teams: newTournament.teams.filter(
                    (team) => team.name !== "" && team.players.length > 0,
                  ),
                  newPlayers: newTournament.king.players.filter(
                    (player) => player.name !== "",
                  ),
                });
              }}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default TournamentPage;
