import { useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import Input from "~/components/elements/Input/Input";
import NewKingTournament from "~/components/elements/NewKingTournament/NewKingTournament";
import NewTeamsTournament from "~/components/elements/NewTeamsTournament/NewTeamsTournament";
import RadioSelect from "~/components/elements/RadioSelect/RadioSelect";
import SignupLinkCreate from "~/components/elements/SignupLinkCreate/SignupLinkCreate";
import TextButton from "~/components/elements/TextButton/TextButton";
import TournamentOptions from "~/components/elements/TournamentOptions/TournamentOptions";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import useCreateTournament from "~/hooks/useCreateTournament";
import useRedirect from "~/hooks/useRedirect";
import { api } from "~/utils/api";
import classNames from "~/utils/classNames";
import countNewGames from "~/utils/countNewGames";
import createTeams from "~/utils/createTeams";
import kingGameCount from "~/utils/kingGameCount";

const NewTournamentForm: FC = () => {
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

  const { redirectToPath } = useRedirect();
  const [gameCount, setGameCount] = useState(0);
  const [signupLink, setSignupLink] = useState(false);
  const [signupDescription, setSignupDescription] = useState("");
  const { mutate: postNewTournament, isPending } =
    api.tournament.postNewTournament.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/tournaments/${data.id}`);
      },
    });

  const { mutate: postSignupLink } = api.signupLink.postSignupLink.useMutation({
    onSuccess: (data) => {
      redirectToPath(`/signups/${data.signupLink.id}`);
    },
  });

  useEffect(() => {
    if (newTournament.kind === "king") {
      setGameCount(
        kingGameCount(createTeams(newTournament.king.players)) *
          newTournament.rounds,
      );
    } else if (newTournament.kind === "teams") {
      setGameCount(countNewGames(newTournament.teams) * newTournament.rounds);
    }
  }, [
    newTournament.kind,
    newTournament.teams,
    newTournament.rounds,
    newTournament.king.players,
  ]);

  return (
    <form
      id="new-tournament"
      name="new-tournament"
      className="mx-auto max-w-lg rounded-md bg-white p-2 shadow md:mt-6"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="space-y-10">
        <div className="mt-4 border-b border-gray-900/10 pb-12">
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Tournaments name
          </legend>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Input
                inputLabel=""
                inputFor="Tournaments Name"
                inputVal={newTournament.name}
                handleInputChange={changeTournamentName}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <fieldset>
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Sign up link
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a sign up link for your tournament. Participants can use
              this to sign up for your tournament.
            </p>
            <div className="mt-6 space-y-6">
              <RadioSelect
                radioTitle="Don't create sign up link"
                radioValue="false"
                radioName="tournament-signup-link"
                radioSelectedValue={signupLink.toString()}
                handleRadioChange={() => {
                  setSignupLink(false);
                }}
              />
              <RadioSelect
                radioTitle="Create signup link"
                radioValue="true"
                radioName="tournament-signup-link"
                radioSelectedValue={signupLink.toString()}
                handleRadioChange={() => {
                  setSignupLink(true);
                }}
              />
            </div>
          </fieldset>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <fieldset>
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Tournament kind
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Select the type of tournament you wish to create.
            </p>
            <div className="mt-6 space-y-6">
              <RadioSelect
                radioTitle="King"
                radioValue="king"
                radioName="tournament-kind"
                radioSelectedValue={newTournament.kind}
                handleRadioChange={changeTournamentKind}
              />
              <RadioSelect
                radioTitle="Teams"
                radioValue="teams"
                radioName="tournament-kind"
                radioSelectedValue={newTournament.kind}
                handleRadioChange={changeTournamentKind}
              />
            </div>
          </fieldset>
        </div>

        {signupLink ? (
          <SignupLinkCreate
            signupDescription={signupDescription}
            handleDescriptionChange={setSignupDescription}
          />
        ) : (
          <SlidingAnimationLayout>
            <TournamentOptions
              sets={newTournament.sets}
              rounds={newTournament.rounds}
              handleSetRounds={handleSetRounds}
              handleSetSelect={handleSetSelect}
            />

            <div className="relative mr-3 mt-6 overflow-hidden border-b border-gray-900/10 pb-12">
              <NewKingTournament
                handleAddPlayer={handleAddPlayer}
                players={newTournament.king.players}
                isVisible={newTournament.kind === "king"}
                handleKingsPlayerName={updateKingsPlayerName}
              />

              <NewTeamsTournament
                teams={newTournament.teams}
                handleAddTeam={handleAddTeam}
                addPlayerToTeam={addPlayerToTeam}
                updateTeamsTeamName={updateTeamsTeamName}
                isVisible={newTournament.kind === "teams"}
                updateTeamsPlayerName={updateTeamsPlayerName}
              />
            </div>
          </SlidingAnimationLayout>
        )}
      </div>

      <div className="mt-4">
        {gameCount !== 0 && !signupLink && (
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Setting up{" "}
            <span
              className={classNames(
                gameCount <= 10 && "text-gray-800",
                gameCount > 10 && gameCount < 20 && "text-orange-500",
                gameCount > 20 && "text-red-600",
              )}
            >
              {gameCount}
            </span>{" "}
            games may take a few seconds when creating a tournament.
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <TextButton
          title="Cancel"
          handleClick={() => redirectToPath("/tournaments")}
        />

        <div className="w-20">
          <Button
            size="sm"
            title="Save"
            type="button"
            isLoading={isPending}
            handleClick={() => {
              if (!signupLink) {
                postNewTournament(newTournament);
                return;
              }

              console.log(
                "postSignupLink",
                newTournament.name,
                signupDescription,
                newTournament.kind,
              );

              postSignupLink({
                name: newTournament.name,
                description: signupDescription,
                tournamentKind: newTournament.kind,
              });
            }}
            isDisabled={newTournament.name.trim() === ""}
          />
        </div>
      </div>
    </form>
  );
};

export default NewTournamentForm;
