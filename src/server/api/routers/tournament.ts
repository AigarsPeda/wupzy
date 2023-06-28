import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import createGamesNTimes from "~/server/api/utils/createGamesNTimes";
import createKingGamesNTimes from "~/server/api/utils/createKingGamesNTimes";
import { NewTournamentSchema } from "~/types/tournament.types";
import createTeams from "~/utils/createTeams";
import splitPlayerInGroups from "~/utils/splitPlayerInGroups";
import splitTeamsInGroups from "~/utils/splitTeamsInGroups";

export const tournamentRouter = createTRPCRouter({
  getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const tournaments = await prisma.tournament.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { tournaments };
  }),

  getTournament: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.id,
        },
      });

      return { tournament };
    }),

  postNewTournament: protectedProcedure
    .input(NewTournamentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      if (input.kind === "king") {
        const { players, id } = await prisma.tournament.create({
          data: {
            type: input.kind,
            name: input.name,
            sets: input.sets,
            userId: ctx.session.user.id,
            players: {
              create: input.king.players.map((player) => ({
                name: player.name,
                group: player.group,
              })),
            },
          },
          include: {
            players: true,
          },
        });

        // create teams
        for (const [, playersInGroup] of splitPlayerInGroups(players)
          .playersByGroup) {
          const newTeams = createTeams(playersInGroup);

          for (let i = 0; i < newTeams.length; i++) {
            const element = newTeams[i];

            if (element) {
              await prisma.team.create({
                data: {
                  tournamentId: id,
                  name: element.name,
                  players: {
                    connect: element.players.map((player) => ({
                      id: player.id,
                    })),
                  },
                },
              });
            }
          }

          const teams = await prisma.team.findMany({
            where: {
              tournamentId: id,
            },
            include: {
              players: true,
            },
          });

          await prisma.game.createMany({
            data: createKingGamesNTimes(teams, id, input.rounds),
          });
        }

        return { id };
      } else {
        const { teams, id } = await prisma.tournament.create({
          data: {
            type: input.kind,
            name: input.name,
            sets: input.sets,
            userId: ctx.session.user.id,
            teams: {
              create: input.teams.map((team) => ({
                name: team.name,
                players: {
                  create: team.players.map((player) => ({
                    name: player.name,
                    group: team.group,
                  })),
                },
              })),
            },
          },
          include: {
            teams: true,
          },
        });

        // create games
        for (const [, teamsInGroup] of splitTeamsInGroups(teams)
          .playersByGroup) {
          await prisma.game.createMany({
            data: createGamesNTimes(teamsInGroup, id, input.rounds),
          });
        }

        return { id };
      }
    }),

  deleteTournament: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      await prisma.game.deleteMany({
        where: {
          tournamentId: input.id,
        },
      });

      await prisma.tournament.delete({
        where: {
          id: input.id,
        },
      });

      return { id: input };
    }),
});
