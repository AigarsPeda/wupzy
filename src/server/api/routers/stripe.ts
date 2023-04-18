import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import Stripe from "stripe";

// const jwtSecret = process.env.JWT_SECRET || "jwtSecret";

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export const stripeRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async () => {
    const products = await stripe.products.list({
      limit: 10,
      expand: ["data.prices"],
    });

    return {
      products,
    };
  }),

  // signUpUser: publicProcedure
  //   // .input(
  //   //   // z.object({
  //   //   //   email: z.string(),
  //   //   //   lastName: z.string(),
  //   //   //   password: z.string(),
  //   //   //   firstName: z.string(),
  //   //   // })
  //   // )
  //   .mutation(async ({ ctx, input }) => {
  //     ctx.req
  //     ctx.res
  //   ctx.session
  //   const password = await hashPassword(input.password);

  //   if (password instanceof Error) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error hashing password",
  //     });
  //   }

  //   const user = await ctx.prisma.user.create({
  //     data: {
  //       email: input.email,
  //       lastName: input.lastName,
  //       firstName: input.firstName,
  //     },
  //   });

  //   // save password to db
  //   await ctx.prisma.password.create({
  //     data: {
  //       password,
  //       user: {
  //         connect: {
  //           id: user.id,
  //         },
  //       },
  //     },
  //   });

  //   const token = createToken(user.id);

  //   // Save token to db
  //   await ctx.prisma.loginToken.create({
  //     data: {
  //       token,
  //       isActive: true,
  //       user: {
  //         connect: {
  //           id: user.id,
  //         },
  //       },
  //     },
  //   });

  //   return {
  //     token,
  //   };
  // }),
});
