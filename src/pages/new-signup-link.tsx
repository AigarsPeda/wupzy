import { type NextPage } from "next";
import { useState } from "react";
import Button from "~/components/elements/Button/Button";
import Input from "~/components/elements/Input/Input";
import PageHead from "~/components/elements/PageHead/PageHead";
import RadioSelect from "~/components/elements/RadioSelect/RadioSelect";
import SignupLinkCreate from "~/components/elements/SignupLinkCreate/SignupLinkCreate";
import TextButton from "~/components/elements/TextButton/TextButton";
import useCreateTournament from "~/hooks/useCreateTournament";
import useRedirect from "~/hooks/useRedirect";
import { api } from "~/utils/api";

const HomePage: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const [signupDescription, setSignupDescription] = useState("");
  const { newTournament, changeTournamentName, changeTournamentKind } =
    useCreateTournament();

  const { mutate: postSignupLink, isPending } =
    api.signupLink.postSignupLink.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/signups/${data.signupLink.id}`);
      },
    });

  return (
    <>
      <PageHead
        title="Wupzy"
        descriptionShort="Platform that lets you effortlessly organize and manage tournament."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <main>
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
                Signup link name
              </legend>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <Input
                    inputLabel=""
                    inputFor="Signup link name"
                    inputVal={newTournament.name}
                    handleInputChange={changeTournamentName}
                  />
                </div>
              </div>
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
            <SignupLinkCreate
              signupDescription={signupDescription}
              handleDescriptionChange={setSignupDescription}
            />
            {/* {signupLink ? (
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
            )} */}
          </div>

          {/* <div className="mt-4">
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
          </div> */}

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <TextButton
              title="Cancel"
              handleClick={() => redirectToPath("/tournaments")}
            />

            <div className="w-20">
              <Button
                size="sm"
                title="Create"
                type="button"
                isLoading={isPending}
                handleClick={() => {
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
      </main>
    </>
  );
};

export default HomePage;
