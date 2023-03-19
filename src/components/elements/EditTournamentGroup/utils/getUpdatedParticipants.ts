import type { ParticipantType, ParticipantMapType } from "types/team.types";

const getUpdatedParticipants = (
  newName: string,
  participants: ParticipantMapType,
  participant: ParticipantType
) => {
  const updatedParticipants: string[] = [];

  participants.get(participant.group)?.find((p) => {
    if (p.id === participant.id && p.name !== newName) {
      updatedParticipants.push(participant.id);
    }

    if (p.id === participant.id && p.name === newName) {
      updatedParticipants.filter((id) => id !== participant.id);
    }
  });

  return updatedParticipants;
};

export default getUpdatedParticipants;
