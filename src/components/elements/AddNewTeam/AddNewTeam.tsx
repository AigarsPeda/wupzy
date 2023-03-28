import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import { useState } from "react";
import type { AttendantType } from "types/team.types";
import { api } from "utils/api";

interface AddNewTeamProps {
  tournamentId: string;
  isAddNewTeamOpen: boolean;
  selectedGroup: string | null;
  handleCancelClick: () => void;
}

const AddNewTeam: FC<AddNewTeamProps> = ({
  tournamentId,
  selectedGroup,
  isAddNewTeamOpen,
  handleCancelClick,
}) => {
  const [parent] = useAutoAnimate();
  const [teamsName, setTeamsName] = useState("");
  const [teamAttendants, setTeamAttendants] = useState<AttendantType[]>([
    {
      id: "1",
      name: "",
    },
    {
      id: "2",
      name: "",
    },
  ]);
  const { mutateAsync } = api.tournaments.addTeamToTournament.useMutation();
  const { refetch: refetchGames } = api.tournaments.getTournamentGames.useQuery(
    { tournamentId }
  );

  const handleAddingTeam = async () => {
    if (!selectedGroup) {
      return;
    }

    await mutateAsync({
      tournamentId,
      teamName: teamsName,
      group: selectedGroup,
      participants: teamAttendants.map((attendant) => attendant.name),
    });

    setTeamsName("");
    handleCancelClick();
    await refetchGames();
  };

  const handleInputChange = (index: number, str: string) => {
    const newAttendants = [...teamAttendants];
    const newAttendant = newAttendants[index];

    if (newAttendant) {
      newAttendant.name = str;
    } else {
      newAttendants.push({
        id: `${index + 1}`,
        name: str,
      });
    }

    setTeamAttendants(newAttendants);
  };

  const addNewAttendant = () => {
    const newAttendants = [...teamAttendants];
    const newAttendant = {
      id: `${newAttendants.length + 1}`,
      name: "",
    };

    newAttendants.push(newAttendant);
    setTeamAttendants(newAttendants);
  };

  return (
    <ModalWrap
      modalWidth="2xl"
      isModalVisible={isAddNewTeamOpen}
      modalTitle="Add new team"
      handleCancelClick={handleCancelClick}
    >
      <div className="w-full md:w-1/2">
        <Input
          type="text"
          name="teamName"
          label="Team name"
          value={teamsName}
          handleInputChange={(e) => setTeamsName(e.target.value)}
        />
      </div>
      <div
        ref={parent}
        className="mt-4 flex max-h-[19rem] flex-col overflow-y-auto"
      >
        {teamAttendants.map((_attendant, index) => {
          const value = teamAttendants[index]?.name;

          return (
            <div key={index} className="flex w-full flex-row md:w-1/2">
              <Input
                size="sm"
                type="text"
                value={value || ""}
                name="participantName"
                label={`${index + 1} participants name`}
                handleInputChange={(e) =>
                  handleInputChange(index, e.target.value)
                }
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between py-2">
        <Button btnTitle="Add attendant" onClick={addNewAttendant} />
        <div className="flex">
          <Button
            btnColor="red"
            btnClass="mr-2"
            btnTitle="Cancel"
            onClick={() => {
              handleCancelClick();
              setTeamAttendants([
                {
                  id: "1",
                  name: "",
                },
                {
                  id: "2",
                  name: "",
                },
              ]);
            }}
          />
          <Button
            btnTitle="Save team"
            onClick={() => {
              handleAddingTeam().catch((err) =>
                console.error("Error adding team", err)
              );
            }}
          />
        </div>
      </div>
    </ModalWrap>
  );
};

export default AddNewTeam;
