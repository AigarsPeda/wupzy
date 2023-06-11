import {
  type NewTeamsType,
  type NewPlayerType,
} from "~/types/tournament.types";

const createTeams = (players: NewPlayerType[]) => {
  const newTeams: NewTeamsType[] = [];

  let id = 1;
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const playerOne = players[i];
      const playerTwo = players[j];

      if (
        playerOne &&
        playerTwo &&
        playerOne?.name.trim() !== "" &&
        playerTwo.name.trim() !== ""
      ) {
        newTeams.push({
          id: id++,
          name: `${playerOne.name}  ${playerTwo.name}`,
          players: [
            {
              id: playerOne.id,
              name: playerOne.name,
            },
            {
              id: playerTwo.id,
              name: playerTwo.name,
            },
          ],
        });
      }
    }
  }

  return newTeams;
};

export default createTeams;
