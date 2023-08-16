import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import editScore from "~/server/api/utils/editScore";
import updatePlayerScores from "~/server/api/utils/updatePlayerScores";
import updateTeamsScore from "~/server/api/utils/updateTeamsScore";
import { GameSchema, GameSets } from "~/types/tournament.types";
import { GamesScoresSchema } from "~/types/utils.types";
import countWinsPerTeam from "~/utils/countWinsPerTeam";
import createGameSetJson from "~/utils/createGameSetJson";

export const gameRouter = createTRPCRouter({
  updateGameScore: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        scores: GamesScoresSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.tournamentId,
        },
      });

      if (!tournament) {
        throw new Error("Tournament not found");
      }

      const game = await prisma.game.findUnique({
        where: {
          id: input.scores.gameId,
        },
        include: {
          teamOne: {
            include: {
              players: true,
            },
          },
          teamTwo: {
            include: {
              players: true,
            },
          },
        },
      });

      if (!game) {
        throw new Error("Game not found");
      }

      const { winner, finishedGames, firstTeamWins, secondTeamWins } =
        createGameSetJson({
          json: game.gameSets,
          setToWin: tournament.sets,
          teamOneId: game.teamOneId,
          teamTwoId: game.teamTwoId,
          teamOneScore: input.scores.teamOneScore,
          teamTwoScore: input.scores.teamTwoScore,
        });

      const updateGame = await prisma.game.update({
        where: {
          id: input.scores.gameId,
        },
        data: {
          winnerId: winner,
          gameSets: finishedGames,
          teamOneSetScore: firstTeamWins,
          teamTwoSetScore: secondTeamWins,
        },
      });

      const { teamOne, teamTwo } = game;

      await updateTeamsScore({
        prisma,
        team: teamOne,
        winnerId: winner,
        setsWon: firstTeamWins,
        teamScore: input.scores.teamOneScore,
      });

      await updateTeamsScore({
        prisma,
        team: teamTwo,
        winnerId: winner,
        setsWon: secondTeamWins,
        teamScore: input.scores.teamTwoScore,
      });

      await updatePlayerScores({
        prisma,
        winner,
        team: teamOne,
        setsWon: firstTeamWins,
        teamScore: input.scores.teamOneScore,
      });

      await updatePlayerScores({
        prisma,
        winner,
        team: teamTwo,
        setsWon: secondTeamWins,
        teamScore: input.scores.teamTwoScore,
      });

      return { game: updateGame };
    }),

  getGames: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        group: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const games = await prisma.game.findMany({
        where: {
          tournamentId: input.id,
          group: input.group,
        },
        include: {
          teamOne: {
            include: {
              players: true,
            },
          },
          teamTwo: {
            include: {
              players: true,
            },
          },
        },
        orderBy: [{ round: "asc" }, { order: "asc" }],
      });

      const players = await prisma.player.findMany({
        where: {
          tournamentId: input.id,
        },
      });

      // const playerGroups = new Set<string>();
      const playerGroups = new Set<string>();

      for (const player of players) {
        playerGroups.add(player.group);
      }

      return { games, groups: [...playerGroups] };
    }),

  getGame: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const game = await prisma.game.findUnique({
        where: {
          id: input.id,
        },
        include: {
          teamOne: {
            include: {
              players: true,
            },
          },
          teamTwo: {
            include: {
              players: true,
            },
          },
        },
      });

      return { game };
    }),

  updateGame: protectedProcedure
    .input(
      z.object({
        game: GameSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.game.tournamentId,
        },
      });

      const oldGame = await prisma.game.findUnique({
        where: {
          id: input.game.id,
        },
        include: {
          teamOne: {
            include: {
              players: true,
            },
          },
          teamTwo: {
            include: {
              players: true,
            },
          },
        },
      });

      if (!tournament || !oldGame) {
        throw new Error("Tournament or Game not found");
      }

      const {
        firstTeamPoints: firstTeamOldPoints,
        secondTeamPoints: secondTeamOldPoints,
      } = countWinsPerTeam({
        setsToWin: tournament.sets,
        teamOneId: oldGame.teamOneId,
        teamTwoId: oldGame.teamTwoId,
        gameSets: GameSets.parse(oldGame.gameSets),
      });

      const {
        winnerId,
        firstTeamWins,
        secondTeamWins,
        firstTeamPoints,
        secondTeamPoints,
      } = countWinsPerTeam({
        setsToWin: tournament.sets,
        teamOneId: input.game.teamOneId,
        teamTwoId: input.game.teamTwoId,
        gameSets: GameSets.parse(input.game.gameSets),
      });

      const game = await prisma.game.update({
        where: {
          id: input.game.id,
        },
        data: {
          winnerId: winnerId,
          teamOneSetScore: firstTeamWins,
          teamTwoSetScore: secondTeamWins,
          gameSets: GameSets.parse(input.game.gameSets),
        },
        include: {
          teamOne: {
            include: {
              players: true,
            },
          },
          teamTwo: {
            include: {
              players: true,
            },
          },
        },
      });

      const { teamOne, teamTwo } = game;

      await editScore({
        prisma,
        team: teamOne,
        newWinnerId: winnerId,
        teamsWins: firstTeamWins,
        oldWinnerId: oldGame.winnerId,
        teamsNewScore: firstTeamPoints,
        teamsOldScore: firstTeamOldPoints || 0,
      });

      await editScore({
        prisma,
        team: teamTwo,
        newWinnerId: winnerId,
        teamsWins: secondTeamWins,
        oldWinnerId: oldGame.winnerId,
        teamsNewScore: secondTeamPoints,
        teamsOldScore: secondTeamOldPoints,
      });

      return { game };
    }),
});
