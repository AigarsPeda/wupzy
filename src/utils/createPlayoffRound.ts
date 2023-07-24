import {
  type SelectedProperties,
  type TestPlayerType,
} from "../components/elements/PlayoffTournamentModal/PlayoffTournamentModal";

type CreatePlayoffRoundArrayType = {
  players: SelectedProperties[] | undefined;
  selectedRoundsCount: number;
};

const createPlayoffRound = ({
  players,
  selectedRoundsCount,
}: CreatePlayoffRoundArrayType) => {
  if (!players) {
    return [];
  }

  const playoffTree: TestPlayerType[][] = [];
  const playersCount = Math.pow(2, selectedRoundsCount) * 2;

  // select players for the first round based on playoff rounds count
  const selectedPlayers = players.slice(0, playersCount);
  const middleIndex = Math.floor(selectedPlayers.length / 2);

  let leftPointer = middleIndex;
  let rightPointer = middleIndex;

  // If the array length is even, move the left pointer one step back
  if (middleIndex % 2 === 0) {
    leftPointer--;
  }

  const emptyPlayer: TestPlayerType = {
    id: "",
    score: 0,
    name: "n/a",
  };

  while (leftPointer >= 0 || rightPointer < selectedPlayers.length) {
    const leftPlayer = selectedPlayers[leftPointer];
    const rightPlayer = selectedPlayers[rightPointer];

    const firstTam = leftPlayer ? leftPlayer : emptyPlayer;
    const secondTeam = rightPlayer ? rightPlayer : emptyPlayer;

    playoffTree.push([
      {
        score: 0,
        id: firstTam.id,
        name: firstTam.name || "",
      },
      {
        score: 0,
        id: secondTeam.id,
        name: secondTeam.name || "",
      },
    ]);

    leftPointer--;
    rightPointer++;
  }

  // add empty players to the end of the playoffTree till it's length is equal even number
  if (playoffTree.length % 2 !== 0) {
    playoffTree.push([emptyPlayer, emptyPlayer]);
  }

  return playoffTree;
};

export default createPlayoffRound;
