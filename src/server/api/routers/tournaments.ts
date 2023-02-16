import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tournamentsRouter = createTRPCRouter({
  // getAllGames: protectedProcedure.query(() => {
  //   return {
  //     greeting: `This should be protected`,
  //   };
  // }),
  getAllTournaments: protectedProcedure
    // .input(z.object({ text: z.string() }))
    .query(async ({ ctx }) => {
      console.log("ctx.user.id ---->", ctx.user.id);

      // if (!ctx.user.id) {
      //   throw new TRPCError({
      //     code: "UNAUTHORIZED",
      //     message: "You are not authorized to access this resource",
      //   });
      // }

      const tournaments = await ctx.prisma.tournament.findMany({
        where: {
          userId: ctx.user.id,
        },
      });

      return { tournaments };
      //  const allTournaments = await ctx.prisma.tournament.findMany();

      // get all tournaments

      // return {
      //   greeting: `This should be protected `,
      // };
    }),

  createTournament: protectedProcedure
    .input(z.object({ name: z.string(), attendants: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      console.log("ctx.user.id ---->", ctx.user.id);

      // if (!ctx.user.id) {
      //   throw new TRPCError({
      //     code: "UNAUTHORIZED",
      //     message: "You are not authorized to access this resource",
      //   });
      // }

      const tournament = await ctx.prisma.tournament.create({
        data: {
          name: input.name,
          userId: ctx.user.id,
        },
      });

      for (const attendant of input.attendants) {
        console.log(`Creating attendant ${attendant}...`);
        await ctx.prisma.team.create({
          data: {
            name: attendant,
            tournamentId: tournament.id,
          },
        });
        console.log(`Attendant ${attendant} created!~`);
      }

      return { tournament };
    }),
});
