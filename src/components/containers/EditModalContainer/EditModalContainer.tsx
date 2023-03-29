import AddNewParticipants from "components/elements/AddNewParticipants/AddNewParticipants";
import AddNewTeam from "components/elements/AddNewTeam/AddNewTeam";
import EditTournamentGameOrderModal from "components/elements/EditTournamentGameOrderModal/EditTournamentGameOrderModal";
import type { EditType } from "components/elements/EditTournamentGroup/EditTournamentGroup";
import type { FC } from "react";

interface EditModalContainerProps {
  group: string;
  editType: EditType;
  tournamentId: string;
  handleCancelClick: () => void;
}

const EditModalContainer: FC<EditModalContainerProps> = ({
  group,
  editType,
  tournamentId,
  handleCancelClick,
}) => {
  return (
    <div className="h-full w-full bg-red-500">
      <AddNewTeam
        selectedGroup={group}
        tournamentId={tournamentId}
        handleCancelClick={handleCancelClick}
        isAddNewTeamOpen={editType === "addTeam"}
      />

      <AddNewParticipants
        selectedGroup={group}
        tournamentId={tournamentId}
        handleCancelClick={handleCancelClick}
        isAddNewParticipants={editType === "addParticipant"}
      />

      <EditTournamentGameOrderModal
        gameEditGroup={group}
        tournamentId={tournamentId}
        handleCancelClick={handleCancelClick}
        isGameOrderModalOpen={editType === "editGame"}
      />
    </div>
  );
};

export default EditModalContainer;
