import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import ModalWrap from "components/elements/Modal/Modal";
import type { FC } from "react";
import { useState } from "react";
import { api } from "utils/api";

interface AddNewTeamProps {
  tournamentId: string;
  isAddNewTeamOpen: boolean;
  addNewTeamGroup: string | null;
  handleCancelClick: () => void;
}

const AddNewTeam: FC<AddNewTeamProps> = ({
  tournamentId,
  addNewTeamGroup,
  isAddNewTeamOpen,
  handleCancelClick,
}) => {
  const [teamsName, setTeamsName] = useState("");
  const { mutateAsync } = api.teams.addTeam.useMutation();

  const handleAddingTeam = async () => {
    if (!addNewTeamGroup) {
      return;
    }

    await mutateAsync({
      score: 0,
      tournamentId,
      name: teamsName,
      group: addNewTeamGroup,
    });

    setTeamsName("");
    handleCancelClick();
  };

  return (
    <ModalWrap
      modalWidth="2xl"
      isModalVisible={isAddNewTeamOpen}
      modalTitle="Add new team"
      handleCancelClick={handleCancelClick}
    >
      <Input
        type="text"
        name="teamName"
        label="Team name"
        value={teamsName}
        handleInputChange={(e) => setTeamsName(e.target.value)}
      />

      <div className="flex justify-end">
        <Button
          btnClass=" w-40"
          btnTitle="Add new team"
          btnColor={teamsName.length > 2 ? "black" : "outline"}
          onClick={() => {
            if (teamsName.length <= 2) return;

            handleAddingTeam().catch((err) => console.log(err));
          }}
        />
      </div>
    </ModalWrap>
  );
};

export default AddNewTeam;
