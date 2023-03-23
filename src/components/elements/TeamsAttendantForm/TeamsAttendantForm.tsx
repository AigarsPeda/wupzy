import { useAutoAnimate } from "@formkit/auto-animate/react";
import Input from "components/elements/Input/Input";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import type {
  TeamsAttendantMapType,
  TeamsAttendantType,
} from "types/team.types";

interface TeamsAttendantFormProps {
  teamsAttendants: TeamsAttendantMapType;
  createTeam: (name: string, participants: TeamsAttendantType[]) => void;
}

type AttendantType = TeamsAttendantType & {
  id: string;
};

const TeamsAttendantForm: FC<TeamsAttendantFormProps> = ({
  createTeam,
  teamsAttendants,
}) => {
  const [parent] = useAutoAnimate();
  const [teamName, setTeamName] = useState("");
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
    <div>
      <div className="flex flex-col">
        <Input
          type="text"
          name="teamName"
          label="Teams name"
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
                name="teamName"
                value={value || ""}
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
      </div>
    </div>
  );
};

export default TeamsAttendantForm;
