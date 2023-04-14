import type { ParticipantType } from "types/team.types";

const sortParticipants = (participants: ParticipantType[]) => {
  return participants.sort(
    (a, b) => b.points - a.points || b.smallPoints - a.smallPoints
  );
};

export default sortParticipants;
