import Stripe from "stripe";

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export default stripe;
