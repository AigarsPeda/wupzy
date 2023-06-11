import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import createGames from "~/server/api/utils/createGames";
import createTeams from "~/utils/createTeams";
import { NewTournamentSchema } from "~/types/tournament.types";

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
          teams: {
            include: {
              players: true,
            },
          },
          games: {
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
          },
        },
      });

      return { tournament };
    }),

  postNewTournament: protectedProcedure
    .input(NewTournamentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      let newTeams = input.teams;

      if (input.kind === "king") {
        newTeams = createTeams(input.king.players);
      }

      const { teams, id } = await prisma.tournament.create({
        data: {
          type: input.kind,
          name: input.name,
          sets: input.sets,
          userId: ctx.session.user.id,
          teams: {
            create: newTeams.map((team) => ({
              name: team.name,
              players: {
                create: team.players.map((player) => ({
                  name: player.name,
                })),
              },
            })),
          },
        },
        include: {
          teams: true,
        },
      });

      await prisma.game.createMany({
        data: createGames(teams, id),
      });

      return { id };
    }),
});
