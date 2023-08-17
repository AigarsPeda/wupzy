import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PlayGameSchema } from "~/types/playoff.types";
import { GameSets } from "~/types/tournament.types";
import createGameSetJson from "~/utils/createGameSetJson";

export const playoffsRouter = createTRPCRouter({
  createPlayoffGames: protectedProcedure
    .input(
      z.object({
        playoffGames: z.array(PlayGameSchema),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      for (const playoffGame of input.playoffGames) {
        const [teamOne, teamTwo] = playoffGame.teams;

        await prisma.playoffGame.create({
          data: {
            match: playoffGame.match,
            round: playoffGame.round,

            ...(teamOne &&
              teamOne.id !== "" && {
                teamOne: {
                  connect: {
                    id: teamOne?.id,
                  },
                },
              }),
            ...(teamTwo &&
              teamTwo.id !== "" && {
                teamTwo: {
                  connect: {
                    id: teamTwo?.id,
                  },
                },
              }),
            tournament: {
              connect: {
                id: input.tournamentId,
              },
            },
          },
        });
      }

      await prisma.tournament.update({
        where: {
          id: input.tournamentId,
        },
        data: {
          isPlayoffs: true,
        },
      });

      return { success: true };
    }),

  getPlayoffGames: protectedProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const playoffGames = await prisma.playoffGame.findMany({
        where: {
          tournamentId: input.tournamentId,
        },
        include: {
          teamOne: true,
          teamTwo: true,
        },
        orderBy: [{ round: "asc" }, { match: "asc" }],
      });

      return { playoffGames };
    }),

  updatePlayoffGame: protectedProcedure
    .input(
      z.object({
        playoffGame: PlayGameSchema,
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { playoffGame } = input;
      const [teamOne, teamTwo] = playoffGame.teams;

      if (!teamOne || !teamTwo) {
        throw new Error("No teams");
      }

      // const teamOneDB = await prisma.team.findUnique({
      //   where: {
      //     id: teamOne.id,
      //   },
      //   include: {
      //     players: true,
      //   },
      // });

      // const teamTwoDB = await prisma.team.findUnique({
      //   where: {
      //     id: teamTwo.id,
      //   },
      //   include: {
      //     players: true,
      //   },
      // });

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.tournamentId,
        },
      });

      if (!tournament) {
        throw new Error("Tournament not found");
      }

      const { winner, finishedGames, firstTeamWins, secondTeamWins } =
        createGameSetJson({
          teamOneId: teamOne.id,
          teamTwoId: teamTwo.id,
          setToWin: tournament.sets,
          teamOneScore: teamOne?.score || 0,
          teamTwoScore: teamTwo?.score || 0,
          json: GameSets.parse(playoffGame.gameSets),
        });

      // TODO: If winner we need to winner team move to next round
      if (winner) {
        const nextRound = playoffGame.round + 1;
        // const nextMatch = Math.ceil(playoffGame.match / 2);

        // match 0 and 1 goes to 0, 2 and 3 goes to 1, 4 and 5 goes to 2
        const nextMatch = Math.floor(playoffGame.match / 2);

        console.log("nextRound", nextRound);
        console.log("nextMatch", nextMatch);
      }

      const updateGame = await prisma.playoffGame.update({
        where: {
          id: input.playoffGame.id,
        },
        data: {
          winnerId: winner,
          gameSets: finishedGames,
          teamOneSetScore: firstTeamWins,
          teamTwoSetScore: secondTeamWins,
        },
      });

      // await updateTeamsScore({
      //   prisma,
      //   team: teamOneDB,
      //   winnerId: winner,
      //   setsWon: firstTeamWins,
      //   teamScore: teamOne.score,
      // });

      // await updateTeamsScore({
      //   prisma,
      //   team: teamTwoDB,
      //   winnerId: winner,
      //   setsWon: secondTeamWins,
      //   teamScore: teamTwo.score,
      // });

      // await updatePlayerScores({
      //   prisma,
      //   winner,
      //   team: teamOneDB,
      //   setsWon: firstTeamWins,
      //   teamScore: teamOne.score,
      // });

      // await updatePlayerScores({
      //   prisma,
      //   winner,
      //   team: teamTwoDB,
      //   setsWon: secondTeamWins,
      //   teamScore: teamTwo.score,
      // });

      return { success: true, updateGame };
    }),
});
