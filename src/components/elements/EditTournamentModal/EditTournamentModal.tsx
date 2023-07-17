import { useEffect, type FC } from "react";
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
  const { tournament } = useEditTournament();
  const {
    newTournament,
    loadTournament,
    handleAddTeam,
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
      isModalVisible={isEditModal}
      handleCancelClick={handleCancelClicks}
      header={
        <div className="">
          <h1 className="text-3xl">Edit {tournament?.name}</h1>
        </div>
      }
    >
      <div className="px-3 pb-2 text-left md:px-6 md:pb-4">
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
    </ModalLayout>
  );
};

export default EditTournamentModal;
