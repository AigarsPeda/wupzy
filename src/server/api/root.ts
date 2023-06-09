import { emailListRouter } from "~/server/api/routers/emailList";
import { exampleRouter } from "~/server/api/routers/example";
import { tournamentRouter } from "~/server/api/routers/tournament";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  emailListRouter,
  example: exampleRouter,
  tournament: tournamentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
