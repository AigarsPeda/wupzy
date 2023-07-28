import { type SelectedProperties } from "~/components/elements/PlayoffTournamentModal/PlayoffTournamentModal";
import { type PlayoffRoundType } from "~/types/utils.types";
import createPlayoffRound from "~/utils/createPlayoffRound";
import genUniqueId from "~/utils/genUniqueId";

const formatTeamsToPlayoffTree = (
  players: SelectedProperties[] | undefined,
  selectedRoundsCount: number
) => {
  if (!players) {
    return [];
  }

  const firstRound = createPlayoffRound({
    players,
    selectedRoundsCount,
  });

  const playoffMap = new Map<number, PlayoffRoundType[]>();

  // create empty playoffMap
  for (let i = 0; i <= selectedRoundsCount; i++) {
    playoffMap.set(i, []);
  }

  // loop through playoffMap and add empty matches with empty teams and half of previous round
  for (const [key, value] of playoffMap) {
    if (key === 0) {
      for (let i = 0; i < firstRound.length; i++) {
        const [player1, player2] = firstRound[i] || [];

        if (!player1 || !player2) {
          continue;
        }

        const playoffMatch: PlayoffRoundType = {
          round: key,
          match: i,
          id: genUniqueId(),
          teams: [player1, player2],
        };

        value.push(playoffMatch);

        if (player1.id && player2.id === "") {
          // add players to nex round
          const nextRound = playoffMap.get(key + 1);

          const nextPlayoffMatch: PlayoffRoundType = {
            round: key + 1,
            match: i,
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
          const playoffMatch: PlayoffRoundType = {
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

  const lastRound = playoffMap.get(selectedRoundsCount);

  if (lastRound && lastRound.length > 1) {
    // find index of match with empty teams
    const index = lastRound?.findIndex((match) => {
      const [team1, team2] = match?.teams || [];

      return team1?.id === "" && team2?.id === "";
    });

    // remove teams in index
    if (index) {
      lastRound?.splice(index, 1);
    }
  }

  return playoffMap;
};

export default formatTeamsToPlayoffTree;
