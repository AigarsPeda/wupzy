import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TournamentTypeEnum } from "~/types/tournament.types";

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

      console.log("user", user);
      console.log("input", input);

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

  getSignupLink: protectedProcedure
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
