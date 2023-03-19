import ConfirmTooltip from "components/elements/ConfirmTooltip/ConfirmTooltip";
import EditInput from "components/elements/EditInput/EditInput";
import SmallButton from "components/elements/SmallButton/SmallButton";
import type { FC } from "react";
import { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { RiSaveLine } from "react-icons/ri";
import type { ParticipantType, ParticipantMapType } from "types/team.types";
import classNames from "utils/classNames";
import { getAvailableGroups } from "utils/teamsMapFunctions";

interface EditParticipantProps {
  group: string;
  isChanged: boolean;
  teamsByGroup: ParticipantMapType;
  participant: ParticipantType;
  teamToDelete: ParticipantType | null;
  handleCancelDeleteTeam: () => void;
  setTeamToDelete: (team: ParticipantType) => void;
  resetNameChange: (participant: ParticipantType) => void;
  handleDeleteTeam: (team: ParticipantType) => Promise<void>;
  handleParticipantUpdate: (participant: ParticipantType) => Promise<void>;
  handleParticipantNameChange: (team: ParticipantType, newName: string) => void;
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
                  console.error("Error updating participant: ", e)
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
            btnTitle={<CgClose />}
            btnClassNames="h-6 px-2"
            handleClick={() => {
              setTeamToDelete(participant);
            }}
          />
          <ConfirmTooltip
            cancelTitle="Cancel"
            tailPosition="right"
            confirmTitle="Delete"
            position="-top-2 right-10"
            handleCancel={handleCancelDeleteTeam}
            isTooltip={participant.id === teamToDelete?.id}
            handleConfirm={() => {
              handleDeleteTeam(participant).catch((e) =>
                console.error("Error deleting team: ", e)
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditParticipant;
