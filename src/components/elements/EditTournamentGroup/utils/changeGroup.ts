import type { ParticipantType, TeamsMapType } from "types/team.types";

const changeGroup = (
  teamsByGroup: TeamsMapType,
  oldGroup: string,
  newGroup: string,
  team: ParticipantType
) => {
  const newStates = new Map(teamsByGroup);
  // remove team from old group
  newStates.set(oldGroup, [
    ...(newStates.get(oldGroup)?.filter((t) => t.id !== team.id) || []),
  ]);

  // add team to new group
  newStates.set(newGroup, [
    ...(newStates.get(newGroup) || []),
    // update team group property to new group
    { ...team, group: newGroup },
  ]);

  return newStates;
};

export default changeGroup;
