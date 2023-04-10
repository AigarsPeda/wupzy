import type { GameType } from "./util.types";

type SplitArrayType = {
  oneTeam: GameType[];
  bothTeams: GameType[];
};

const splitArray = (games: GameType[]): SplitArrayType => {
  return games.reduce<SplitArrayType>(
    (result, game) => {
      if (game.team1.team1?.id && game.team2.team2?.id) {
        result.bothTeams.push(game);
      } else {
        // Adjusting for the next round
        game.bracketNum = Math.floor(game.bracketNum / 2);
        game.stage = (parseInt(game.stage) / 2).toString();
        result.oneTeam.push(game);
      }
      return result;
    },
    { bothTeams: [], oneTeam: [] }
  );
};

export default splitArray;
