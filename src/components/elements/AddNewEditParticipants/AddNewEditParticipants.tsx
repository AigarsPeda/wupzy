import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { ParticipantType } from "types/team.types";
import { api } from "utils/api";

interface AddNewEditParticipantsProps {
  tournamentId: string;
  selectedGroup: string | null;
  handleCancelClick: () => void;
  isAddNewParticipants: boolean;
  editParticipants?: ParticipantType;
}

const AddNewEditParticipants: FC<AddNewEditParticipantsProps> = ({
  tournamentId,
  selectedGroup,
  editParticipants,
  handleCancelClick,
  isAddNewParticipants,
}) => {
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { mutateAsync: updatedParticipant } =
    api.participant.updatedParticipant.useMutation();
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
      name: name,
      tournamentId,
      group: selectedGroup,
    });

    await refetchGames();
    setName("");
    handleCancelClick();
  };

  const handleUpdateParticipant = async () => {
    if (!editParticipants || !isEdit) {
      return;
    }

    await updatedParticipant({
      name,
      participantId: editParticipants.id,
    });

    await refetchGames();
    setName("");
    handleCancelClick();
  };

  useEffect(() => {
    if (editParticipants) {
      setIsEdit(true);
      setName(editParticipants.name);
    }
  }, [editParticipants]);

  return (
    <ModalWrap
      modalWidth="2xl"
      modalTitle="Add new participants"
      isModalVisible={isAddNewParticipants}
      handleCancelClick={() => {
        setName("");
        setIsEdit(false);
        handleCancelClick();
      }}
    >
      <Input
        type="text"
        value={name}
        name="participantsName"
        label="Participants name"
        handleInputChange={(e) => setName(e.target.value)}
      />

      <div className="flex justify-end">
        <Button
          btnClass="w-40"
          btnTitle={isEdit ? "Update" : "Add"}
          btnColor={name.length > 2 ? "black" : "outline"}
          onClick={() => {
            if (name.length <= 2) return;

            if (isEdit) {
              handleUpdateParticipant().catch((err) =>
                console.error("Error updating participant", err)
              );
              return;
            }

            handleAddingTeam().catch((err) =>
              console.error("Error adding team", err)
            );
          }}
        />
      </div>
    </ModalWrap>
  );
};

export default AddNewEditParticipants;
