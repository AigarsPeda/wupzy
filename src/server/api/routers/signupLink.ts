import { v4 as uuidv4 } from "uuid";
import z from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import filterPlayers from "~/server/api/utils/filterPlayers";
import { NewPlayerSchema, TournamentTypeEnum } from "~/types/tournament.types";

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
    }),
});
