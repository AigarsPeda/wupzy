import { type NewTeamsType } from "~/types/tournament.types";

const countNewGames = (games: NewTeamsType[]) => {
  let count = 0;
  for (let i = 0; i < games.length; i++) {
    for (let j = i + 1; j < games.length; j++) {
      count++;
    }
  }

  return count;
};

export default countNewGames;
