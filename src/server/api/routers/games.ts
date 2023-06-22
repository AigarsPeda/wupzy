import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import updatePlayerScores from "~/server/api/utils/updatePlayerScores";
import updateTeamsScore from "~/server/api/utils/updateTeamsScore";
import { GameSchema } from "~/types/tournament.types";
import { GamesScoresSchema } from "~/types/utils.types";
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
        tournamentId: z.string(),
        // oldScoreTeamOne: z.number(),
        // oldScoreTeamTwo: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.tournamentId,
        },
      });

      const oldGame = await prisma.game.findUnique({
        where: {
          id: input.game.id,
        },
      });

      if (!tournament || !oldGame) {
        throw new Error("Tournament or Game not found");
      }

      const { winner, finishedGames, firstTeamWins, secondTeamWins } =
        createGameSetJson({
          json: input.game.gameSets,
          setToWin: tournament.sets,
          teamOneId: input.game.teamOneId,
          teamTwoId: input.game.teamTwoId,
          teamOneScore: input.game.teamOneSetScore,
          teamTwoScore: input.game.teamTwoSetScore,
        });

      // TODO: if old winner is null, then the game was not finished

      // TODO: if old winner does not equal new winner, then the we need to update participants scores
      // TODO: if old winner does not equal new winner, then the we need to update teams scores

      const game = await prisma.game.update({
        where: {
          id: input.game.id,
        },
        data: {
          winnerId: winner,
          gameSets: finishedGames,
          teamOneSetScore: firstTeamWins,
          teamTwoSetScore: secondTeamWins,
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

      if (input.game.winnerId !== winner) {
        const { teamOne, teamTwo } = game;

        await updateTeamsScore({
          prisma,
          team: teamOne,
          winnerId: winner,
          setsWon: firstTeamWins,
          teamScore: -oldGame.teamOneSetScore + input.game.teamOneSetScore,
        });

        await updateTeamsScore({
          prisma,
          team: teamTwo,
          winnerId: winner,
          setsWon: secondTeamWins,
          teamScore: -oldGame.teamTwoSetScore + input.game.teamTwoSetScore,
        });

        await updatePlayerScores({
          prisma,
          winner,
          team: teamOne,
          setsWon: firstTeamWins,
          teamScore: -oldGame.teamOneSetScore + input.game.teamOneSetScore,
        });

        await updatePlayerScores({
          prisma,
          winner,
          team: teamTwo,
          setsWon: secondTeamWins,
          teamScore: -oldGame.teamTwoSetScore + input.game.teamTwoSetScore,
        });
      }

      return { game };
    }),
});
