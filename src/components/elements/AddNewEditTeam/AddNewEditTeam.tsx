import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { AttendantType, TeamType } from "types/team.types";
import { api } from "utils/api";

interface AddNewEditTeamProps {
  tournamentId: string;
  isAddNewTeamOpen: boolean;
  selectedGroup: string | null;
  editTeam: TeamType | undefined;
  handleCancelClick: () => void;
}

const AddNewEditTeam: FC<AddNewEditTeamProps> = ({
  editTeam,
  tournamentId,
  selectedGroup,
  isAddNewTeamOpen,
  handleCancelClick,
}) => {
  const [parent] = useAutoAnimate();
  const [isEdit, setIsEdit] = useState(false);
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

  const { refetch: refetchTeams } =
    api.tournaments.getAllTournamentTeams.useQuery({ tournamentId });

  const { mutate: addTeamToTournament } =
    api.teamsTournaments.addTeamToTournament.useMutation({
      onSuccess: async () => {
        setTeamsName("");
        handleCancelClick();
        await refetchTeams();
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
      },
    });

  const { mutate: deleteTeam } = api.teamsTournaments.deleteTeam.useMutation({
    onSuccess: async () => {
      setTeamsName("");
      handleCancelClick();
      await refetchTeams();
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
    },
  });

  const { mutate: updateTeam } = api.teamsTournaments.updateTeam.useMutation({
    onSuccess: async () => {
      setTeamsName("");
      handleCancelClick();
      await refetchTeams();
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
    },
  });

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

  useEffect(() => {
    if (editTeam) {
      setIsEdit(true);
      setTeamsName(editTeam.name);
      setTeamAttendants(
        editTeam.participants.map((participant) => {
          return {
            id: participant.id,
            name: participant.name,
          };
        })
      );
    }
  }, [editTeam]);

  return (
    <ModalWrap
      modalWidth="2xl"
      isModalVisible={isAddNewTeamOpen}
      modalTitle={isEdit ? "Edit team" : "Add new team"}
      handleCancelClick={() => {
        setIsEdit(false);
        setTeamsName("");
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
      <div className="justify-between py-2 md:flex">
        <Button
          btnTitle="Add teammate"
          onClick={addNewAttendant}
          btnClass="mb-2 md:mb-0"
        />
        <div className="flex justify-end md:justify-start">
          {isEdit && editTeam && (
            <Button
              btnColor="red"
              btnClass="mr-2"
              btnTitle="Delete"
              onClick={() => {
                deleteTeam({
                  teamId: editTeam.id,
                });
              }}
            />
          )}

          <Button
            btnClass="mr-2"
            btnTitle="Cancel"
            btnColor="outline"
            onClick={() => {
              setIsEdit(false);
              setTeamsName("");
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
              if (isEdit && editTeam) {
                updateTeam({
                  tournamentId,
                  teamId: editTeam.id,
                  teamName: teamsName,
                  participants: teamAttendants,
                });
                return;
              }

              addTeamToTournament({
                tournamentId,
                teamName: teamsName,
                group: selectedGroup || "A",
                participants: teamAttendants.map((attendant) => attendant.name),
              });
            }}
          />
        </div>
      </div>
    </ModalWrap>
  );
};

export default AddNewEditTeam;
