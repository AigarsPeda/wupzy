import { v4 as uuidv4 } from "uuid";
import z from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import createKingGamesNTimes from "~/server/api/utils/createKingGamesNTimes";
import filterPlayers from "~/server/api/utils/filterPlayers";
import { NewPlayerSchema, TournamentTypeEnum } from "~/types/tournament.types";
import createTeams from "~/utils/createTeams";
import { ONE_TOURNAMENT_COST } from "../../../../hardcoded";

export const signupLinkRouter = createTRPCRouter({
  postSignupLink: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        tournamentKind: TournamentTypeEnum,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const signupLink = await prisma.tournamentSignupLink.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          slug: uuidv4(),
          name: input.name,
          type: input.tournamentKind,
          description: input.description,
        },
      });

      return { signupLink };
    }),

  getSignupLink: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const signupLink = await prisma.tournamentSignupLink.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          id: true,
          name: true,
          type: true,
          description: true,
        },
      });

      return { signupLink };
    }),

  getSignupLinkById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const signupLink = await prisma.tournamentSignupLink.findUnique({
        where: {
          id: input.id,
        },
        include: {
          teams: {
            include: {
              players: true,
            },
          },
          players: true,
        },
      });

      return { signupLink };
    }),

  getAllSignupLinks: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const signupLinks = await prisma.tournamentSignupLink.findMany({
      where: {
        userId: user.id,
      },
    });

    return { signupLinks };
  }),

  postPlayerToSignupLink: publicProcedure
    .input(
      z.object({
        newPlayers: NewPlayerSchema.array(),
        signupLinkId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const signupLink = await prisma.tournamentSignupLink.findUnique({
        where: {
          id: input.signupLinkId,
        },
      });

      if (!signupLink) {
        throw new Error("Signup link not found");
      }

      if (signupLink.type === "king") {
        for (const player of filterPlayers(input.newPlayers)) {
          const newPlayer = await prisma.player.create({
            data: {
              group: player.group,
              name: player.name,
              tournamentSignupLink: {
                connect: {
                  id: signupLink.id,
                },
              },
            },
          });

          if (!newPlayer) {
            throw new Error("Player not created");
          }
        }

        return {
          status: "ok",
        };
      }
    }),

  postNewTournamentFromSignupLink: protectedProcedure
    .input(
      z.object({
        rounds: z.number(),
        setCount: z.number(),
        signupLinkId: z.string(),
      }),
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

      const signupLink = await prisma.tournamentSignupLink.findUnique({
        where: {
          id: input.signupLinkId,
        },
        include: {
          players: true,
          teams: {
            include: {
              players: true,
            },
          },
        },
      });

      if (!signupLink || signupLink.id) {
        throw new Error("Signup link not found");
      }

      if (signupLink.type === "king") {
        const { id, players } = await prisma.tournament.create({
          data: {
            isStarted: true,
            sets: input.setCount,
            type: signupLink.type,
            name: signupLink.name,
            user: {
              connect: {
                id: session.user.id,
              },
            },
            players: {
              create: signupLink.players.map((player) => ({
                name: player.name,
                group: player.group,
              })),
            },
          },
          include: {
            players: true,
          },
        });

        await prisma.tournament.update({
          where: {
            id: id,
          },
          data: {
            kind: "PRO",
            shareLink: {
              connectOrCreate: {
                where: {
                  tournamentId: id,
                },
                create: {
                  slug: uuidv4(),
                },
              },
            },
          },
        });

        const newTeams = createTeams(players);

        for (let i = 0; i < newTeams.length; i++) {
          const element = newTeams[i];

          if (element) {
            await prisma.team.create({
              data: {
                tournamentId: id,
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
      }
    }),
});
