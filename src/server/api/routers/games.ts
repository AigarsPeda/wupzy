import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import updatePlayerScores from "~/server/api/utils/updatePlayerScores";
import { GamesScoresSchema } from "~/types/utils.types";
import createGameSetJson from "~/utils/createGameSetJson";

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

      const { winner, finishedGames, firstTeamWins, secondTeamWins } =
        createGameSetJson({
          json: game.gameSets,
          scores: input.scores,
          setToWin: tournament.sets,
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
        orderBy: [{ round: "asc" }, { order: "asc" }],
      });

      return { games };
    }),
});
