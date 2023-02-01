import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const gameRouter = createTRPCRouter({
  // getAllGames: protectedProcedure.query(() => {
  //   return {
  //     greeting: `This should be protected`,
  //   };
  // }),
  getAllGames: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      console.log("ctx.user.id ---->", ctx.user.id);
      return {
        greeting: `This should be protected ${input.text}`,
      };
    }),
});
