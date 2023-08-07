import { type SelectedProperties } from "~/components/elements/PlayoffTournamentModal/PlayoffTournamentModal";
import { type PlayoffMapType } from "~/types/playoff.types";

const createPlayoffTree = (
  players: SelectedProperties[] | undefined,
  selectedRoundsCount: number
) => {
  const playoffMap: PlayoffMapType = new Map();

  console.log("selectedRoundsCount", selectedRoundsCount);

  if (!players) {
    return playoffMap;
  }

  // create empty playoffMap
  for (let i = 0; i < selectedRoundsCount; i++) {
    playoffMap.set(i, []);
  }

  return playoffMap;
};

export default createPlayoffTree;
