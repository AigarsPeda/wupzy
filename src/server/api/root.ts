import { exampleRouter } from "./routers/example";
import { participantRouter } from "./routers/teams";
import { tournamentsRouter } from "./routers/tournaments";
import { usersRouter } from "./routers/users";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  example: exampleRouter,
  tournaments: tournamentsRouter,
  participant: participantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
