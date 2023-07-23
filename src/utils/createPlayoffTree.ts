import {
  type PlayoffType,
  type PlayoffsTreeMatchType,
} from "~/types/utils.types";

const createPlayoffTree = (participatingLength: number, roundCount: number) => {
  const playoffTree: PlayoffType[] = [];

  for (let i = 0; i <= roundCount; i++) {
    const round: PlayoffType = {
      id: i,
      matches: [],
      name: `Round ${i + 1}`,
    };

    // add empty matches to other rounds every next round has half of the matches
    // const matchesCount = Math.pow(2, selectedRoundsCount - i);

    // get previous round matches count and divide it by 2
    const prevRound = playoffTree[i - 1]?.matches.length || participatingLength;

    const matchesCount = Math.floor(prevRound / 2);

    for (let j = 0; j < matchesCount; j++) {
      const match: PlayoffsTreeMatchType = {
        id: j,
        name: j + 1,
        right: false,
        left: false,
        teams: [
          {
            id: "1",
            name: "",
            score: 0,
            round: j,
            match: j,
            game: j,
          },
          {
            id: "2",
            name: "",
            score: 0,
            round: j,
            match: j,
            game: j,
          },
        ],
      };

      round.matches.push(match);
    }

    playoffTree.push(round);
  }

  return playoffTree;
};

export default createPlayoffTree;
