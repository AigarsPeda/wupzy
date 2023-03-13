import type { Games, Participant } from "@prisma/client";

export type OldGamesType = Games & {
  participant_team_1: Participant[];
  participant_team_2: Participant[];
};

const isGameAlreadyCreated = (
  id1: string,
  id2: string,
  oldGames: OldGamesType[]
) => {
  return oldGames.some(
    (game) =>
      game &&
      game.participant_team_1[0] &&
      game.participant_team_2[0] &&
      ((game.participant_team_1[0].id === id1 &&
        game.participant_team_2[0].id === id2) ||
        (game.participant_team_1[0].id === id2 &&
          game.participant_team_2[0].id === id1))
  );
};

export default isGameAlreadyCreated;
