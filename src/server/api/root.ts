import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { usersRouter } from "./routers/users";
import { tournamentsRouter } from "./routers/tournaments";
import { teamsRouter } from "./routers/teams";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  teams: teamsRouter,
  example: exampleRouter,
  tournaments: tournamentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
