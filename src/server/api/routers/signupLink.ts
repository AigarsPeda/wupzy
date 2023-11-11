import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TournamentTypeEnum } from "~/types/tournament.types";

export const tournamentRouter = createTRPCRouter({
  createSignupLink: protectedProcedure
    .input(
      z.object({
        tournamentKind: TournamentTypeEnum,
      }),
    )
    .query(async ({ ctx, input }) => {
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
          type: input.tournamentKind,
        },
      });

      return { signupLink };
    }),

  getSignupLink: protectedProcedure
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
});
