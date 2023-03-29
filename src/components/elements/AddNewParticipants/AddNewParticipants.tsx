import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import { useState } from "react";
import { api } from "utils/api";

interface AddNewParticipants {
  tournamentId: string;
  selectedGroup: string | null;
  handleCancelClick: () => void;
  isAddNewParticipants: boolean;
}

const AddNewParticipants: FC<AddNewParticipants> = ({
  tournamentId,
  selectedGroup,
  handleCancelClick,
  isAddNewParticipants,
}) => {
  const [teamsName, setTeamsName] = useState("");
  const { mutateAsync } = api.participant.addParticipantToGroup.useMutation();
  const { refetch: refetchGames } = api.tournaments.getTournamentGames.useQuery(
    { tournamentId }
  );

  const handleAddingTeam = async () => {
    if (!selectedGroup) {
      return;
    }

    await mutateAsync({
      score: 0,
      tournamentId,
      name: teamsName,
      group: selectedGroup,
    });

    await refetchGames();
    setTeamsName("");
    handleCancelClick();
  };

  return (
    <ModalWrap
      modalWidth="2xl"
      modalTitle="Add new participants"
      isModalVisible={isAddNewParticipants}
      handleCancelClick={handleCancelClick}
    >
      <Input
        type="text"
        value={teamsName}
        name="participantsName"
        label="Participants name"
        handleInputChange={(e) => setTeamsName(e.target.value)}
      />

      <div className="flex justify-end">
        <Button
          btnClass="w-40"
          btnTitle="Add"
          btnColor={teamsName.length > 2 ? "black" : "outline"}
          onClick={() => {
            if (teamsName.length <= 2) return;

            handleAddingTeam().catch((err) =>
              console.error("Error adding team", err)
            );
          }}
        />
      </div>
    </ModalWrap>
  );
};

export default AddNewParticipants;
