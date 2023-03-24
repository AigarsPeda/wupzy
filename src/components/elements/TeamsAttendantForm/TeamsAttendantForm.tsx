import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import type {
  TeamsAttendantMapType,
  TeamsAttendantType,
} from "types/team.types";

interface TeamsAttendantFormProps {
  teamsAttendants: TeamsAttendantMapType;
  deleteTeam: (name: string) => void;
  createTeam: (name: string, participants: TeamsAttendantType[]) => void;
  handleTeamsAttendantsUpdate: (
    oldName: string,
    newName: string,
    participants: TeamsAttendantType[]
  ) => void;
}

type AttendantType = TeamsAttendantType & {
  id: string;
};

const TeamsAttendantForm: FC<TeamsAttendantFormProps> = ({
  createTeam,
  deleteTeam,
  teamsAttendants,
  handleTeamsAttendantsUpdate,
}) => {
  const [parent] = useAutoAnimate();
  const [createdTeamsRef] = useAutoAnimate();
  const [teamName, setTeamName] = useState("");
  const [editTeamName, setEditTeamName] = useState<string | null>(null);
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

  const handleTeamSwitch = (tName: string) => {
    if (editTeamName) {
      handleTeamsAttendantsUpdate(editTeamName, teamName, teamAttendants);
    }

    const team = teamsAttendants.get(tName);

    if (team) {
      const attendant: AttendantType[] = team.map((attendant, index) => {
        return {
          id: `${index + 1}`,
          name: attendant.name,
        };
      });

      setTeamName(tName);
      setTeamAttendants(attendant);
    }
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

  const handleCreateTeam = () => {
    const participants = teamAttendants.filter((attendant) => attendant.name);

    createTeam(teamName, participants);

    setTeamName("");
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
  };

  const isFormValid = () => {
    if (teamName === "") return false;

    const participants = teamAttendants.filter((attendant) => attendant.name);

    if (participants.length < 2) return false;

    return true;
  };

  return (
    <>
      <Button
        btnClass="w-40"
        btnTitle="Add new team"
        onClick={handleCreateTeam}
        isDisabled={!isFormValid()}
      />
      <div>
        <div>
          <label htmlFor="teamName" className="text-sm text-gray-600">
            Created teams
          </label>
          <div className="min-h-10 flex w-full flex-wrap" ref={createdTeamsRef}>
            {[...teamsAttendants.keys()].sort().map((teamName, i) => {
              return (
                <div key={`${teamName}${i}`} className="relative">
                  <button
                    onClick={() => {
                      setEditTeamName(teamName);
                      handleTeamSwitch(teamName);
                    }}
                    className="mr-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-bold text-white"
                  >
                    {teamName}
                  </button>
                  <div className=" absolute -top-2.5 right-0">
                    <button
                      onClick={() => deleteTeam(teamName)}
                      className="ml-2 rounded-full bg-gray-100 p-1 text-sm font-bold text-red-500"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <Input
            type="text"
            name="teamName"
            label="Team name"
            value={teamName}
            handleInputChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div
          ref={parent}
          className="mt-4 flex max-h-[23rem] flex-col overflow-y-auto"
        >
          {teamAttendants.map((_attendant, index) => {
            const value = teamAttendants[index]?.name;

            return (
              <div key={index} className="flex flex-row">
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
        <div className="flex w-full items-center justify-center">
          <RoundButton
            bgColor="green"
            btnType="button"
            handleClick={addNewAttendant}
            btnContent={<BsPlusLg className="m-2 h-6 w-6 text-white" />}
          />
          {/* <Button
          btnClass="w-40"
          btnTitle="Add new team"
          isDisabled={!isFormValid()}
          onClick={handleCreateTeam}
        /> */}
        </div>
      </div>
    </>
  );
};

export default TeamsAttendantForm;
