import { PRICE_FOR_100_CREDITS } from "hardcoded";
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import z from "zod";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import stripe from "~/server/stripe/client";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig as string, webhookSecret);

      // Handle the event
      switch (event.type) {
        case "charge.succeeded":
          const payment = event.data.object as Stripe.Charge;

          // validate userId with zod tat it is string
          const userId = z.string().parse(payment.customer);

          if (!userId) {
            throw new Error("No userId");
          }

          await prisma.user.update({
            where: {
              stripeCustomerId: userId,
            },
            data: {
              credits: {
                increment: payment.amount === PRICE_FOR_100_CREDITS ? 100 : 0,
              },
            },
          });

        default:
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
