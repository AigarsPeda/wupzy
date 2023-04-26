import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "server/api/trpc";
import { z } from "zod";

export const shareLinkRouter = createTRPCRouter({
  createShareLink: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const shareLink = await prisma.shareLink.create({
        data: {
          tournamentId: input.tournamentId,
        },
      });

      await prisma.tournament.update({
        where: {
          id: input.tournamentId,
        },
        data: {
          shareLinkId: shareLink.id,
          shareLink: {
            connect: {
              id: shareLink.id,
            },
          },
        },
      });

      return {
        shareLink,
      };
    }),

  getShareTournament: publicProcedure
    .input(
      z.object({
        shareLinkId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const shareTournament = await prisma.shareLink.findUnique({
        where: {
          id: input.shareLinkId,
        },
        include: {
          tournament: {
            include: {
              games: {
                include: {
                  team1: {
                    include: {
                      participants: true,
                    },
                  },
                  team2: {
                    include: {
                      participants: true,
                    },
                  },
                },
              },
              team: {
                include: {
                  participants: true,
                },
              },
              playoffgames: {
                include: {
                  team1: {
                    include: {
                      participants: true,
                    },
                  },
                  team2: {
                    include: {
                      participants: true,
                    },
                  },
                  tournament: {
                    select: {
                      setsInGame: true,
                    },
                  },
                  participants: true,
                },
              },
              teams: true, // Why is this returning participants?
            },
          },
        },
      });

      if (!shareTournament) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share link not found",
        });
      }

      return {
        shareTournament,
      };
    }),
});
