import type { Participant, Team } from "@prisma/client";

type GameType = {
  first: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
  second: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
};

const createTeamsGames = (
  teams: (Team & {
    participants: Participant[];
  })[]
) => {
  const games: GameType[] = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const team = teams[i];
      const team2 = teams[j];

      if (team && team2) {
        const game = {
          first: {
            teamId: team.id,
            participants: team.participants.map((participant) => {
              return {
                id: participant.id,
              };
            }),
          },
          second: {
            teamId: team2.id,
            participants: team2.participants.map((participant) => {
              return {
                id: participant.id,
              };
            }),
          },
        };

        games.push(game);
      }
    }
  }

  return games;
};

export default createTeamsGames;
