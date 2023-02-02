/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import jwt from "jsonwebtoken";
import { validate as uuidValidate } from "uuid";
import { prisma } from "../db";

const jwtSecret = serverEnv.JWT_SECRET || "jwtSecret";

type CreateContextOptions = {
  session: string | undefined;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    prisma,
    session: opts.session,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const { req } = opts;

  return createInnerTRPCContext({
    session: req.cookies.token,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { initTRPC, TRPCError } from "@trpc/server";
import { serverEnv } from "env/schema.mjs";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // TODO: Save loginToken to redis in future
  // Check if session is saved in db
  const session = await prisma.loginToken.findUnique({
    where: {
      token: ctx.session,
    },
  });

  if (!session || !session?.isActive) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Decode session
  const decoded = jwt.verify(ctx.session, jwtSecret) as {
    uuid?: string;
    userId?: string;
  };

  // Check if session is valid
  if (
    !decoded ||
    !decoded?.uuid ||
    !decoded?.userId ||
    !uuidValidate(decoded?.uuid)
  ) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Check if user exists in db
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  // Check if

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // If we get here, the user is logged in and we can continue with the
  // procedure and pass the user to the context
  return next({
    ctx: {
      ...ctx,
      user: user,
      token: ctx.session,
    },
  });
});

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
