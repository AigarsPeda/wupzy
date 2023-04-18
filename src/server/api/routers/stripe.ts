import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "server/api/trpc";
import comparePassword from "utils/comparePassword";
import createToken from "utils/createToken";
import hashPassword from "utils/hashPassword";
import { z } from "zod";
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
});
