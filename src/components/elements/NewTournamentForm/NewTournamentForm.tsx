import { useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import Input from "~/components/elements/Input/Input";
import NewKingTournament from "~/components/elements/NewKingTournament/NewKingTournament";
import NewTeamsTournament from "~/components/elements/NewTeamsTournament/NewTeamsTournament";
import RadioSelect from "~/components/elements/RadioSelect/RadioSelect";
import SetSelect from "~/components/elements/SetSelect/SetSelect";
import TextButton from "~/components/elements/TextButton/TextButton";
import useCreateTournament from "~/hooks/useCreateTournament";
import useRedirect from "~/hooks/useRedirect";
import { api } from "~/utils/api";
import classNames from "~/utils/classNames";
import countNewGames from "~/utils/countNewGames";
import createTeams from "~/utils/createTeams";
import kingGameCount from "~/utils/kingGameCount";

const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
  const { mutate } = api.tournament.postNewTournament.useMutation({
    onSuccess: (data) => {
      redirectToPath(`/tournaments/${data.id}`);
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

        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex">
            <fieldset>
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Set count
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Select sets count to win game.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4">
                <SetSelect
                  options={OPTIONS}
                  handleSetSelect={handleSetSelect}
                  selectedSetCount={newTournament.sets}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Rounds
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose rounds for game play.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4">
                <SetSelect
                  options={OPTIONS}
                  handleSetSelect={handleSetRounds}
                  selectedSetCount={newTournament.rounds}
                />
              </div>
            </fieldset>
          </div>
        </div>

        <div className="relative mr-3 overflow-hidden border-b border-gray-900/10 pb-12">
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
      </div>

      <div className="mt-4">
        {gameCount !== 0 && (
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
            // isLoading={isLoading}
            handleClick={() => mutate(newTournament)}
            isDisabled={newTournament.name.trim() === ""}
          />
        </div>
      </div>
    </form>
  );
};

export default NewTournamentForm;
