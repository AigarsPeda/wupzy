import { type Player } from "@prisma/client";
import {
  type NewTeamsType,
  type NewPlayerType,
} from "~/types/tournament.types";

const createTeams = (players: NewPlayerType[] | Player[]) => {
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
        const playerOneId =
          typeof playerOne.id === "number"
            ? playerOne.id
            : parseInt(playerOne.id);
        const playerTwoId =
          typeof playerTwo.id === "number"
            ? playerTwo.id
            : parseInt(playerTwo.id);

        newTeams.push({
          id: id++,
          name: `${playerOne.name}  ${playerTwo.name}`,
          players: [
            {
              id: playerOneId,
              name: playerOne.name,
            },
            {
              id: playerTwoId,
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
