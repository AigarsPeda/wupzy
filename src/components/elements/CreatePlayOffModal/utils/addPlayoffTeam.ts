import type {
  GameKeyTypes,
  GameType,
} from "components/elements/CreatePlayOffModal/utils/util.types";
import type { TeamType } from "types/team.types";

const addPlayoffTeam = (
  team: TeamType,
  stage: string,
  position: number,
  name: GameKeyTypes,
  brackets: Map<string, GameType[]>
) => {
  const newBrackets = new Map(brackets);
  const groupTeams = newBrackets.get(stage);

  if (!groupTeams) return newBrackets;

  const teamToUpdate = groupTeams[position];

  if (!teamToUpdate) return newBrackets;

  teamToUpdate[name] = team;

  return newBrackets;
};

export default addPlayoffTeam;
