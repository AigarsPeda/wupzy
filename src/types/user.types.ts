import { z } from "zod";

export type UserType = z.infer<typeof UserZodSchema>;

// incomplete, incomplete_expired, trialing, active, past_due, canceled, unpaid

// export const UserSubscriptionStatus = z.enum([
//   "incomplete",
//   "incomplete_expired",
//   "trialing",
//   "active",
//   "past_due",
//   "canceled",
//   "unpaid",
// ]);

// export type UserSubscriptionStatus = z.infer<typeof UserSubscriptionStatus>;

const UserZodSchema = z.object({
  id: z.string(),
  email: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  expiresAt: z.date().nullish(),
  subscriptionStatus: z.string().nullish(),
  stripeSubscriptionId: z.string().nullish(),
});
