import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PlayGameSchema } from "~/types/playoff.types";
import { GameSets } from "~/types/tournament.types";
import countWinsPerTeam from "~/utils/countWinsPerTeam";
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

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.tournamentId,
        },
      });

      if (!tournament) {
        throw new Error("Tournament not found");
      }

      const { firstTeamPoints, secondTeamPoints } = countWinsPerTeam({
        teamOneId: teamOne.id,
        teamTwoId: teamTwo.id,
        setsToWin: tournament.sets,
        gameSets: GameSets.parse(playoffGame.gameSets),
      });

      const { winner, finishedGames, firstTeamWins, secondTeamWins } =
        createGameSetJson({
          json: GameSets.parse(playoffGame.gameSets),
          setToWin: tournament.sets,
          teamOneId: teamOne.id,
          teamTwoId: teamTwo.id,
          teamOneScore: teamOne?.score || 0,
          teamTwoScore: teamTwo?.score || 0,
        });

      console.log("playoffGame --->", playoffGame);
      console.log("firstTeamPoints --->", firstTeamPoints);
      console.log("secondTeamPoints --->", secondTeamPoints);
      console.log("winner --->", winner);
      console.log("finishedGames --->", finishedGames);
      console.log("firstTeamWins --->", firstTeamWins);
      console.log("secondTeamWins --->", secondTeamWins);

      // await prisma.playoffGame.update({
      //   where: {
      //     id: playoffGame.id,
      //   },
      //   data: {
      //     ...(teamOne &&
      //       teamOne.id !== "" && {
      //         teamOne: {
      //           connect: {
      //             id: teamOne?.id,
      //           },
      //         },
      //       }),
      //     ...(teamTwo &&
      //       teamTwo.id !== "" && {
      //         teamTwo: {
      //           connect: {
      //             id: teamTwo?.id,
      //           },
      //         },
      //       }),
      //     teamOneScore: playoffGame.teamOneScore,
      //     teamTwoScore: playoffGame.teamTwoScore,
      //   },
      // });

      return { success: true };
    }),
});
