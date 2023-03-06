import ConfirmTooltip from "components/elements/ConfirmTooltip/ConfirmTooltip";
import SmallButton from "components/elements/SmallButton/SmallButton";
import type { FC } from "react";
import { useRef } from "react";
import type { TeamsMapType, TeamType } from "types/team.types";
import classNames from "utils/classNames";
import { getAvailableGroups } from "utils/teamsMapFunctions";
import { FiEdit2 } from "react-icons/fi";
import EditInput from "../EditInput/EditInput";

interface EditTournamentTeamProps {
  group: string;
  team: TeamType;
  isFirstGroup: boolean;
  teamsByGroup: TeamsMapType;
  teamToDelete: TeamType | null;
  handleCancelDeleteTeam: () => void;
  setTeamToDelete: (team: TeamType) => void;
  handleDeleteTeam: (team: TeamType) => Promise<void>;
  handleTeamsNameChange: (team: TeamType, newName: string) => void;
  handleGroupChange: (
    team: TeamType,
    oldGroup: string,
    newGroup: string
  ) => void;
}

const EditTournamentTeam: FC<EditTournamentTeamProps> = ({
  team,
  group,
  teamsByGroup,
  isFirstGroup,
  teamToDelete,
  setTeamToDelete,
  handleDeleteTeam,
  handleGroupChange,
  handleTeamsNameChange,
  handleCancelDeleteTeam,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // focus input on click
  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      key={team.id}
      className={classNames(
        !isFirstGroup && "border-t-2",
        "flex items-center justify-between py-2"
      )}
    >
      <div>
        <EditInput
          ref={inputRef}
          value={team.name}
          handleChange={(e) => {
            handleTeamsNameChange(team, e.target.value);
          }}
        />
      </div>
      <div className="flex w-full items-center justify-end">
        {getAvailableGroups(group, teamsByGroup).map((newGroup, i) => (
          <SmallButton
            btnTitle={newGroup}
            btnClassNames="h-6 w-6"
            key={`${newGroup}-${i}`}
            handleClick={() => {
              handleGroupChange(team, group, newGroup);
            }}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-end">
        <SmallButton
          btnTitle={<FiEdit2 />}
          btnClassNames="h-6 px-2"
          handleClick={handleFocusInput}
        />
        <div className="relative">
          <SmallButton
            btnColor="red"
            btnTitle="X"
            btnClassNames="h-6 px-2"
            handleClick={() => {
              setTeamToDelete(team);
            }}
          />
          <ConfirmTooltip
            cancelTitle="Cancel"
            confirmTitle="Delete"
            handleConfirm={() => {
              handleDeleteTeam(team).catch((e) => console.error(e));
            }}
            handleCancel={handleCancelDeleteTeam}
            isTooltip={team.id === teamToDelete?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTournamentTeam;
