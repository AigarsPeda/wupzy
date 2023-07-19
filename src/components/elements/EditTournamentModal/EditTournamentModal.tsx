import { useEffect, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import NewKingTournament from "~/components/elements/NewKingTournament/NewKingTournament";
import NewTeamsTournament from "~/components/elements/NewTeamsTournament/NewTeamsTournament";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import useCreateNewTournament from "~/hooks/useCreateTournament";
import useEditTournament from "~/hooks/useEditTournament";

interface EditTournamentModalModalProps {
  isEditModal: boolean;
  handleCancelClicks: () => void;
}

const EditTournamentModal: FC<EditTournamentModalModalProps> = ({
  isEditModal,
  handleCancelClicks,
}) => {
  const { tournament, updateTournament, isUpdatingTournament } =
    useEditTournament();
  const {
    handleAddTeam,
    newTournament,
    loadTournament,
    handleAddPlayer,
    addPlayerToTeam,
    updateTeamsTeamName,
    updateKingsPlayerName,
    updateTeamsPlayerName,
  } = useCreateNewTournament();

  useEffect(() => {
    if (tournament) {
      loadTournament({
        tournament: {
          id: tournament.id,
          sets: tournament.sets,
          type: tournament.type,
          name: tournament.name,
          rounds: tournament.rounds,
        },
        teams: tournament.teams,
        players: tournament.players,
      });
    }
  }, [loadTournament, tournament]);

  return (
    <ModalLayout
      isFullScreen
      bgColor="gray"
      isModalVisible={isEditModal}
      handleCancelClick={handleCancelClicks}
      header={
        <div>
          <h1 className="text-3xl">Edit {tournament?.name}</h1>
        </div>
      }
    >
      <form
        className="mx-auto mt-4 max-w-lg rounded-md bg-white p-2 shadow md:mt-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-10">
          <NewKingTournament
            handleAddPlayer={handleAddPlayer}
            players={newTournament.king.players}
            isVisible={tournament?.type === "king"}
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
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
            onClick={handleCancelClicks}
          >
            Cancel
          </button>
          <div className="w-20">
            <Button
              size="sm"
              title="Save"
              type="button"
              isLoading={isUpdatingTournament}
              isDisabled={newTournament.name.trim() === ""}
              handleClick={() => {
                updateTournament(newTournament);
                handleCancelClicks();
              }}
            />
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditTournamentModal;
