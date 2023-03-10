import ConfirmTooltip from "components/elements/ConfirmTooltip/ConfirmTooltip";
import EditInput from "components/elements/EditInput/EditInput";
import SmallButton from "components/elements/SmallButton/SmallButton";
import type { FC } from "react";
import { useRef } from "react";
import { FiEdit2 } from "react-icons/fi";
import type { ParticipantType, TeamsMapType } from "types/team.types";
import classNames from "utils/classNames";
import { getAvailableGroups } from "utils/teamsMapFunctions";
import { RiSaveLine } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";

interface EditParticipantProps {
  group: string;
  isChanged: boolean;
  teamsByGroup: TeamsMapType;
  participant: ParticipantType;
  teamToDelete: ParticipantType | null;
  handleCancelDeleteTeam: () => void;
  setTeamToDelete: (team: ParticipantType) => void;
  resetNameChange: (participant: ParticipantType) => void;
  handleDeleteTeam: (team: ParticipantType) => Promise<void>;
  handleParticipantNameChange: (team: ParticipantType, newName: string) => void;
  handleParticipantUpdate: (participant: ParticipantType) => Promise<void>;
  handleGroupChange: (
    team: ParticipantType,
    oldGroup: string,
    newGroup: string
  ) => void;
}

const EditParticipant: FC<EditParticipantProps> = ({
  group,
  isChanged,
  participant,
  teamsByGroup,
  teamToDelete,
  resetNameChange,
  setTeamToDelete,
  handleDeleteTeam,
  handleGroupChange,
  handleCancelDeleteTeam,
  handleParticipantUpdate,
  handleParticipantNameChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // focus input on click
  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      key={participant.id}
      className={classNames(
        isChanged && "border-gray-800",
        "flex items-center justify-between border-b-2 py-2 transition-all duration-300"
      )}
    >
      <div>
        <EditInput
          ref={inputRef}
          value={participant.name}
          handleChange={(e) => {
            handleParticipantNameChange(participant, e.target.value);
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
              handleGroupChange(participant, group, newGroup);
            }}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-end">
        {!isChanged && (
          <SmallButton
            btnTitle={<FiEdit2 />}
            btnClassNames="h-6 px-2"
            handleClick={handleFocusInput}
          />
        )}
        {isChanged && (
          <>
            <SmallButton
              btnClassNames="h-6 px-2"
              btnTitle={<RiSaveLine />}
              handleClick={() => {
                handleParticipantUpdate(participant).catch((e) =>
                  console.error(e)
                );
              }}
            />
            <SmallButton
              btnClassNames="h-6 px-2"
              btnTitle={<GrPowerReset />}
              handleClick={() => {
                resetNameChange(participant);
              }}
            />
          </>
        )}
        <div className="relative">
          <SmallButton
            btnColor="red"
            btnTitle="X"
            btnClassNames="h-6 px-2"
            handleClick={() => {
              setTeamToDelete(participant);
            }}
          />
          <ConfirmTooltip
            cancelTitle="Cancel"
            confirmTitle="Delete"
            handleConfirm={() => {
              handleDeleteTeam(participant).catch((e) => console.error(e));
            }}
            handleCancel={handleCancelDeleteTeam}
            isTooltip={participant.id === teamToDelete?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EditParticipant;
