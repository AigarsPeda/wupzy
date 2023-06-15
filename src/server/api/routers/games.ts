import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import updatePlayerScores from "~/server/api/utils/updatePlayerScores";
import { GameSets } from "~/types/tournament.types";
import { GamesScoresSchema } from "~/types/utils.types";
import getGameWinner from "~/utils/getGameWinner";

export const gameRouter = createTRPCRouter({
  updateGame: protectedProcedure
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

      let finishedGames = game.gameSets ? GameSets.parse(game.gameSets) : {};
      const keys = Object.keys(finishedGames);

      const { winner, firstTeamWins, secondTeamWins } = getGameWinner({
        finishedGames,
        scores: input.scores,
        setToWin: tournament.sets,
      });

      finishedGames = {
        ...finishedGames,
        [keys.length + 1]: {
          teamOne: input.scores.teamOneScore,
          teamTwo: input.scores.teamTwoScore,
        },
      };

      const updateGame = await prisma.game.update({
        where: {
          id: input.scores.gameId,
        },
        data: {
          gameSets: finishedGames,
          teamOneSetScore: firstTeamWins,
          teamTwoSetScore: secondTeamWins,
          winnerId: winner,
        },
      });

      const { teamOne, teamTwo } = game;

      await updatePlayerScores({
        prisma,
        winner,
        team: teamOne,
        teamWins: firstTeamWins,
        teamScore: input.scores.teamOneScore,
      });

      await updatePlayerScores({
        prisma,
        winner,
        team: teamTwo,
        teamWins: secondTeamWins,
        teamScore: input.scores.teamTwoScore,
      });

      return { game: updateGame };
    }),

  getGames: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const games = await prisma.game.findMany({
        where: {
          tournamentId: input.id,
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
        orderBy: {
          order: "asc",
        },
      });

      return { games };
    }),
});
