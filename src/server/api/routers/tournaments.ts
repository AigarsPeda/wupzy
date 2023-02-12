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
    .query(({ ctx }) => {
      console.log("ctx.user.id ---->", ctx.user.id);
      return {
        greeting: `This should be protected `,
      };
    }),
});
