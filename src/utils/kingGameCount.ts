import { type NewTeamsType } from "~/types/tournament.types";
import isAnyIdTheSame from "./isAnyIdTheSame";

const kingGameCount = (teams: NewTeamsType[]) => {
  let gameCount = 0;
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const firstTeamsIds = teams[i]?.players.map((player) => player.id);
      const secondTeamsIds = teams[j]?.players.map((player) => player.id);

      if (
        firstTeamsIds &&
        secondTeamsIds &&
        !isAnyIdTheSame(firstTeamsIds, secondTeamsIds)
      ) {
        gameCount++;
      }
    }
  }

  return gameCount;
};

export default kingGameCount;
