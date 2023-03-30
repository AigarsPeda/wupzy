import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import useParticipants from "hooks/useParticipants";
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
  const { refetchParticipants } = useParticipants(tournamentId);

  const { mutate: updatedParticipant } =
    api.participant.updatedParticipant.useMutation({
      onSuccess: async () => {
        setName("");
        handleCancelClick();
        await refetchParticipants();
      },
    });

  const { mutate: addParticipantToGroup } =
    api.participant.addParticipantToGroup.useMutation({
      onSuccess: async () => {
        setName("");
        handleCancelClick();
        await refetchParticipants();
      },
    });

  const { mutate: deleteParticipant } =
    api.participant.deleteParticipant.useMutation({
      onSuccess: async () => {
        setName("");
        handleCancelClick();
        await refetchParticipants();
      },
    });

  useEffect(() => {
    if (editParticipants) {
      setIsEdit(true);
      setName(editParticipants.name);
    }
  }, [editParticipants]);

  return (
    <ModalWrap
      modalWidth="2xl"
      isModalVisible={isAddNewParticipants}
      modalTitle={isEdit ? "Edit participant" : "Add new participant"}
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

      <div className="flex justify-between">
        {isEdit && editParticipants && (
          <Button
            btnColor="red"
            btnClass="mr-2"
            btnTitle="Delete"
            onClick={() => {
              deleteParticipant({
                tournamentId,
                participant: editParticipants,
              });
            }}
          />
        )}
        <Button
          btnClass="w-40"
          btnTitle={isEdit ? "Update" : "Add"}
          btnColor={name.length > 2 ? "black" : "outline"}
          onClick={() => {
            if (name.length <= 2) return;

            if (isEdit && editParticipants) {
              updatedParticipant({
                name,
                participantId: editParticipants.id,
              });
              return;
            }

            addParticipantToGroup({
              score: 0,
              name: name,
              tournamentId,
              group: selectedGroup || "A",
            });
          }}
        />
      </div>
    </ModalWrap>
  );
};

export default AddNewEditParticipants;
