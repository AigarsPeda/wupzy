import { type Player } from "@prisma/client";
import {
  type NewPlayerType,
  type NewTeamsType,
} from "~/types/tournament.types";

const createTeams = (players: Player[] | NewPlayerType[]) => {
  const newTeams: NewTeamsType[] = [];

  let id = 1;
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const playerOne = players[i];
      const playerTwo = players[j];

      if (
        playerOne &&
        playerTwo &&
        playerOne.group === playerTwo.group &&
        playerOne?.name.trim() !== "" &&
        playerTwo.name.trim() !== ""
      ) {
        const playerOneId = playerOne.id;
        const playerTwoId = playerTwo.id;
        const group = playerOne.group || "A";

        if (playerOneId !== playerTwoId) {
          newTeams.push({
            group: group,
            id: (id++).toString(),
            name: `${playerOne.name}  ${playerTwo.name}`,
            players: [
              {
                group: group,
                id: playerOneId,
                name: playerOne.name,
              },
              {
                group: group,
                id: playerTwoId,
                name: playerTwo.name,
              },
            ],
          });
        }
      }
    }
  }

  return newTeams;
};

export default createTeams;
