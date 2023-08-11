import { type SelectedProperties } from "~/components/elements/PlayoffTournamentModal/PlayoffTournamentModal";
import {
  type PlayGameType,
  type PlayOffTeamType,
  type PlayoffMapType,
} from "~/types/playoff.types";
import createPlayoffRound from "~/utils/createPlayoffRound";
import genUniqueId from "~/utils/genUniqueId";

const formatTeamsToPlayoffTree = (
  players: SelectedProperties[],
  selectedRoundsCount: number
) => {
  const playoffMap: PlayoffMapType = new Map();

  const firstRound = createPlayoffRound({
    players,
    selectedRoundsCount,
  });

  // create empty playoffMap
  for (let i = 0; i < selectedRoundsCount; i++) {
    playoffMap.set(i, []);
  }

  // loop through playoffMap and add empty matches with empty teams and half of previous round
  for (const [key, value] of playoffMap) {
    if (key === 0) {
      for (let i = 0; i < firstRound.length; i++) {
        const [player1, player2] = firstRound[i] as PlayOffTeamType[];

        if (!player1 || !player2) {
          continue;
        }

        const playoffMatch: PlayGameType = {
          match: i,
          round: key,
          id: genUniqueId(),
          teams: [player1, player2],
        };

        value.push(playoffMatch);

        if (player1.id && player2.id === "") {
          // add players to nex round
          const nextRound = playoffMap.get(key + 1);

          const nextPlayoffMatch: PlayGameType = {
            match: i,
            round: key + 1,
            id: genUniqueId(),
            teams: [player1, player2],
          };

          if (nextRound) {
            nextRound.push(nextPlayoffMatch);
          }
        }
      }
    }
  }

  // add missing empty matches to playoffMap
  for (const [key, value] of playoffMap) {
    if (key > 0) {
      const currentRound = playoffMap.get(key);
      const currentRoundLength = currentRound?.length || 0;
      const previousRound = playoffMap.get(key - 1);
      const length = previousRound?.length || 0;
      const half = Math.round(length / 2) - currentRoundLength;

      if (previousRound) {
        for (let i = 0; i < half; i++) {
          const playoffMatch: PlayGameType = {
            round: key,
            match: i,
            id: genUniqueId(),
            teams: [
              {
                score: 0,
                id: "",
                name: "",
              },
              {
                score: 0,
                id: "",
                name: "",
              },
            ],
          };

          value.push(playoffMatch);
        }
      }
    }
  }

  // If previous round has only one match, remove current round
  // removing unnecessary rounds
  for (const [key] of playoffMap) {
    // const currentRound = playoffMap.get(key);
    const previousRound = playoffMap.get(key - 1);

    if (previousRound?.length === 1) {
      // remove current round
      playoffMap.delete(key);
    }
  }

  // get keys of playoffMap
  // const playoffMapKeys = Array.from(playoffMap.keys());

  // if (playoffMapKeys.length === 1) {
  //   return [];
  // }

  return playoffMap;
};

export default formatTeamsToPlayoffTree;
