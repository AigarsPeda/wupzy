import { ONE_TOURNAMENT_COST } from "hardcoded";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import createGamesNTimes from "~/server/api/utils/createGamesNTimes";
import createKingGamesNTimes from "~/server/api/utils/createKingGamesNTimes";
import { NewTournamentSchema } from "~/types/tournament.types";
import createTeams from "~/utils/createTeams";
import { v4 as uuidv4 } from "uuid";

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
        include: {
          shareLink: true,
        },
      });

      return { tournament };
    }),

  updateTournamentToPro: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (user && user.credits < ONE_TOURNAMENT_COST) {
        throw new Error("Not enough credits");
      }

      const tournament = await prisma.tournament.update({
        where: {
          id: input.id,
        },
        data: {
          kind: "PRO",
          shareLink: {
            connectOrCreate: {
              where: {
                tournamentId: input.id,
              },
              create: {
                slug: uuidv4(),
              },
            },
          },
        },
      });

      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: {
            decrement: ONE_TOURNAMENT_COST,
          },
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
            rounds: input.rounds,
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

        const newTeams = createTeams(players);

        for (let i = 0; i < newTeams.length; i++) {
          const element = newTeams[i];

          if (element) {
            await prisma.team.create({
              data: {
                tournamentId: id,
                name: element.name,
                group: element.group,
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

        return { id };
      } else {
        const { teams, id } = await prisma.tournament.create({
          data: {
            type: input.kind,
            name: input.name,
            sets: input.sets,
            rounds: input.rounds,
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
            teams: {
              include: {
                players: true,
              },
            },
          },
        });

        await prisma.game.createMany({
          data: createGamesNTimes(teams, id, input.rounds),
        });

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
