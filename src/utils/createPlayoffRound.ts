import { type SelectedProperties } from "~/components/elements/PlayoffTournamentModal/PlayoffTournamentModal";
import { type PlayOffTeamType } from "~/types/playoff.types";

type CreatePlayoffRoundArrayType = {
  selectedRoundsCount: number;
  players: SelectedProperties[];
};

const createPlayoffRound = ({
  players,
  selectedRoundsCount,
}: CreatePlayoffRoundArrayType) => {
  const emptyPlayer: PlayOffTeamType = {
    id: "",
    score: 0,
    // name: "n/a",
    name: "",
  };

  const newPlayers = players.map((player) => {
    return {
      score: 0,
      id: player.id,
      name: player.name,
    };
  });

  if (newPlayers.length % 2 !== 0) {
    newPlayers.push(emptyPlayer);
  }

  const playoffTree: PlayOffTeamType[][] = [];
  const playersCount = selectedRoundsCount * 2;

  // select players for the first round based on playoff rounds count
  const selectedPlayers = newPlayers.slice(0, playersCount);
  const middleIndex = Math.floor(selectedPlayers.length / 2);

  for (let i = 0; i < middleIndex; i++) {
    const first = selectedPlayers[i];
    const last = selectedPlayers[selectedPlayers.length - i - 1];

    const firstTam = first ? first : emptyPlayer;
    const secondTeam = last ? last : emptyPlayer;

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
  }

  // // add empty players to the end of the playoffTree till it's length is equal even number
  if (playoffTree.length % 2 !== 0) {
    // find array with player with empty id
    const emptyPlayerIndex = playoffTree.findIndex((team) => {
      return team.some((player) => {
        return player.id === "";
      });
    });

    // add empty player array wright after the array with empty player
    playoffTree.splice(emptyPlayerIndex + 1, 0, [emptyPlayer, emptyPlayer]);
  }

  return playoffTree;
};

export default createPlayoffRound;
