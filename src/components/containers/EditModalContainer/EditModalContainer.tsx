import AddNewEditParticipants from "components/elements/AddNewEditParticipants/AddNewEditParticipants";
import AddNewEditTeam from "components/elements/AddNewEditTeam/AddNewEditTeam";
import EditTournamentGameOrderModal from "components/elements/EditTournamentGameOrderModal/EditTournamentGameOrderModal";
import type { EditGroupType } from "components/elements/EditTournamentGroup/EditTournamentGroup";
import type { FC } from "react";

interface EditModalContainerProps {
  tournamentId: string;
  selectedEdit: EditGroupType;
  handleCancelClick: () => void;
}

const EditModalContainer: FC<EditModalContainerProps> = ({
  tournamentId,
  selectedEdit,
  handleCancelClick,
}) => {
  return (
    <>
      <AddNewEditTeam
        tournamentId={tournamentId}
        editTeam={selectedEdit.team}
        selectedGroup={selectedEdit.group}
        handleCancelClick={handleCancelClick}
        isAddNewTeamOpen={
          selectedEdit.editType === "addTeam" ||
          selectedEdit.editType === "editTeam"
        }
      />

      <AddNewEditParticipants
        tournamentId={tournamentId}
        selectedGroup={selectedEdit.group}
        handleCancelClick={handleCancelClick}
        editParticipants={selectedEdit.participant}
        isAddNewParticipants={
          selectedEdit.editType === "addParticipant" ||
          selectedEdit.editType === "editParticipant"
        }
      />

      <EditTournamentGameOrderModal
        tournamentId={tournamentId}
        gameEditGroup={selectedEdit.group}
        handleCancelClick={handleCancelClick}
        isGameOrderModalOpen={selectedEdit.editType === "editGameOrder"}
      />
    </>
  );
};

export default EditModalContainer;
